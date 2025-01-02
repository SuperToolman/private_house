<template>
  <div class="menu-wrap">
    <div class="menu-container">
      <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          :inline-collapsed="collapsed"
          mode="inline"
          :items="items"
          @click="handleClick"
      ></a-menu>
    </div>
  </div>
</template>

<script setup>
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
import {useMenuStore} from '@/stores/menuStore'; // 引入 Pinia store

const emits = defineEmits(['handleClick']);
const api = inject('api');

// 使用 Pinia 管理折叠状态
const menuStore = useMenuStore();

// Helper function to generate menu item
function getItem(label, key, icon, children, type) {
  return {key, icon, children, label, type};
}

// Function to map icon names to icon components
function getIcon(iconName) {
  const icons = {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    ReadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  };
  return icons[iconName];
}

// 使用响应式变量初始化 selectedKeys 和 openKeys
const selectedKeys = computed(() => menuStore.selectedKeys || ['1']);  // 默认选中 '1'
const openKeys = computed(() => menuStore.openKeys || ['sub1']);  // 默认打开 'sub1'
const collapsed = computed(() => menuStore.collapsed);

// To store menu items
const items = ref([]);

// Fetch menu data and initialize the items
const initData = () => {
  api.systemMenuApi.GetAntMenuData().then(res => {
    console.log('请求菜单数据')
    if (res.isSuccess) {
      const menuData = res.data;

      // Add a default item for toggling collapse state at the beginning
      menuData.unshift({
        label: '切换菜单',
        key: 'toggle',
        icon: 'MenuUnfoldOutlined',
      });

      items.value = menuData.map(data =>
          getItem(
              data.label,
              data.key,
              data.icon ? h(getIcon(data.icon)) : undefined,
              data.children?.map(child =>
                  getItem(child.label, child.key, child.icon ? h(getIcon(child.icon)) : null, child.children, child.type)
              ),
              data.type
          )
      );
    }
  });
};

// Handle menu item clicks
const handleClick = e => {
  if (e.key === 'toggle') {
    menuStore.toggleCollapsed(); // 切换折叠状态
  } else {
    emits('handleClick', e);
  }
};

onMounted(() => {
  initData();
});

// Watch for open keys changes and update the store
watch(
    () => openKeys.value,
    (newOpenKeys) => {
      menuStore.setOpenKeys(newOpenKeys); // 使用 store 更新 openKeys
    }
);

</script>

<style scoped>
.menu-wrap {
  height: 100%;
  min-height: 100vh;
  width: auto;
}

.menu-container {
  height: 100%;
}
</style>
