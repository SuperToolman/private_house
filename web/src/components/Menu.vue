<script setup>
// 导入图标组件
import {
  HomeOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  BarChartOutlined,
  BellOutlined
} from '@ant-design/icons-vue';
import { useMenuStore } from '@/stores/menuStore';
import {useAuthStore} from "@stores/authStore";

// 常量定义
const CACHE_KEY = 'menuData';
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;  // 1小时过期时间

// 依赖注入和事件发射器
const api = inject('api');
const emits = defineEmits(['handleClick']);
const resourceByUserAvatarUrl = inject('resourceByUserAvatarUrl')

// 状态管理
const menuStore = useMenuStore();
const auth = useAuthStore()

/**
 * 图标映射表
 * 用于将字符串图标名称转换为对应的组件
 */
const ICON_MAP = {
  HomeOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  BarChartOutlined,
  BellOutlined
};

/**
 * 生成菜单项
 * @param {string} label - 显示文本
 * @param {string} key - 唯一标识
 * @param {VNode} icon - 图标组件
 * @param {Array} children - 子菜单项
 * @param {string} type - 菜单类型
 * @returns {Object} 菜单项配置
 */
function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

/**
 * 获取图标组件
 * @param {string} iconName - 图标名称
 * @returns {Component|undefined} 图标组件
 */
function getIcon(iconName) {
  return ICON_MAP[iconName];
}


// 响应式数据
const items = ref([]);
const quickItems = ref([]); // 添加快捷功能菜单数组
const selectedKeys = computed(() => menuStore.selectedKeys || ['1']);
const quickSelectedKeys = ref([]); // 快捷功能菜单的选中项
const openKeys = computed(() => menuStore.openKeys || ['sub1']);
const quickOpenKeys = ref([]); // 快捷功能菜单的展开项
const collapsed = computed(() => menuStore.collapsed);

// 定义快捷功能菜单数据
const quickMenuData = [
  {
    label: '上传视频',
    key: 'upload',
    icon: 'UploadOutlined',
  },
  {
    label: '数据统计',
    key: 'stats',
    icon: 'BarChartOutlined',
    children: [
      {
        label: '播放统计',
        key: 'play-stats',
      },
      {
        label: '收藏统计',
        key: 'favorite-stats',
      }
    ]
  },
  // 可以继续添加更多快捷功能菜单项
];

/**
 * 从本地存储获取缓存的菜单数据
 * @returns {Array|null} 菜单数据或null
 */
function getCachedMenuData() {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return null;

  const { data, timestamp } = JSON.parse(cachedData);
  const isExpired = Date.now() - timestamp >= CACHE_EXPIRATION_TIME;

  if (isExpired) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return data;
}

const handleLoginOut = () => {
  auth.clearAuth()
  router.push('/login')
  message.success('退出登录成功')
}

/**
 * 将菜单数据保存到本地存储
 * @param {Array} data - 菜单数据
 */
function setCachedMenuData(data) {
  const cache = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

/**
 * 将API返回的数据转换为菜单项
 * @param {Array} menuData - API返回的菜单数据
 * @returns {Array} 处理后的菜单项
 */
function transformMenuData(menuData) {
  // 检查是否已经存在默认菜单项
  const hasToggleMenu = menuData.some(item => item.key === 'toggle');
  const hasHomeMenu = menuData.some(item => item.key === '/');

  // 只添加不存在的默认菜单项
  const defaultItems = [];

  if (!hasToggleMenu) {
    defaultItems.push({
      label: '切换菜单',
      key: 'toggle',
      icon: 'MenuUnfoldOutlined',
    });
  }

  if (!hasHomeMenu) {
    defaultItems.push({
      label: '首页',
      key: '/',
      icon: 'HomeOutlined',
    });
  }

  const allMenuData = [...defaultItems, ...menuData];

  return allMenuData.map(data => getItem(
    data.label,
    data.key,
    data.icon ? h(getIcon(data.icon)) : undefined,
    data.children?.map(child =>
      getItem(
        child.label,
        child.key,
        child.icon ? h(getIcon(child.icon)) : null,
        child.children,
        child.type
      )
    ),
    data.type
  ));
}

/**
 * 初始化菜单数据
 */
const initData = async () => {
  const cachedData = getCachedMenuData();

  if (cachedData) {
    console.log('使用缓存的菜单数据', cachedData);
    items.value = transformMenuData(cachedData);
    return;
  }

  try {
    const res = await api.systemMenuApi.GetAntMenuData();
    if (res.isSuccess) {
      console.log('请求菜单数据');
      setCachedMenuData(res.data);
      items.value = transformMenuData(res.data);
    }
  } catch (error) {
    console.error('获取菜单数据失败:', error);
  }
};

/**
 * 处理菜单点击事件
 * @param {Event} e - 点击事件对象
 */
const handleClick = e => {
  if (e.key === 'toggle') {
    menuStore.toggleCollapsed();
  } else {
    emits('handleClick', e);
  }
};

// 处理快捷功能菜单点击
const handleQuickMenuClick = (e) => {
  console.log('快捷功能菜单点击:', e.key);
  // 这里可以添加快捷功能的处理逻辑
};

// 生命周期钩子
onMounted(() => {
  initData();
  // 初始化快捷功能菜单
  quickItems.value = quickMenuData.map(data => getItem(
    data.label,
    data.key,
    data.icon ? h(getIcon(data.icon)) : undefined,
    data.children?.map(child =>
      getItem(
        child.label,
        child.key,
        child.icon ? h(getIcon(child.icon)) : null,
        child.children,
        child.type
      )
    ),
    data.type
  ));
});

// 监听器
watch(() => openKeys.value, (newOpenKeys) => {
  menuStore.setOpenKeys(newOpenKeys);
});

// 添加底部菜单项
const bottomMenuItems = ref([
  {
    label: '个人设置',
    key: 'settings',
    icon: h(SettingOutlined),
  },
  {
    label: '消息通知',
    key: 'notifications',
    icon: h(BellOutlined),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: h('span', { class: 'anticon' }, [h('i', { class: 'ri-logout-box-line' })]),
    danger: true
  }
]);
</script>

<template>
  <div class="menu-wrap" :class="{ 'collapsed': collapsed }">
    <div class="menu-container">
      <!-- 管理员信息区域 -->
      <div class="admin-info" :class="{ 'collapsed': collapsed }">
        <div class="avatar-container">
          <a-avatar :size="32" :src="resourceByUserAvatarUrl+'96f863d1-d4b6-4afd-8470-c66cf65a1776.webp'">
            {{ auth.admin.name.charAt(0) }}
          </a-avatar>
        </div>
        <div class="admin-details" v-show="!collapsed">
          <div class="greeting">Good Day</div>
          <div class="admin-name">{{ auth.admin.name }}</div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="divider" />

      <!-- 菜单 -->
      <div class="menu-content-wrap">
        <div class="menu-content-header">
          <div class="menu-content-header-title">
            <span>导航菜单</span>
          </div>
        </div>
        <div class="menu-content-body">
          <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" :inline-collapsed="collapsed"
          mode="inline" :items="items" @click="handleClick" />
        </div>
        
      </div>

      <!-- 分割线 -->
      <div class="divider" />

      <!-- 快捷功能菜单 -->
      <div class="menu-content-wrap">
        <div class="menu-content-header">
          <div class="menu-content-header-title">
            <span>快捷功能</span>
          </div>
        </div>
        <div class="menu-content-body quick-menu-wrap">
          <a-menu v-model:openKeys="quickOpenKeys" v-model:selectedKeys="quickSelectedKeys"
            :inline-collapsed="collapsed" mode="inline" :items="quickItems" @click="handleQuickMenuClick" />
        </div>
      </div>

      <!-- 添加弹性空间 -->
      <div class="flex-spacer"></div>

      <!-- 分割线 -->
      <div class="divider" />

      <!-- 底部菜单 -->
      <div class="menu-content-wrap bottom-menu">
        <a-menu
          mode="inline"
          :inline-collapsed="collapsed"
          :items="bottomMenuItems"
          @click="handleBottomMenuClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-content-wrap{
  .menu-content-header{
    .menu-content-header-title{
      font-size: 12px;
      font-weight: 600;
      color: #8b949e;
      text-align: center;
    }
  }
  .menu-content-body{
  }
}

.menu-wrap {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 160px;
  background-color: #1f1f1fec;
  transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1000;

  &.collapsed {
    width: 80px;
  }
}

.menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* 管理员信息区域 */
.admin-info {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 72px;
  /* 固定高度 */
  box-sizing: border-box;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.admin-info.collapsed {
  padding: 16px;
  justify-content: center;
}

.avatar-container {
  flex-shrink: 0;
}

.admin-details {
  flex: 1;
  min-width: 0;
  /* 防止文本溢出 */
}

.greeting {
  color: #8b949e;
  font-size: 12px;
  line-height: 1.2;
  margin-bottom: 4px;
}

.admin-name {
  color: #e6edf3;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 分割线 */
.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 16px 8px;
}

/* 菜单样式 */
:deep(.ant-menu) {
  flex: 1;
  border-right: none !important;
  background: transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
}

:deep(.ant-menu-inline-collapsed) {
  width: 80px;
}

/* 菜单项样式 */
:deep(.ant-menu-item),
:deep(.ant-menu-submenu-title) {
  display: flex;
  align-items: center;
  padding: 0 16px !important;
  margin: 0 !important;
  color: rgba(255, 255, 255, 0.65) !important;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}

/* 图标样式 */
:deep(.ant-menu-item .anticon),
:deep(.ant-menu-submenu-title .anticon) {
  min-width: 14px;
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.65) !important;
}

/* 选中和悬停状态 */
:deep(.ant-menu-item:hover),
:deep(.ant-menu-item-selected),
:deep(.ant-menu-submenu-title:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
}

:deep(.ant-menu-item-selected .anticon) {
  color: #fff !important;
}

/* 头像样式 */
:deep(.ant-avatar) {
  background: #304878;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s;
}

:deep(.ant-avatar:hover) {
  transform: scale(1.05);
}

/* 子菜单样式 */
:deep(.ant-menu-sub.ant-menu-inline) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
}

:deep(.ant-menu-sub.ant-menu-inline .ant-menu-item) {
  padding-left: 48px !important;
  color: rgba(255, 255, 255, 0.65) !important;
}

/* 确保折叠动画平滑 */
:deep(.ant-menu-inline-collapsed) {

  .ant-menu-item,
  .ant-menu-submenu-title {
    padding: 0 28px !important;
    transition: padding 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  }
}

/* 子菜单展开时的标题颜色 */
:deep(.ant-menu-submenu-open > .ant-menu-submenu-title) {
  color: #fff !important;
}

/* 确保子菜单文字也是浅色 */
:deep(.ant-menu-sub) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
}

/* 为快捷功能菜单添加一些特殊样式（如果需要） */
.menu-content-wrap:last-child {
  .menu-content-header-title {
    color: #b4b4b4;
    /* 稍微区分一下快捷功能的标题颜色 */
  }
}

/* 添加弹性空间样式 */
.flex-spacer {
  display: none;
}

/* 底部菜单样式 */
.bottom-menu {
  margin-top: auto;
  margin-bottom: 16px;

  :deep(.ant-menu-item) {
    margin: 4px 0 !important;
  }

  /* 登出按钮样式 */
  :deep(.ant-menu-item-danger) {
    color: #ff4d4f !important;

    .anticon {
      color: #ff4d4f !important;
    }

    &:hover {
      background: rgba(255, 77, 79, 0.1) !important;
    }
  }
}

/* 确保底部菜单在折叠时也能正确显示 */
:deep(.ant-menu-inline-collapsed) {
  .ant-menu-item {
    padding: 0 28px !important;
  }
}

/* 图标样式补充 */
:deep(.ri-logout-box-line) {
  display: inline-block;
  font-size: 16px;
  vertical-align: -0.125em;
}

/* 移除之前的内容区域相关样式 */
:deep(.ant-layout-content) {
  /* 移除这些样式 */
}
</style>
