<script setup>
import {useMenuStore} from '@stores/rightMenuStore';// 引入 Pinia store

const resourceUrl = inject('resourceUrl')
const router = useRouter()
const route = useRoute()
// 接收 fileInfo 数据
const props = defineProps({
  fileInfo: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['PlayVideo'])

// 获取 Pinia store
const menuStore = useMenuStore();

// 菜单显示状态
const menuVisible = ref(false);
const menuPosition = reactive({x: 0, y: 0});

// 当前菜单实例的标识符
const menuId = Symbol();

// 获取文件扩展名
const getFileExtension = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  return ext;
};

// 动态菜单项
const menuItems = computed(() => {
  const ext = getFileExtension(props.fileInfo.name);

  if (ext === 'mp4' || ext === 'avi' || ext === 'mov' || ext === 'webm') {
    // 如果是视频类型，返回视频相关菜单
    return [
      {label: '播放视频', action: () => emits('PlayVideo',props.fileInfo)},
      {
        label: '上传至标准视频',
        action: () => {
          // 跳转到 Upload 页面，并携带文件路径作为查询参数
          router.push({
            path: '/video/upload/standard',
            query: { filePath: resourceUrl + props.fileInfo.targetUrl }
          })
        }},
      {label: '上传至差分视频', action: () => alert('Upload diff video')}
    ];
  } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') {
    // 如果是图片类型，返回图片相关菜单
    return [
      {label: 'View Image', action: () => alert('View image action')},
      {label: 'Upload Image', action: () => alert('Upload image')}
    ];
  } else {
    // 对于其他类型文件，显示默认菜单
    return [
      {label: 'Refresh', action: () => alert('Refresh action')},
      {label: 'Copy', action: () => alert('Content copied')},
      {label: 'Inspect', action: () => alert('Inspecting element')}
    ];
  }
});

// 显示菜单的方法
const showMenu = (event) => {
  event.preventDefault(); // 阻止浏览器默认右键菜单
  if (menuStore.activeMenu !== menuId) {
    menuStore.setActiveMenu(menuId); // 激活当前菜单
  }
  menuPosition.x = event.pageX;
  menuPosition.y = event.pageY;
  menuVisible.value = true;
};

// 隐藏菜单的方法
const hideMenu = () => {
  if (menuStore.activeMenu === menuId) {
    menuStore.hideMenu(); // 取消激活
    menuVisible.value = false;
  }
};

// 点击菜单项后隐藏菜单并执行对应操作
const handleItemClick = (item) => {
  item.action();
  hideMenu();
};

// 全局点击事件，用于关闭菜单
const handleGlobalClick = (event) => {
  if (!event.target.closest('.context-menu')) {
    hideMenu();
  }
};

// 监听 store 中的 activeMenu 变化，确保只有一个菜单显示
watch(() => menuStore.activeMenu, (newActiveMenu) => {
  if (newActiveMenu !== menuId) {
    menuVisible.value = false; // 隐藏当前菜单
  }
});

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<template>
  <!-- Slot内容作为右键触发区域 -->
  <div @contextmenu.prevent="showMenu">
    <slot></slot>
  </div>

  <!-- 右键菜单 -->
  <div
      v-show="menuVisible"
      class="context-menu"
      :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }"
  >
    <ul>
      <li
          v-for="(item, index) in menuItems"
          :key="index"
          @click="() => handleItemClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.context-menu {
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
}

.context-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>