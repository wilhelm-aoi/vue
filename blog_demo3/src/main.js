import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';

const app = createApp(App);

// 全局定义 axios
app.config.globalProperties.$axios = axios;

// 使用路由和 ElementPlus 插件
app.use(router);
app.use(ElementPlus);

// 挂载应用到 DOM
app.mount('#app');
