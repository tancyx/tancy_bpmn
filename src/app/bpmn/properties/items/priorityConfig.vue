<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="任务优先级" prop="taskPriority">
          <el-input v-model="formData.taskPriority" />
        </el-form-item>
      </el-col>

      <el-col :span="span">
        <el-form-item label="定时优先级" prop="jobPriority">
          <el-input v-model="formData.jobPriority" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'priorityConfig',
  data() {
    return {
      formData: {
        taskPriority: null,
        jobPriority: null
      },
      gutter: 10,
      span: 11
    };
  }
};
</script>

<style scoped></style>
