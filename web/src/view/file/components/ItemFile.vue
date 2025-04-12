<script setup>
import {useMenuStore} from '@stores/rightMenuStore';  // 引入 Pinia store
import RightClickMenu from './RightClickMenu.vue';

const resourceUrl = inject('resourceUrl');
// 当前是否打开视频播放器
const isVideoOpen = ref(false);


// 定义组件props
const props = defineProps({
  fileInfo: {type: Object, default: null}
});

// 获取 Pinia store
const menuStore = useMenuStore();

// 判断文件类型的函数
const getFileType = (fileName) => {
  const imageFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const videoFormats = ['.mp4', '.webm', '.avi', '.mov'];

  if (imageFormats.some((format) => fileName.endsWith(format))) {
    return 'image';
  } else if (videoFormats.some((format) => fileName.endsWith(format))) {
    return 'video';
  }
  return 'unknown';
};

// 获取文件类型
const fileType = getFileType(props.fileInfo.name);

// 判断是否是头像类型
const isAvatar = props.fileInfo.targetUrl.includes('UserAvatar');
</script>

<template>
  <RightClickMenu v-if="!isAvatar" :file-info="fileInfo" @play-video="(videoFileInfo)=>{isVideoOpen = true}">
    <div class="cover-wrap">
      <!-- 视频显示 -->
      <PhVideoMiniPlayer
          v-if="fileType === 'video'"
          :video-url="resourceUrl + fileInfo.targetUrl"
          :video-title="fileInfo.name"
          v-model:open="isVideoOpen"
      >
        <template #trigger>
          <img class="cover" src="@assets/img/file/file_video.svg" alt=""/>
        </template>
      </PhVideoMiniPlayer>

      <!-- 图片显示 -->
      <PhImage
          class="cover image"
          v-else-if="fileType === 'image'"
          :src="resourceUrl + fileInfo.targetUrl"
          :display="'square'"
          :preview="true"
      />

      <!-- 默认图标 -->
      <img
          class="cover"
          v-else
          src="@assets/HarmonyOS_Icons/ic_normal_white_grid_unknown.svg"
          alt=""
      />
    </div>
    <div class="title">{{ fileInfo.name }}</div>
  </RightClickMenu>

  <!-- 头像显示 -->
  <div v-else class="item_file_user-avatar">
    <div class="type-tag-wrap" v-if="fileInfo.tag">
      <div class="type-tag">
        <a-tag color="#cd201f">{{ fileInfo.tag }}</a-tag>
      </div>
    </div>
    <div class="cover-wrap">
      <a-image class="cover user_avatar" :src="resourceUrl + fileInfo.targetUrl">
        <template #placeholder>
          <a-image class="cover user_avatar" :src="resourceUrl + fileInfo.targetUrl" :preview="false"/>
        </template>
      </a-image>
    </div>
    <p class="title">{{ fileInfo.name }}</p>
  </div>
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

.item_file_user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .cover-wrap {
    border-radius: 50%;
    overflow: hidden;
    height: 70px;
    width: 70px;
  }
}

.type-tag-wrap {
  z-index: 1;
  width: 100%;
  position: relative;

  .type-tag {
    position: absolute;
    right: 0;
  }
}
</style>
