<script setup>
import { onMounted } from 'vue';
import util from '@/util/pub-use.js';
import axios from '@/axios/axios';
import router from '@/router';

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:9090/user/selectAll');
    console.log(res);
  } catch (error) {
    console.error('Request failed:', error);
  }
});
</script>


<template>
<div>测试</div>
</template>

<style scoped>

</style>