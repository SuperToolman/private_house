<script setup>
import { useMenuStore } from '@stores/rightMenuStore';  // 引入 Pinia store
import RightClickMenu from './RightClickMenu.vue';

// 注入资源URL
const resourceUrl = inject('resourceUrl');

// 定义组件props
const props = defineProps({
  fileInfo: { type: Object, default: null }
});

// 获取 Pinia store
const menuStore = useMenuStore();

// 判断文件类型的函数
const getFileType = (fileName) => {
  const imageFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const videoFormats = ['.mp4', '.webm', '.avi', '.mov'];

  if (imageFormats.some(format => fileName.endsWith(format))) {
    return 'image';
  } else if (videoFormats.some(format => fileName.endsWith(format))) {
    return 'video';
  }
  return 'unknown';
}

// 获取文件类型
const fileType = getFileType(props.fileInfo.name);
</script>

<template>
  <RightClickMenu>
    <div class="cover-wrap">
      <!-- 视频显示 -->
      <PhVideoMiniPlayer
          v-if="fileType === 'video'"
          :video-url="resourceUrl + fileInfo.targetUrl"
          :video-title="fileInfo.name">
        <template #trigger>
          <img class="cover" src="@assets/img/file/file_video.svg" alt=""/>
        </template>
      </PhVideoMiniPlayer>

      <!-- 图片显示 -->
      <PhImage
          class="cover image"
          v-else-if="fileType === 'image'"
          :src="resourceUrl + fileInfo.targetUrl"
          :display="'square'"/>

      <!-- 默认图标 -->
      <img class="cover" v-else src="@assets/HarmonyOS_Icons/ic_normal_white_grid_unknown.svg" alt=""/>
    </div>
  </RightClickMenu>

  <div class="title">{{ fileInfo.name }}</div>
</template>

<style scoped>
.cover-wrap {
  width: 100%;
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .cover {
    width: 100%;
    height: 100%;
  }

  .image {
    height: 50px;
    width: 50px;
  }
}

.title {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>
