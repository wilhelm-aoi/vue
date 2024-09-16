<script setup>
const user = JSON.parse(localStorage.getItem('honey-user') || '{}');
</script>

<template>
<el-card>
  <div v-if="user.role === '管理员'">
    欢迎访问本网站，您目前的角色为管理员，可以看到全部信息
  </div>
  <div v-if="user.role === '用户'">
    欢迎访问本网站，您目前的角色为游客，仅能看到部分信息
  </div>
  <div>
    网站正在不断开发中，功能尚待完善。作者邮箱 sujiaxin2003@qq.com
  </div>
</el-card>
</template>

<style scoped>

</style>