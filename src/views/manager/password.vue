<script setup>
import axios from "@/axios/axios";
import {ElMessage} from "element-plus";
import {reactive, ref} from 'vue'

const user = reactive(JSON.parse(localStorage.getItem('honey-user') || '{}'));
user.newPassword = '';  // 新增字段，用于输入新密码
user.confirmPassword = '';  // 新增字段，用于确认密码
const upload = () => {
  if (user.newPassword === user.confirmPassword) {
    const newUser={
      id:user.id,
      password:user.newPassword
    }
    axios.put("/user/update", newUser).then(res => {
      if (res.code === '200') {
        ElMessage.success('密码更新成功')
        localStorage.setItem('honey-user', JSON.stringify(user))
      } else {
        ElMessage.error(res.msg)
      }
    })
  } else {
    ElMessage.error('请确认两次密码相同')
  }

}
const rules = {
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (value !== user.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

</script>

<template>
  <div style="display: flex;justify-content: center;align-content: center">
    <el-card style="width:50%">
      <el-form :model="user" label-width="80px" :rules="rules"
               style="padding-right: 20px;">
        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="user.password" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="user.newPassword" show-password placeholder="6-15个字符"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="user.confirmPassword" show-password placeholder="6-15个字符"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-bottom: 20px">
        <el-button type="primary" @click="upload">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
:deep(.el-form-item__label ){
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
  justify-content: center;
  display: flex;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}


</style>