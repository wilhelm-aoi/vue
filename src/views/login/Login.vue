<script lang="ts" setup>
import { reactive, ref,onBeforeMount,inject } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import util from '../../util/pub-use.js';
import axios from '../../axios/axios.js';
import router from '../../router';
const {getAssetsFile}= util
// 定义组件名称
defineOptions({
  name: 'login'
})




const loginFormRef = ref<FormInstance | null>(null)  // 确保可以是 null
const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  token: ''

})
const captchaImg  = ref<string | null>(null)  // 使用 ref 而不是 reactive

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
})
const submitForm = async () => {
  // 验证输入
  if (!loginForm.username || loginForm.username.length < 3) {
    alert('用户名必须至少包含3个字符');
    return;
  }
  if (!loginForm.password || loginForm.password.length < 6) {
    alert('密码必须至少包含6个字符');
    return;
  }

  try {
    const response = await axios.post('/login', {
      username: loginForm.username,
      password: loginForm.password,
      code: loginForm.code, // 包含验证码
    });

    if (response.data.code === 200) {
      localStorage.setItem('token', response.data.data.token); // 存储 token
      await router.push('/home'); // 登录成功后重定向
    } else {
      alert(response.data.msg); // 显示错误信息
    }
  } catch (error) {
    console.error('登录请求失败', error);
  }
};


// 获取验证码函数
const getCaptcha = async () => {
    try{const res = await axios.get('/captcha')
    loginForm.token = res.data.data.token
    captchaImg.value = res.data.data.captchaImg  // 正确绑定 captchaImg
} catch (error) {
  // 这里单独处理验证码请求的错误，而不是通过拦截器
  console.error('获取验证码失败', error);

}}

onBeforeMount(() => {
  getCaptcha();
})
const resetForm = () => {
  if (loginFormRef.value) {
    loginFormRef.value.resetFields()
  }
}
const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))


</script>
<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <div class="grid-content ep-bg-purple" />
      <h2>动漫小屋ようこそ</h2>
      <img class="picture" :src="getAssetsFile('author.jpg')" alt="">
      <p>公众号 xxxxx</p>
      <p>扫码二维码，回复【 xxxxx 】获取登录密码</p>
    </el-col>

    <el-col :span="1">
      <el-divider direction="vertical" />
    </el-col>

    <el-col :xl="6" :lg="7">
      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          label-width="80px"
          class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-input v-model="loginForm.code" style="width: 172px;float: left"/>
          <el-image :src="captchaImg" class="captchaImg"></el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>

.el-row {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;



  //min-height: 100vh; /* 确保行的高度为视口高度的 100% */
}

.el-col {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}

.picture {
  height: 180px;
  width: 180px;
}

.el-divider {
  height: 200px;
  width: 10px;
}
</style>
