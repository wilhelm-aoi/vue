<script setup>
import {ref} from "vue";
import axios from "@/axios/axios";
import {ElMessage, ElMessageBox} from "element-plus";


const tableData = ref([]);
// axios.get('/user/selectAll').then(res => {
//       tableData.value = res.data
//     }
// )
const user = JSON.parse(localStorage.getItem('honey-user') || '{}');
const handleTableFileUpload = (row, file, fileList) => {
  console.log(row, file, fileList)
  row.avatar = file.response.data
// this.$set(row,'avatar',file.response.data)
  console.log(row)
  axios.put('/user/update', row).then(res => {
    if (res.code === '200') {
      ElMessage.success("上传成功")
    }
  })

}

let pageNum = 1;
let pageSize = 10;
const total = ref();
const name = ref('')
const username = ref('')

const selectedRows = ref([]);  // 用于存储选择的行
const dialogVisible = ref(false);  // 控制弹窗显示
const form = ref({  // 新增用户表单数据
  username: '',
  password: '',
  email: '',
});
const formRef = ref(null);  // 表单引用

const load = (page) => {
  if (pageNum) pageNum = page;
  axios.get('/user/selectByPage', {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      username: username.value,
      name: name.value
    }
  }).then(res => {
    tableData.value = res.data.records;
    total.value = res.data.total;
  });
};

load(1);
const handleCurrentChange = (page) => {
  pageNum = page
  load(pageNum)
}
const reset = () => {
  name.value = ('')
  username.value = ('')
  load(1)
}

const handleAdd = () => {
  dialogVisible.value = true;  // 显示弹窗
};
// 新增用户逻辑
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      axios.post('/user/add', form.value).then(res => {
        if (res.code === '200') {
          ElMessage.success("新增成功");
          dialogVisible.value = false;  // 关闭弹窗
          load(1);  // 重新加载表格数据
          form.value = {  // 清空表单数据
            username: '',
            password: '',
            email: '',
          }
        } else {
          console.log(form.value)
          ElMessage.error(res.msg);
        }
      });
    }
  });
};
const resetForm = () => {
  formRef.value.resetFields();  // 重置表单字段
};
const handleDialogClose = () => {
  resetForm();  // 关闭时重置表单
};const del = (row) => {
  ElMessageBox.confirm('确定要删除这个用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.delete(`/user/delete/${row.id}`).then(res => {
      if (res.code === '200') {
        ElMessage.success("删除成功");
        load(1); // 重新加载数据
      } else {
        ElMessage.error(res.data.msg);
      }
    }).catch(err => {
      ElMessage.error("删除失败");
    });
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};


// 批量删除逻辑
const delBatch = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning("请先选择要删除的用户");
    return;
  }

  ElMessageBox.confirm('确定要删除这些用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    const ids = selectedRows.value.map(row => row.id);
    axios.delete('/user/delete/batch', {data: ids}).then(res => {
      if (res.code === '200') {
        ElMessage.success("删除成功");
        load(1);
      } else {
        ElMessage.error(res.msg)
      }
    });
  });
};

// 编辑用户逻辑
const edit = (row) => {
  ElMessageBox.prompt('编辑用户信息', '编辑', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: `${row.username},${row.name},${row.email}`,
    inputPlaceholder: '用户名, 姓名, 邮箱 (用逗号分隔)',
  }).then(({value}) => {
    const [username, name, email] = value.split(',');
    row.username = username;
    row.name = name;
    row.email = email;
    axios.put('/user/update', row).then(res => {
      if (res.data.code === '200') {
        ElMessage.success("更新成功");
        load(pageNum);
      }
    });
  });
};

// 处理选择变更
const handleSelectionChange = (selection) => {
  selectedRows.value = selection;
};


</script>

<template>

  <el-card style="width: 100%;height: 100%">
    <div slot="header" class="clearfix">
      <el-input style="width: 200px" placeholder="查询用户名" v-model="username"></el-input>
      <el-input style="width: 200px; margin: 0 5px" placeholder="查询姓名" v-model="name"></el-input>
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%; height:100%"
        stripe
        layout="auto"
        :header-cell-style="{ backgroundColor: 'aliceblue', color: '#777' }"
        @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" :min-width="60"></el-table-column>
      <el-table-column prop="username" label="用户名" :min-width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" :min-width="100"></el-table-column>


      <el-table-column label="头像" :min-width="100">
        <template v-slot="scope">
          <el-image
              v-if="scope.row.avatar"
              :src="scope.row.avatar"
              style="width: 50px; height: 50px; border-radius: 50%;"
              :fit="'cover'"
              :preview-src-list="[scope.row.avatar]"
              preview-teleported
          ></el-image>

          <el-upload
              v-else
              action="http://localhost:9090/file/upload"
              :headers="{token: user.token}"
              :show-file-list="false"
              :on-success="(row, file, fileList) => handleTableFileUpload(scope.row, file, fileList)"
          >
            <el-button type="primary" style="width: 70px;height: 32px" plain>点击上传</el-button>
          </el-upload>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址" :min-width="200"></el-table-column>

      <el-table-column prop="email" label="邮箱" :min-width="180"></el-table-column>

      <el-table-column prop="role" label="角色" :min-width="80"></el-table-column>

      <el-table-column label="操作" :min-width="150"
                       align="center">
        <template v-slot="scope">
          <div style="white-space: nowrap;">
            <el-button type="primary" plain style="margin-right: 10px;" @click="edit">编辑</el-button>
            <el-button type="danger" plain @click="del(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>

    <!-- 新增用户对话框 -->
    <el-dialog
        title="新增用户"
        v-model="dialogVisible"
        width="40%"
        @close="handleDialogClose"
    >
      <el-form ref="formRef" :model="form" label-width="100px" :rules="{
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      }">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<style scoped>

</style>