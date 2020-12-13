<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="任务优先级" prop="taskPriority">
          <el-input v-model="formData.taskPriority" @blur="taskPriorityBlur" />
        </el-form-item>
      </el-col>

      <el-col :span="span">
        <el-form-item label="定时优先级" prop="jobPriority">
          <el-input v-model="formData.jobPriority" @blur="jobPriorityBlur" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import cmdHelper from '../../helper/CmdHelper';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
export default {
  name: 'processPriority',
  data() {
    return {
      modeler: null,
      element: null,
      formData: {
        taskPriority: null,
        jobPriority: null
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
    taskPriorityBlur() {
      const command = cmdHelper.updateBusinessObject(
        this.element,
        getBusinessObject(this.element),
        { taskPriority: this.formData.taskPriority }
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    },
    jobPriorityBlur() {
      const command = cmdHelper.updateBusinessObject(
        this.element,
        getBusinessObject(this.element),
        { jobPriority: this.formData.jobPriority }
      );
      const commandStack = this.modeler.get('commandStack');
      commandStack.execute(command.cmd, command.context);
    }
  }
};
</script>

<style scoped></style>
