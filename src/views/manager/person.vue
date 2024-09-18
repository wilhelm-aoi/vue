<script setup>
import axios from "@/axios/axios";
import {ElMessage} from "element-plus";
import {reactive} from 'vue'

const user = reactive(JSON.parse(localStorage.getItem('honey-user') || '{}'));
const handleAvatarSuccess = (response, file, fileList) => {
  console.log(response, file, fileList)
  user.avatar = response.data
}

const upload=()=>{
axios.put("/user/update",user).then(res =>{
  if (res.code === '200'){
    ElMessage.success('更新成功')
    localStorage.setItem('honey-user',JSON.stringify(user))
  }else{
    ElMessage.error(res.msg)
  }
})
}

</script>

<template>
  <div style="display: flex;justify-content: center;align-content: center">
    <el-card style="width:50%">
      <div style="  display: flex; /* 确保是 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:9090/file/upload"
          :headers="{token:user.token}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
      >
        <img v-if="user.avatar" :src="user.avatar" class="avatar"  alt=""/>
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      </div>
      <el-form :model="user" label-width="80px"
               style="padding-right: 20px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
        <el-input v-model="user.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="text" v-model="user.address" placeholder="地址"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-bottom: 20px">
      <el-button type="primary" @click="upload">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/deep/.el-form-item__label {
  font-weight: bold;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

}

.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
  justify-content: center;display: flex;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}


</style>