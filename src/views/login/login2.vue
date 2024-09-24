<template>
  <div style="height: 100vh;flex-direction: column; background: linear-gradient(to right, #6cd191, #9fc4e4); display: flex;">

    <div class="box">
      <!-- 左侧展示部分 -->
      <div class="pre-box">
        <h1>WELCOME</h1>
        <p>游客账号: admin</p>
        <p>游客密码: admin</p>
        <div class="img-box">
          <img class="picture" :src="getAssetsFile('register.png')" id="avatar">
        </div>
      </div>

      <!-- 注册盒子 -->
      <div class="register-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="rules"
            label-with="5px"
        >
          <el-form-item prop="username" label=" ">
            <el-input
                type="text"
                placeholder="用户名"
                :suffix-icon="User"
                v-model="registerForm.username"
            />
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input
                type="password"
                placeholder="密码"
                :suffix-icon="Lock"
                v-model="registerForm.password"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword" label=" ">
            <el-input
                type="password"
                placeholder="确认密码"
                :suffix-icon="Lock"
                v-model="registerForm.confirmPassword"
            />

          </el-form-item>
          <div style="display: flex; justify-content: center;">
            <el-form-item v-model="registerForm.role">
              <el-radio-group v-model="registerForm.role">
                <el-radio value="用户">用户</el-radio>
                <el-radio value="商家">商家</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <el-button style="display:flex;justify-content: center;height: 40px ;align-items: center;" @click="register">
            注册
          </el-button>
          <!-- 绑定点击事件 -->
          <p @click="mySwitch">已有账号?去登录</p>
        </div>
      </div>
      <!-- 登录盒子 -->
      <div class="login-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            label-with="5px"
        >
          <el-form-item prop="username" label=" ">
            <el-input
                type="text"
                placeholder="用户名"
                :suffix-icon="User"
                v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item prop="password" label=" ">
            <el-input
                type="password"
                placeholder="密码"
                :suffix-icon="Lock"
                v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item prop="captcha" label=" ">
            <div style="display: flex; align-items: center; gap: 10px;">
              <el-input
                  type="password"
                  placeholder="验证码"
                  v-model="loginForm.captcha"

              >
                <template #suffix>
                  <el-icon :style="{ color: loginForm.captcha ? 'green' : 'red' }">
                    <CircleCheck v-if="loginForm.captcha.toLowerCase() === code"/>
                    <CircleClose v-else/>
                  </el-icon>
                </template>
              </el-input>
              <validCode style="flex-basis: 30%; flex-grow: 0; background-color: white"
                         @update:value="getCode"></validCode>
            </div>
          </el-form-item>


        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <el-button style="height: 40px" @click="login">登录</el-button>
          <el-button style="height: 40px" text @click="dialogVisible = true">忘记密码</el-button>
          <!-- 绑定点击事件 -->
          <p @click="mySwitch">没有账号?去注册</p>
        </div>


          <el-dialog
              v-model="dialogVisible"
              title="重置密码"
              width="40%"
          >
            <el-form :model="loginForm" label-width="80px"
                     style="padding-right: 20px;">
              <el-form-item label="用户名">
                <el-input v-model="loginForm.username" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input type="text" v-model="loginForm.phone" placeholder="注册手机号"></el-input>
              </el-form-item>
              <el-form-item label="新密码" >
                <el-input type="text" v-model="loginForm.newPassword" placeholder="6-15个字符"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" >
                <el-input type="password" v-model="loginForm.confirmPassword"  placeholder="6-15个字符"></el-input>
              </el-form-item>
            </el-form>


            <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="reset">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
            </template>
          </el-dialog>
        </div>
      </div>


    <el-footer style="text-align: center;
  /* 水平居中 */
  align-items: center; padding: 10px;">
      ©2024 作者邮箱: sujiaxin2003@qq.com
      备案号：桂ICP备2023017425号-1
    </el-footer>
  </div>
</template>


<script setup>

import {CircleCheck, CircleClose, Lock, User} from '@element-plus/icons-vue'

const {getAssetsFile} = util
import {reactive, ref} from 'vue'
import axios from '@/axios/axios'
import {ElMessage} from 'element-plus'
import router from '../../router';
import {onMounted} from '@vue/runtime-core'
import util from "@/util/pub-use";
import ValidCode from "@/components/Vaildcode.vue";

const dialogVisible = ref(false)
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
  phone:'',
  newPassword:'',
  confirmPassword:''
})
let code = ref('')
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: '用户'
})
const reset =()=>{
  if (loginForm.newPassword === loginForm.confirmPassword) {
    const newUser={
      username:loginForm.username,
      password:loginForm.newPassword,
      phone:loginForm.phone,
    }
    axios.put("/password", newUser).then(res => {
      if (res.code === '200') {
        ElMessage.success('密码更新成功')
      } else {
        ElMessage.error(res.msg)
      }
    })
  } else {
    ElMessage.error('请确认两次密码相同')
  }

  dialogVisible.value = false;
}
const loginFormRef = ref('')
const registerFormRef = ref('')
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},],
  confirmPassword: [
    {required: true, message: '请输入确认密码', trigger: 'blur'},],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},],
  role: [
    {required: true, message: '请选择角色', trigger: 'blur'},],
}
const flag = ref(true);
const mySwitch = () => {
  const pre_box = document.querySelector('.pre-box')
  const img = document.querySelector("#avatar")
  if (flag.value) {
    pre_box.style.transform = "translateX(100%)"
    pre_box.style.backgroundColor = "#c9e0ed"
    img.src = require("@/assets/images/login.png")
  } else {
    pre_box.style.transform = "translateX(0%)"
    pre_box.style.backgroundColor = "#edd4dc"
    img.src = require("@/assets/images/register.png")
  }
  flag.value = !flag.value
}

const getCode = (newCode) => {
  code = newCode
  console.log(code)
}

const login = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      if (code.toLowerCase() === loginForm.captcha.toLowerCase()) {
        const loginData = {
          username: loginForm.username,
          password: loginForm.password,
        }

        axios.post('/login', loginData).then(res => {
          console.log('login', res)
          if (res.code === '200') {
            ElMessage.success('登录成功')
            localStorage.setItem("honey-user", JSON.stringify(res.data)) // 存储用户数据
            router.push('/manager')
          } else {
            ElMessage.error('用户名或密码错误');
          }
        })
      } else {
        ElMessage.error('验证码错误');
      }
    }
  })
}

const register = () => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      if (registerForm.password === registerForm.confirmPassword) {
        axios.post("/register", registerForm).then(res => {
          console.log('register', res)
          if (res.code === '200') {
            ElMessage.success('注册成功')
            mySwitch()
          } else {
            ElMessage.error(res.msg)
          }
        }).catch(error => {
          console.log(error);
        })
      } else {
        ElMessage.error('请确认两次密码相同');
      }


    } else {
      ElMessage.error('请输入账号密码');
    }
  })
}
</script>

<style scoped>
/* 去除input的轮廓 */


/* 最外层的大盒子 */
.box {
  width: 1050px;
  height: 600px;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
  /* 设置边框 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}

/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: 50%;
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: white;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 滑动盒子的文字 */
.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  /* 禁止选中 */
  user-select: none;
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片盒子 */
.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  /* 设置为圆形 */
  border-radius: 50%;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
  justify-content: center;
  align-content: center;
  flex: 1;
  height: 100%;

}

/* 标题盒子 */
.title-box {

}

/* 标题 */
.title-box h1 {
  text-align: center;
  color: white;
  /* 禁止选中 */
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 输入框盒子 */
.el-form {
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  /* 水平居中 */
  align-items: center;
}

.el-form-item {
  width: 65%;
  flex: 1;
  display: flex;

}


/* 输入框 */
.el-input {
  width: 100%; /* 确保输入框占满父容器 */
  height: 50px;
  outline: none;
  /* margin-bottom: 20px; */
  padding: 2px; /* 使用 padding 代替 text-indent，更符合规范 */
  border: 1px solid rgba(255, 255, 255, 0.5); /* 设置透明边框以增强磨砂效果 */
  background-color: rgba(255, 255, 255, 0.3); /* 透明背景色 */
  border-radius: 24px; /* 优化圆角大小，避免过大 */
  backdrop-filter: blur(10px); /* 磨砂效果 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影来增加立体感 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 增加过渡效果，使聚焦动画更流畅 */
}

:deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  border: 0;
  box-shadow: 0 0 0 0;
}

/* 输入框聚焦时的样式 */
.el-input:focus {
  color: #b0cfe9; /* 聚焦时的字体颜色 */
  border-color: #b0cfe9; /* 聚焦时边框颜色 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 增强聚焦时的阴影效果 */
}

.el-input::placeholder {
  color: rgba(255, 255, 255, 0.7); /* 改进占位符颜色，使其更柔和 */
  transition: opacity 0.3s ease; /* 增加占位符的过渡效果 */
}

/* 聚焦时隐藏占位符 */
.el-input:focus::placeholder {
  opacity: 0;
}


/* 按钮盒子 */
.btn-box {
  display: flex;
  justify-content: center;
}

/* 按钮 */
.el-button {
  width: 100px;
  height: 30px;
  margin: 0 7px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: white;
}

/* 按钮悬停时 */
.el-button:hover {
  /* 鼠标小手 */
  cursor: pointer;
  /* 透明度 */
  opacity: 0.8;
}

/* 按钮文字 */
.btn-box p {
  height: 30px;
  line-height: 30px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: white;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
</style>
