<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addClick"
      >添加</el-button
    >
    <div style="height: 10px;"></div>
    <el-table
      :data="propertiesTable"
      max-height="230px"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" width="50" type="index"> </el-table-column>
      <el-table-column prop="name" label="名称">
        <template slot-scope="{ row, $index }">
          <el-input
            v-model="row.name"
            size="mini"
            @blur="nameBlur(row, $index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="value" label="值">
        <template slot-scope="{ row, $index }">
          <el-input
            v-model="row.value"
            size="mini"
            @blur="valueBlur(row, $index)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70">
        <template slot-scope="{ $index }">
          <el-button
            type="danger"
            @click="deleteClick($index)"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import cmdHelper from '../../helper/CmdHelper';
import elementHelper from '../../helper/ElementHelper';
import extensionElementsHelper from '../../helper/ExtensionElementsHelper';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { nextId } from '../../../../util/generate-id';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
export default {
  name: 'properties',
  data() {
    return {
      modeler: null,
      element: null,
      propertiesTable: [],
      gutter: 10,
      span: 11,
      modelProperties: ['name', 'value']
    };
  },
  created() {
    this.modeler = this.$store.state.bpmn.modeler;
    this.element = this.$store.state.bpmn.element;
    const properties = this.getPropertyValues(
      getBusinessObject(this.element).extensionElements
    );
    if (properties && properties.length > 0) {
      properties.forEach((item) => {
        this.propertiesTable.push({
          name: item.name,
          value: item.value
        });
      });
    }
    console.log(properties);
  },
  methods: {
    addClick() {
      this.propertiesTable.push({
        name: '',
        value: ''
      });
      const commands = this.addElement(this.element);
      const commandStack = this.modeler.get('commandStack');
      commands.forEach((item) => {
        commandStack.execute(item.cmd, item.context);
      });
    },
    deleteClick(index) {
      this.propertiesTable.splice(index, 1);
      const commands = this.removeElement(this.element, index);
      const commandStack = this.modeler.get('commandStack');
      commands.forEach((item) => {
        commandStack.execute(item.cmd, item.context);
      });
    },
    nameBlur(row, index) {
      const command = this.updateElement(
        this.element,
        { name: row.name },
        index
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    },
    valueBlur(row, index) {
      const command = this.updateElement(
        this.element,
        { value: row.value },
        index
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    },
    addElement(element) {
      const bpmnFactory = this.modeler.get('bpmnFactory');
      const bo = getBusinessObject(element);
      var commands = [],
        parent = this.getParent(element, bo);

      if (!parent) {
        var result = this.createParent(element, bo, bpmnFactory);
        parent = result.parent;
        commands.push(result.cmd);
      }

      var properties = this.getPropertiesElement(parent);
      if (!properties) {
        properties = elementHelper.createElement(
          'camunda:Properties',
          {},
          parent,
          bpmnFactory
        );

        if (!this.isExtensionElements(parent)) {
          commands.push(
            cmdHelper.updateBusinessObject(element, parent, {
              properties: properties
            })
          );
        } else {
          commands.push(
            cmdHelper.addAndRemoveElementsFromList(
              element,
              parent,
              'values',
              'extensionElements',
              [properties],
              []
            )
          );
        }
      }

      var propertyProps = {};
      forEach(this.modelProperties, function(prop) {
        propertyProps[prop] = undefined;
      });

      // create id if necessary
      if (this.modelProperties.indexOf('id') >= 0) {
        propertyProps.id = this.generatePropertyId();
      }

      var property = elementHelper.createElement(
        'camunda:Property',
        propertyProps,
        properties,
        bpmnFactory
      );
      commands.push(
        cmdHelper.addElementsTolist(element, properties, 'values', [property])
      );

      return commands;
    },
    updateElement(element, value, index) {
      var parent = this.getParent(element, getBusinessObject(element)),
        property = this.getPropertyValues(parent)[index];

      // forEach(modelProperties, function(prop) {
      //   value[prop] = value[prop] || undefined;
      // });

      return cmdHelper.updateBusinessObject(element, property, value);
    },
    removeElement(element, index) {
      const bo = getBusinessObject(element);
      var commands = [],
        parent = this.getParent(element, bo),
        properties = this.getPropertiesElement(parent),
        propertyValues = this.getPropertyValues(parent),
        currentProperty = propertyValues[index];

      commands.push(
        cmdHelper.removeElementsFromList(element, properties, 'values', null, [
          currentProperty
        ])
      );

      if (propertyValues.length === 1) {
        // remove camunda:properties if the last existing property has been removed
        if (!this.isExtensionElements(parent)) {
          commands.push(
            cmdHelper.updateBusinessObject(element, parent, {
              properties: undefined
            })
          );
        } else {
          forEach(parent.values, function(value) {
            if (is(value, 'camunda:Properties')) {
              commands.push(
                extensionElementsHelper.removeEntry(bo, element, value)
              );
            }
          });
        }
      }

      return commands;
    },
    getParent(element, bo) {
      return bo.extensionElements;
    },
    createParent(element, bo, bpmnFactory) {
      var parent = elementHelper.createElement(
        'bpmn:ExtensionElements',
        { values: [] },
        bo,
        bpmnFactory
      );
      var cmd = cmdHelper.updateBusinessObject(element, bo, {
        extensionElements: parent
      });
      return {
        cmd: cmd,
        parent: parent
      };
    },
    getPropertyValues(parent) {
      var properties = parent && this.getPropertiesElement(parent);
      if (properties && properties.values) {
        return properties.values;
      }
      return [];
    },
    getPropertiesElement(element) {
      if (!this.isExtensionElements(element)) {
        return element.properties;
      } else {
        return this.getPropertiesElementInsideExtensionElements(element);
      }
    },
    getPropertiesElementInsideExtensionElements(extensionElements) {
      return find(extensionElements.values, function(elem) {
        return is(elem, 'camunda:Properties');
      });
    },
    isExtensionElements(element) {
      return is(element, 'bpmn:ExtensionElements');
    },
    generatePropertyId() {
      return nextId('Property_');
    }
  }
};
</script>

<style scoped></style>
