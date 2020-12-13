<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="启动用户" prop="candidateStarterUsers">
          <el-input
            v-model="formData.candidateStarterUsers"
            @blur="starterUsersBlur"
          />
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="启动组" prop="candidateStarterGroups">
          <el-input
            v-model="formData.candidateStarterGroups"
            @blur="starterGroupsBlur"
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
  name: 'candidateStarterConfig',
  data() {
    return {
      modeler: null,
      element: null,
      formData: {
        candidateStarterUsers: '',
        candidateStarterGroups: ''
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
    starterUsersBlur() {
      const command = cmdHelper.updateBusinessObject(
        this.element,
        getBusinessObject(this.element),
        { candidateStarterUsers: this.formData.candidateStarterUsers }
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    },
    starterGroupsBlur() {
      const command = cmdHelper.updateBusinessObject(
        this.element,
        getBusinessObject(this.element),
        { candidateStarterGroups: this.formData.candidateStarterGroups }
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    }
  }
};
</script>

<style scoped></style>
