<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="描述" prop="documentation">
          <el-input
            type="textarea"
            v-model="formData.documentation"
            @blur="documentationBlur"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import cmdHelper from '../../helper/CmdHelper';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
export default {
  name: 'documentation',
  data() {
    return {
      modeler: null,
      element: null,
      formData: {
        documentation: ''
      },
      gutter: 10,
      span: 22
    };
  },
  created() {
    this.modeler = this.$store.state.bpmn.modeler;
    this.element = this.$store.state.bpmn.element;
    const doc = getBusinessObject(this.element).documentation;
    this.formData.documentation = doc && doc.length > 0 ? doc[0].text : '';
  },
  methods: {
    documentationBlur() {
      const bpmnFactory = this.modeler.get('bpmnFactory');
      var newObjectList = [];
      if (
        typeof this.formData.documentation !== 'undefined' &&
        this.formData.documentation !== ''
      ) {
        newObjectList.push(
          bpmnFactory.create('bpmn:Documentation', {
            text: this.formData.documentation
          })
        );
      }
      const command = cmdHelper.setList(
        this.element,
        getBusinessObject(this.element),
        'documentation',
        newObjectList
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    }
  }
};
</script>

<style scoped></style>
