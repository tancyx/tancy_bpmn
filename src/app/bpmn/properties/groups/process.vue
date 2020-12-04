<template>
  <el-tabs type="card">
    <el-tab-pane label="基础属性">
      <general></general>
    </el-tab-pane>
    <el-tab-pane label="扩展属性">
      <extensions></extensions>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import General from './tabs/general';
import Extensions from './tabs/extensions';

export default {
  name: 'process',
  components: {
    General,
    Extensions
  }
};
</script>

<style scoped></style>
