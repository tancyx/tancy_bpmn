<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="ID">
          <el-input v-model="formData.id" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" @blur="nameBlur" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import cmdHelper from '../../helper/CmdHelper';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
export default {
  name: 'itemGeneral',
  data() {
    return {
      modeler: null,
      element: null,
      formData: {
        id: '',
        name: ''
      },
      gutter: 10,
      span: 11
    };
  },
  created() {
    this.modeler = this.$store.state.bpmn.modeler;
    this.element = this.$store.state.bpmn.element;
    this.formData = { ...getBusinessObject(this.element) };
  },
  methods: {
    nameBlur() {
      const command = cmdHelper.updateBusinessObject(
        this.element,
        getBusinessObject(this.element),
        { name: this.formData.name }
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
      commandStack.execute('element.updateLabel', {
        element: this.element,
        newLabel: this.formData.name
      });
    }
  }
};
</script>

<style scoped></style>
