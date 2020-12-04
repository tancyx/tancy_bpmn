<template>
  <el-form ref="formRef" :model="formData" label-width="100px" size="mini">
    <el-row :gutter="gutter">
      <el-col :span="span">
        <el-form-item label="描述" prop="documentation">
          <el-input type="textarea" v-model="formData.documentation" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'documentation',
  data() {
    return {
      formData: {
        documentation: ''
      },
      gutter: 10,
      span: 22
    };
  }
};
</script>

<style scoped></style>
