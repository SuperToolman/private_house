<template>
  <div class="content">
    <Menu @handle-click="handleMenuClick"></Menu>
    <div class="content-body">
      <router-view :key="activeTabKey" />
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const activeTabKey = ref(''); // 当前激活的标签页

// 处理菜单点击事件，打开新的标签页
const handleMenuClick = (e) => {
  activeTabKey.value = e.key;
  router.push(e.key); // 切换路由
};

</script>

<style>
.content {
  display: flex;

  .content-body{
    width: 100%;
    padding: 0 10px;
    background-color: var(--bg3);
  }
}
</style>
