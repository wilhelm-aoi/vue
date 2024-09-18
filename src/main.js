import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from './axios/axios.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 使用路由和 ElementPlus 插件
app.use(router);
app.use(ElementPlus);

// 挂载应用到 DOM
app.mount('#app');
