<template>
  <div class="content">
    <Menu @handle-click="handleMenuClick"></Menu>
    <div class="content-body">
      <keep-alive>
        <a-tabs
            style="width: 100%"
            v-model:activeKey="activeTabKey"
            type="editable-card"
            @change="handleTabChange"
            @edit="removeTab"
        >
          <a-tab-pane
              v-for="pane in panes"
              :key="pane.key"
              :tab="pane.title"
          >
            <!-- 使用 slot 来渲染每个标签页的内容 -->
            <div v-if="activeTabKey === pane.key">
              <!-- 将 router-view 放在 a-tabs 外部 -->
              <router-view :key="activeTabKey" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeTabKey = ref(''); // 当前激活的标签页
const panes = ref([]); // 动态生成的标签页数据

// 处理菜单点击事件，打开新的标签页
const handleMenuClick = (e) => {
  if (!panes.value.some((pane) => pane.key === e.key)) {
    panes.value.push({ title: e.item.originItemValue.label, key: e.key });
  }
  activeTabKey.value = e.key;
  router.push(e.key); // 切换路由
};

// 处理标签页切换事件
const handleTabChange = (key) => {
  activeTabKey.value = key;
  router.push(key); // 切换到对应的路由
};

// 处理标签页移除事件
const removeTab = (targetKey, action) => {
  if (action === 'remove') {
    const targetIndex = panes.value.findIndex((pane) => pane.key === targetKey);
    if (targetIndex !== -1) {
      panes.value.splice(targetIndex, 1);
      if (activeTabKey.value === targetKey && panes.value.length > 0) {
        activeTabKey.value = panes.value[Math.max(targetIndex - 1, 0)].key;
        router.push(activeTabKey.value);
      }
    }
  }
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
