<template>
  <div class="tabs">
    <div class="tab-bar">
      <div
          v-for="pane in panes"
          :key="pane.key"
          :class="['tab', { active: pane.key === activeTabKey }]"
          @click="activateTab(pane.key)"
      >
        {{ pane.title }}
        <span class="close-btn" @click.stop="removeTab(pane.key)">x</span>
      </div>
    </div>
    <div class="tab-content">
      <keep-alive>
        <component :is="getCurrentComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeTabKey = ref(''); // 当前激活的标签页
const panes = ref([]); // 存储所有标签页的信息

const activateTab = (key) => {
  activeTabKey.value = key;
  router.push(key); // 切换路由
};

const addTab = (title, key, component) => {
  if (!panes.value.some((pane) => pane.key === key)) {
    panes.value.push({ title, key, component });
    activeTabKey.value = key;
    router.push(key); // 切换路由
  }
};

const removeTab = (key) => {
  const targetIndex = panes.value.findIndex((pane) => pane.key === key);
  if (targetIndex !== -1) {
    panes.value.splice(targetIndex, 1);
    if (activeTabKey.value === key && panes.value.length > 0) {
      const nextTab = panes.value[Math.max(targetIndex - 1, 0)];
      activateTab(nextTab.key);
    }
  }
};

const getCurrentComponent = () => {
  const activePane = panes.value.find((pane) => pane.key === activeTabKey.value);
  return activePane ? activePane.component : null;
};

export default defineComponent({
  setup() {
    return {
      activeTabKey,
      panes,
      activateTab,
      addTab,
      removeTab,
      getCurrentComponent,
    };
  },
});
</script>

<style scoped>
.tabs {
  width: 100%;
}
.tab-bar {
  display: flex;
  background-color: #f0f0f0;
  padding: 0.5rem;
}
.tab {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}
.tab.active {
  background-color: #1890ff;
  color: #fff;
}
.close-btn {
  margin-left: 0.5rem;
  cursor: pointer;
  color: red;
}
.tab-content {
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
}
</style>
