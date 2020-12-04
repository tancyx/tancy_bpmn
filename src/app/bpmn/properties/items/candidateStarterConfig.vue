<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="启动用户" prop="candidateStarterUsers">
          <el-input v-model="formData.candidateStarterUsers" />
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="启动组" prop="candidateStarterGroups">
          <el-input v-model="formData.candidateStarterGroups" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'candidateStarterConfig',
  data() {
    return {
      formData: {
        candidateStarterUsers: '',
        candidateStarterGroups: ''
      },
      gutter: 10,
      span: 11
    };
  }
};
</script>

<style scoped></style>
