<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
defineOptions({
  name: "404",
});
</script>

<template>
<div style="height: 100vh;overflow: hidden; display: flex; align-items: center; justify-content: center">
  404 找不到页面，<router-link to="/login2">返回登录页</router-link>
</div>
</template>

<style scoped>

</style>