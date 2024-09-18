<script setup>
import {ref} from "vue";
import axios from "@/axios/axios";
import {ElMessage} from "element-plus";


const tableData = ref([]);
axios.get('/user/selectAll').then(res => {
      tableData.value = res.data
    }
)
const user = JSON.parse(localStorage.getItem('honey-user') || '{}');
const handleTableFileUpload = (row, file, fileList) => {
  console.log(row, file, fileList)
  row.avatar = file.response.data
// this.$set(row,'avatar',file.response.data)
  console.log(row)
  axios.put('/user/update', row).then(res => {
    if (res.code === '200') {
      ElMessage.success("上传成功")
    }
  })

}

</script>

<template>

  <el-card style="width: 100%;height: 100%">
    <div slot="header" class="clearfix">
      <span>渲染用户数据</span>
    </div>
    <el-table :data="tableData" style="width: 100% ;height:100%">
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="username" label="userName"/>
      <el-table-column label="文件上传">
        <template v-slot="scope">
          <el-upload
              action="http://localhost:9090/file/upload"
              :headers="{token: user.token}"
              :show-file-list="false"
              :on-success="(row, file, fileList)=> handleTableFileUpload(scope.row, file, fileList)">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="文件上传">
        <template v-slot="scope">
          <el-image
              v-if="scope.row.avatar"
              :src="scope.row.avatar"
              style="width: 50px; height: 50px;  border-radius: 50%;"
              :fit="'cover'"
              :preview-src-list="[scope.row.avatar]"
              preview-teleported
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="Address"/>
      <el-table-column prop="email" label="Email"/>
      <el-table-column prop="role" label="Role"/>
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