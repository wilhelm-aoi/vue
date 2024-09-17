<script setup>
import {onMounted,ref} from 'vue';
import util from '@/util/pub-use.js';
import axios from '@/axios/axios';
import router from '@/router';



const user = JSON.parse(localStorage.getItem('honey-user') || '{}');
// 定义上传成功后的处理函数
const handleFileUpload = (response, file, fileList) => {
  console.log('上传成功的响应:', response);
  console.log('上传的文件:', file);
  console.log('当前文件列表:', fileList);
};
</script>


<template>
  <div style="display:flex; margin: 10px">
    <el-card style="width: 50%;margin-right: 10px">
      <div slot="header" class="clearfix">
        <span>文件上传下载</span>
      </div>
      <div>
        <el-upload
            class="avatar-uploader"
            action="http://localhost:9090/file/upload"
            :headers="{token:user.token}"
            :on-success="handleFileUpload"
            list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>