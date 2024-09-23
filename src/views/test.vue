<script setup>
import { onMounted, ref} from 'vue';
import util from '@/util/pub-use.js';
import axios from '@/axios/axios';
import router from '@/router';




const user = JSON.parse(localStorage.getItem('honey-user') || '{}');
const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL);
</script>


<template>
  <div style="display:flex; margin: 10px">
    <el-card style="width: 50%;margin-right: 10px">
     <div>
       {{apiBaseUrl}}
     </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>