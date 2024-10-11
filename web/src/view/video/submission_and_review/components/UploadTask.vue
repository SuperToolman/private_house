<script setup>

import PhCard from "@components/ph_inputs/PhCard.vue";

const props = defineProps({
  videos:{type:Array,default:[]},
  activeVideoIndex:{type:Number,default:-1}
})
const emits = defineEmits(['handleUploadClick','handleActivateIndexChange'])
const calculativeWidth = () => props.videos.length > 5 ? `calc(${100 / props.videos.length}% - ${108 / props.videos.length}px)` : '218px';

const handleUpload = () => {
  console.log('handleUpload')
  emits('handleUploadClick')
}

const handleActivateIndexChange = (index)=>{
  emits('handleActivateIndexChange',index)
}
</script>

<template>
  <ph-card :title="'发布列表'">
    <div class="task-content-container-wrap">
      <div class="task-content-container">
        <div :class="{'task-content-item-wrap': true, 'activate': index === activeVideoIndex}"
             v-for="(video, index) in videos"
             :key="index"
             :style="{ 'width': calculativeWidth() }"
             @click="handleActivateIndexChange(index)">
          <a-tooltip placement="topLeft">
            <template #title>
              <span>{{ video.fileName }}</span>
            </template>
            <div class="task-content-item">
              <div class="task-title">
                <span class="task-title-text">{{ video.fileName }}</span>
                <span v-if="video.status === 'have'" class="task-status have">正在上传</span>
                <span v-else-if="video.status === 'done'" :class="{
                          'task-status':true,
                          'done':true,
                          'done_activate':activeVideoIndex===index
                        }">上传完成</span>
                <span v-else class="task-status error">上传失败</span>
              </div>
            </div>
          </a-tooltip>
        </div>
        <div class="task-content-btn-wrap">
          <div @click="handleUpload" class="task-content-btn">
            <img class="update_icon" src="@assets/HarmonyOS_Icons/ic_public_add.svg" style="width: 20px;">
            <span>添加视频</span>
          </div>
        </div>
      </div>
    </div>
    <div class="task-progress">
      <img class="task-progress-icon" src="/src/assets/HarmonyOS_Icons/ic_normal_white_grid_video.svg">
      <div class="task-progress-content">
        <div class="task-progress-info">
          <div class="task-progress-title">{{ videos[activeVideoIndex].fileName }}</div>
          <div class="task-progress-speed">
            <div v-if="videos[activeVideoIndex].status === 'have'">
                      <span>已经上传：{{ videos[activeVideoIndex].loaded }}MB/{{
                          videos[activeVideoIndex].total
                        }}MB</span>
              <span style="margin-left: 10px">当前速度：{{ videos[activeVideoIndex].uploadSpeed }}MB/s</span>
              <span
                  v-if="videos[activeVideoIndex].estimatedTime > 60">剩余时间：{{
                  (videos[activeVideoIndex].estimatedTime / 60).toFixed(1)
                }}分钟</span>
              <span v-else>剩余时间：{{ videos[activeVideoIndex].estimatedTime }}秒</span>
            </div>
            <div v-else-if="videos[activeVideoIndex].status === 'done'">上传完成</div>
            <div v-else-if="videos[activeVideoIndex].status === 'error'">上传失败</div>
          </div>
        </div>
        <div class="content-progress-wrap">
          <a-progress
              :stroke-color="{'0%': '#108ee9','100%': '#87d068',}"
              :percent="videos[activeVideoIndex].progress"
          />
        </div>
      </div>
    </div>
  </ph-card>
</template>

<style lang="scss" scoped>
.task-content-container-wrap {
  display: flex;

  .task-content-container {
    width: 100%;
    display: flex;
    //justify-content: space-between;

    .task-content-item-wrap {
      .task-content-item {
        flex: 1;
        height: 60px;
        max-width: 100%;
        transition: all .2s ease-in-out;
        padding: 10px 6px 10px 12px;
        font-size: 12px;
        cursor: pointer;
        position: relative;
        border-radius: 8px;
        z-index: 1;
        background: #ececec;
        color: #18191c;
        margin: 0 10px 10px 0;
        display: flex;
        align-items: center;

        .task-title {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          line-height: 16px;
          display: flex;
          flex-direction: column;
          align-items: start;

          .task-title-text {
            width: calc(100% - 16px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            z-index: 10;
          }
        }

      }
    }

    .activate {
      .task-content-item {
        transition: 0.3s;
        background-color: #00AEEC;
        color: #fff;
      }

    }

    .task-content-btn-wrap {
      .task-content-btn {
        cursor: pointer;
        width: 98px;
        height: 60px;
        font-size: 12px;
        border-radius: 8px;
        background: #ececec;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //color: #61666d;
        //margin-bottom: 10px;
      }
    }
  }
}

.task-progress {
  display: flex;
  align-items: center;

  .task-progress-icon {
    margin: 0 12px 0 0;
    width: 30px;
    height: 38px;
  }

  .task-progress-content {
    display: flex;
    flex-direction: column;
    flex-grow: 0.7;

    .task-progress-info {
      .task-progress-title {
        max-width: 650px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        padding: 6px 0 6px 6px;
        color: #222;
        display: flex;
      }

      .task-progress-speed {
        font-size: 10px;
        line-height: 14px;
        color: #999;
      }
    }

  }
}

.task-status {
  font-size: 10px;
}

.done {
  color: #43C15B;
}.done_activate{
   color: #ffffff;
 }
</style>