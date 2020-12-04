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
        <template slot-scope="{ row }">
          <el-input v-model="row.name" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="value" label="值">
        <template slot-scope="{ row }">
          <el-input v-model="row.value" size="mini" />
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
export default {
  name: 'properties',
  data() {
    return {
      propertiesTable: [],
      gutter: 10,
      span: 11
    };
  },
  methods: {
    addClick() {
      this.propertiesTable.push({
        name: '',
        value: ''
      });
    },
    deleteClick(index) {
      this.propertiesTable.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>
