<script setup>
import {House, Menu, Fold, Expand, ArrowRight, ArrowDown} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import axios from "@/axios/axios";
import router from "@/router";

defineOptions({
  name: "home",
});

const isCollapse = ref(false);
const tableData = ref([]);
axios.get('/user/selectAll').then(res =>{
  tableData.value=res.data
    }
)
// onMounted(async () => {
//   try {
//     const response = await axios.get('/user/selectAll');
//     tableData.value = response.data;
//     console.log(tableData);
//   } catch (error) {
//     console.error('Request failed:', error);
//   }
// })

const collapseIcon =ref('Fold');
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  collapseIcon.value = isCollapse.value ? 'Expand' :'Fold'
};

const logout =()=>{
  localStorage.removeItem('honey-user')
  this.$router.push('/login2')
}
</script>

<template>
  <el-container>
    <!-- 侧边栏 -->

    <el-aside :style="{ width: isCollapse ? '64px' : '200px', minHeight: '100vh', backgroundColor: '#001529' }">
    <!--  v-if="!isCollapse"-->

        <div class="logo">Suda</div>
      <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          background-color="#001529"
          text-color="rgba(255,255,255,0.65)"
          active-text-color="#fff"
          style="border: none"
          default-active="1"
          :default-openeds="['5']"
      >
        <!-- 菜单项示例 -->
        <el-menu-item index="1">
          <el-icon><House /></el-icon>
          <span>系统首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><House /></el-icon>
          <span>系统首页</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><House /></el-icon>
          <span>系统首页</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><House /></el-icon>
          <span>系统首页</span>
        </el-menu-item>
        <!-- 子菜单示例 -->
        <el-sub-menu index="5">
          <template #title>
            <el-icon><House /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item class="submenu" index="5-1">item one</el-menu-item>
          <el-menu-item class="submenu" index="5-2">item two</el-menu-item>
          <el-menu-item class="submenu" index="5-3">item three</el-menu-item>
          <el-sub-menu  index="5-4">
            <template #title>item four</template>
            <el-menu-item class="submenu"  index="5-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-aside>


    <el-container>
      <!-- 头部部分 -->
      <el-header>
        <el-icon @click="handleCollapse" style="font-size: 26px;">
          <component :is="collapseIcon" />
        </el-icon>
        <el-breadcrumb :separator-icon="ArrowRight" style="margin-left:20px">
          <el-breadcrumb-item :to="{ path: '/' }">user</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>

        </el-breadcrumb>
        <div style="flex:1;width:0;display: flex; align-items: center; justify-content:flex-end">
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
              <span>管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主体部分 -->
      <el-main>
        <el-card style="width: 50%" >
          <div slot="header" class="clearfix">
            <span>渲染用户数据</span>
          </div>
          <el-table :data="tableData" style="width: 100%"  height="200px">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="name" label="Name"  />
            <el-table-column prop="username" label="userName" />
            <el-table-column prop="password" label="Address" />
          </el-table>
        </el-card>

      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
/* 侧边栏Logo样式 */
.logo {
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

/* 菜单项选中时的样式 */
.el-menu-item.is-active {
  background-color: #409eff !important;
  color: #fff !important;
  margin: 5px;
  border-radius: 8px;
}

/* 菜单项默认样式 */
.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;

}

/* 菜单项悬停样式 */
.el-menu-item:hover,
::v-deep .el-sub-menu__title:hover {
  color: #fff !important;
  background-color: #001529 !important;
  font-weight: bold;
}

/* el-icon的hover效果 */
.el-menu-item:hover .el-icon,
::v-deep .el-sub-menu__title:hover .el-icon {
  color: #fff !important;
}

/* 菜单项和子菜单标题高度和行高 */
.el-menu-item,
.el-sub-menu__title {

  margin: 5px;
}

/* 未折叠菜单的宽度 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-sub-menu{
  margin: 5px;
}

.submenu{
  height: 40px !important;
  line-height: 40px !important;
  margin: 0 5px;
  padding: 5px;


}

.el-aside {
  transition: width .3s;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
}
.el-header{
  height: 50px;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  display: flex;
  align-items: center; /* 垂直居中 */
}
</style>
