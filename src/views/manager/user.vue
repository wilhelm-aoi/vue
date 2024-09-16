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
      <el-table :data="tableData" style="width: 100% ;height:100%">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="Name"  />
        <el-table-column prop="username" label="userName" />
        <el-table-column prop="password" label="password" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role" />
        <el-table-column label="操作">
          <template v-slot="scope">
            <div style="display: flex; gap: 10px;">
              <el-button type="primary" plain>编辑</el-button>
              <el-button type="danger" plain>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<style scoped>

</style>