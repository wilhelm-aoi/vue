<template>
  <div>
    <router-view key = "$route.fullPath"></router-view>
  </div>
</template>

<script setup>

const login = '/login';
const handleContinue = () => {
  alert('你点击了继续按钮！');
};
</script>

<style scoped>

</style>
