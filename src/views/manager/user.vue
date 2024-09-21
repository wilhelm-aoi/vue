<script setup>
import {ref} from "vue";
import axios from "@/axios/axios";
import {ElMessage} from "element-plus";


const tableData = ref([]);
// axios.get('/user/selectAll').then(res => {
//       tableData.value = res.data
//     }
// )
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

let pageNum = 1;
let pageSize = 10;
const total =ref();
const name=ref('')
const username=ref('')
const load = (page) => {
  if (pageNum) pageNum = page;
  axios.get('/user/selectByPage', {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      username: username.value,
      name:name.value
    }
  }).then(res => {
    tableData.value = res.data.records;
    total.value = res.data.total;
  });
};

load(1);
const handleCurrentChange=(page)=>{
  pageNum = page
  load(pageNum)
}
const reset= () => {
  name.value=('')
  username.value=('')
  load(1)
}

</script>

<template>

  <el-card style="width: 100%;height: 100%">
    <div slot="header" class="clearfix">
      <el-input style="width: 200px" placeholder="查询用户名" v-model="username"></el-input>
      <el-input style="width: 200px; margin: 0 5px" placeholder="查询姓名"  v-model="name"></el-input>
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%; height:100%"
        stripe
        layout="auto"
    :header-cell-style="{ backgroundColor: 'aliceblue', color: '#777' }"
    @selection-change="handleSelectionChange"
    >

    <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" :min-width="60"></el-table-column>
    <el-table-column prop="name" label="姓名" :min-width="100"></el-table-column>

    <el-table-column prop="username" label="用户名" :min-width="150"></el-table-column>

    <el-table-column label="头像" :min-width="100">
      <template v-slot="scope">
        <el-image
            v-if="scope.row.avatar"
            :src="scope.row.avatar"
            style="width: 50px; height: 50px; border-radius: 50%;"
            :fit="'cover'"
            :preview-src-list="[scope.row.avatar]"
            preview-teleported
        ></el-image>

        <el-upload
            v-else
            action="http://localhost:9090/file/upload"
            :headers="{token: user.token}"
            :show-file-list="false"
            :on-success="(row, file, fileList) => handleTableFileUpload(scope.row, file, fileList)"
        >
          <el-button type="primary" style="width: 70px;height: 32px" plain>点击上传</el-button>
        </el-upload>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="地址" :min-width="200"></el-table-column>

    <el-table-column prop="email" label="邮箱" :min-width="180"></el-table-column>

    <el-table-column prop="role" label="角色" :min-width="80"></el-table-column>

    <el-table-column label="操作" :min-width="150"
                     align="center">
      <template v-slot="scope">
        <div style="white-space: nowrap;">
          <el-button type="primary" plain style="margin-right: 10px;" @click="edit">编辑</el-button>
          <el-button type="danger" plain>删除</el-button>
        </div>
      </template>
    </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>

<style scoped>

</style>