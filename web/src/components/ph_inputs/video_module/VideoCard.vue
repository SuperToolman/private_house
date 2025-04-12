<script setup>
// 依赖注入
const api = inject('api')
const resourceUrl = inject('resourceUrl')
const resourceByUserAvatarUrl = inject('resourceByUserAvatarUrl')

// 组件属性定义
const props = defineProps({
  videoEntity: {
    type: Object,
    required: true
  },
})

// 事件发射器
const emits = defineEmits(['handleDeleteVideoDone'])

// 视频预览相关的响应式变量
const videoRef = ref(null)
const isHovering = ref(false)
const hoverTimeout = ref(null)
const hasLoaded = ref(false)

/**
 * 删除视频
 * @param {string|number} keyValue - 视频ID
 */
const Delete = (keyValue) => {
  const deleteAction = props.videoEntity.videoType === 0
    ? api.videoApi.DeleteById(keyValue)
    : api.videoApi.DeleteByDifferenceId(keyValue)

  deleteAction.then(res => {
    if (res.isSuccess) {
      emits('handleDeleteVideoDone', keyValue)
    }
  })
}

/**
 * 格式化日期时间
 * @param {string} dateTime - 原始日期时间字符串
 * @returns {string} 格式化后的日期时间
 */
const formatDateTime = (dateTime) => {
  return dateTime.replace('T', ' ')
}

/**
 * 处理鼠标进入视频封面区域
 * 延迟300ms后开始播放视频预览
 */
const handleMouseEnter = () => {
  hoverTimeout.value = setTimeout(async () => {
    isHovering.value = true
    try {
      if (!hasLoaded.value) {
        videoRef.value.load()
        hasLoaded.value = true
      }
      await videoRef.value.play()
    } catch (e) {
      console.error('视频播放失败:', e)
    }
  }, 300)
}

/**
 * 处理鼠标离开视频封面区域
 * 停止视频播放并重置进度
 */
const handleMouseLeave = () => {
  clearTimeout(hoverTimeout.value)
  isHovering.value = false
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
}

// 组件销毁前清理定时器
onBeforeUnmount(() => {
  clearTimeout(hoverTimeout.value)
})
</script>

<template>
  <div class="video-container">
    <!-- 操作菜单 -->
    <div class="action-wrap">
      <div class="action">
        <a-dropdown>
          <MenuOutlined />
          <template #overlay>
            <a-menu>
              <!-- 播放按钮 -->
              <a-menu-item>
                <div class="menu-item-wrap">
                  <router-link :to="'/video/' + (videoEntity.videoType === 0 ? 'Std' : 'Diff') + videoEntity.id">
                    <PlayCircleOutlined style="margin-right: 5px;color:#4a9cfa" type="primary"/>
                    <span>播放</span>
                  </router-link>
                </div>
              </a-menu-item>
              <!-- 编辑按钮 -->
              <a-menu-item>
                <div class="menu-item-wrap">
                  <EditOutlined style="margin-right: 5px;color:#797878" type="primary"/>
                  <span>编辑</span>
                </div>
              </a-menu-item>
              <!-- 删除按钮 -->
              <a-menu-item>
                <div class="menu-item-wrap">
                  <a-popconfirm 
                    ok-text="删除" 
                    cancel-text="算了" 
                    title="删除无法还原！确定删除？" 
                    @confirm="Delete(videoEntity.id)"
                  >
                    <DeleteOutlined style="color: #d81e06;margin-right: 5px" />
                    <span>删除</span>
                  </a-popconfirm>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <!-- 视频封面区域 -->
    <div 
      class="video-cover-wrap"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 视频预览层 -->
      <video
        ref="videoRef"
        class="preview-video"
        muted
        playsinline
        preload="none"
        :poster="resourceUrl + videoEntity.coverUrl"
        :style="{ opacity: isHovering ? 1 : 0, borderRadius: '7px' }"
      >
        <source :src="resourceUrl + videoEntity.videoUrl" type="video/webm">
      </video>

      <!-- 静态封面图 -->
      <PhImage
        class="cover-image"
        :src="resourceUrl + videoEntity.coverUrl"
        :style="{ opacity: isHovering ? 0 : 1 }"
      />
    </div>

    <!-- 视频信息区域 -->
    <div class="video-info">
      <!-- 标题 -->
      <div class="title">
        <router-link :to="'/video/' + (videoEntity.videoType === 0 ? 'Std' : 'Diff') + videoEntity.id">
          <span class="title-content">
            {{ videoEntity.title || '（暂无标题）' }}
          </span>
        </router-link>
      </div>

      <!-- 用户信息 -->
      <div class="info">
        <div class="user-cover-wrap">
          <PhImage
            v-if="videoEntity.userItem?.haveAvatar"
            :src="resourceByUserAvatarUrl + videoEntity.userItem.uuid + '.webp'"
          />
          <a-avatar v-else>未选择用户</a-avatar>
        </div>
        <div class="user-info-wrap">
          <div class="name">
            <router-link v-if="videoEntity.userItem" :to="'/user/info/' + videoEntity.userItem?.id">
              {{ videoEntity.userItem?.name }}
            </router-link>
            <span v-else>未选择用户</span>
          </div>
          <div class="release-time">
            {{ formatDateTime(videoEntity.releaseTime || videoEntity.addTime) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 修改视频封面容器样式 */
.video-cover-wrap {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 的宽高比 (9/16 = 0.5625 = 56.25%) */
  height: 0; /* 移除固定高度 */
}

/* 调整视频预览和封面图的定位 */
.preview-video,
.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  border-radius: 7px;
}

/* 视频预览层样式 */
.preview-video {
  z-index: 2;
  background: #000;
}

/* 封面图层样式 */
.cover-image {
  z-index: 1;
  transition: opacity 0.3s ease 0.1s; /* 延迟隐藏 */
}

/* 操作菜单层级 */
.action-wrap {
  z-index: 3;
}

/* 视频卡片容器样式 */
.video-container {
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
}

/* 操作按钮样式 */
.action-wrap {
  position: absolute;
  margin: 5px 0 0 5px;
}

.action {
  position: relative;
  z-index: 999;
  padding: 2px 2px;
  border-radius: 30%;
  color: #ffffff;
}

/* 视频信息区域样式 */
.video-info {
  padding: 0 7px 10px 7px;
}

/* 标题样式 */
.title {
  color: var(--text1);
  font-size: 14px;
  line-height: 22px;
  height: calc(2 * 22px);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 2;
  border: 0;
  font-family: inherit;
  font-weight: 400;
  font-style: normal;
}

.title-content {
  transition: 0.3s;
  &:hover {
    color: var(--text_link);
  }
}

/* 用户信息样式 */
.info {
  display: flex;
  align-items: center;
  margin-top: 0.3em;
}

.user-cover-wrap {
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 5px;
}

.user-info-wrap {
  font-size: 13px;
  color: #9a99a0;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  font-weight: 600;
}

.release-time {
  font-size: 12px;
}

/* 菜单项样式 */
.menu-item-wrap {
  display: flex;
  align-items: center;
}
</style>