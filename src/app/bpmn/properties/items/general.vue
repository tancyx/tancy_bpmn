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
          <el-input v-model="formData.name" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'itemGeneral',
  data() {
    return {
      formData: {
        id: '',
        name: ''
      },
      gutter: 10,
      span: 11
    };
  }
};
</script>

<style scoped></style>
