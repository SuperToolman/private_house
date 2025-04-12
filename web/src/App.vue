<template>
  <div class="app-container">
    <Menu @handle-click="handleMenuClick" />
    <div class="content-body" :class="{ 'collapsed': menuStore.collapsed }">
      <router-view :key="activeTabKey" />
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menuStore'
const router = useRouter();
const menuStore = useMenuStore();
const activeTabKey = ref(''); // 当前激活的标签页

// 处理菜单点击事件，打开新的标签页
const handleMenuClick = (e) => {
  activeTabKey.value = e.key;
  router.push(e.key); // 切换路由
};
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  background-color: var(--bg3);
  display: flex;
}

.content-body {
  flex: 1;
  min-height: 100vh;
  padding: 16px;
  margin-left: 160px;
  transition: margin-left 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.collapsed {
    margin-left: 80px;
  }
}
</style>
