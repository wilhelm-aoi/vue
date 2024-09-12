<script setup>
import { onMounted } from 'vue';
import util from '@/util/pub-use.js';
import axios from '@/axios/axios';
import router from '@/router';

onMounted(async () => {
  try {
    const res = await axios.get(this.$baseUrl +'/user/selectAll');
    console.log(res);
  } catch (error) {
    console.error('Request failed:', error);
  }
  console.log(process.env.VUE_APP_BASEURL);
});

</script>


<template>
<div>测试</div>
</template>

<style scoped>

</style>