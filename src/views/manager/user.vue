<script setup>
import {ref} from "vue";
import axios from "@/axios/axios";

const tableData = ref([]);
axios.get('/user/selectAll').then(res =>{
      tableData.value=res.data
    }
)
</script>

<template>

    <el-card style="width: 100%;height: 100%" >
      <div slot="header" class="clearfix">
        <span>渲染用户数据</span>
      </div>
      <el-table :data="tableData" style="width: 100%"  height="200px">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="Name"  />
        <el-table-column prop="username" label="userName" />
        <el-table-column prop="password" label="password" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role" />
      </el-table>
    </el-card>
</template>

<style scoped>

</style>