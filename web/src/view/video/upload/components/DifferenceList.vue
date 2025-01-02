<script setup>
import {message} from "ant-design-vue";

const props = defineProps({
  videoList:{type:Array,default:[]}
})
const emits = defineEmits(['handleIndexUp','handleIndexDown'])
const contrastModelOpen = ref(false)
const coverEntity = ref({
  dataURL:null,
  blob:null,
})

const videoRefs = ref([]);        // 存储视频元素引用数组
const progress = ref(0);          // 控制全局进度条

// 同步进度条
const syncProgress = () => {
  if (videoRefs.value.length > 0) {
    const mainVideo = videoRefs.value[0]; // 主视频参考
    progress.value = (mainVideo.currentTime / mainVideo.duration) * 100;
  }
};

// 同步播放
const syncPlay = () => {
  videoRefs.value.forEach(video => {
    if (video.paused) {
      video.play();
    }
  });
};
// 同步暂停
const syncPause = () => {
  videoRefs.value.forEach(video => {
    if (!video.paused) {
      video.pause();
    }
  });
};
// 在进度条拖动时同步所有视频的播放进度
const onSliderChange = (value) => {
  if (videoRefs.value.length > 0) {
    const time = (value / 100) * videoRefs.value[0].duration;
    videoRefs.value.forEach(video => {
      video.currentTime = time;
    });
  }
};
// 打开 modal 时播放视频
const onModalOpenChange = (open) => {
  if (open) {
    // 播放所有视频
    videoRefs.value.forEach(video => {
      video.play();
    });
  }
};

const handleDeleteListItem=()=>{
  message.success('删除成功')
}
watch(props,()=>{
  console.log('DifferenceList的发生watch？')
  coverEntity.value = props.cover;
})
</script>

<template>
  <PhCard title="视频列表">
    <a-space style="margin-bottom: 10px" >
      <a-button type="primary" @click="contrastModelOpen = true">补充差分视频</a-button>
      <a-button type="primary" @click="contrastModelOpen = true">对比视频</a-button>
    </a-space>
    <ul>
      <li v-for="(videoEntity,index) in videoList" :key="videoEntity.id">
        <div class="difference-item">
          <div class="cover-wrap">
            <div v-if="videoEntity.cover" class="cover-upload" :style="{
                  'background-image': `url(${videoEntity.cover.dataURL})`,
                  'background-size': 'cover',  // 将图片完整显示在容器中
                  'background-position': 'center',  // 居中显示图片
                  'background-repeat': 'no-repeat'  // 防止图片重复
        }">
            </div>
          </div>
          <div class="form-wrap">
            <a-space direction="vertical">
              <a-input style="width: 200px" v-model:value="videoEntity.title" placeholder="差分名称" />
              <div class="task-progress">
                <img class="task-progress-icon" src="@assets/HarmonyOS_Icons/ic_normal_white_grid_video.svg" alt="">

                <div class="task-progress-content">
                  <div class="task-progress-info">
                    <div class="task-progress-title">{{ videoEntity.fileName }}</div>
                    <div class="task-progress-speed">
                      <div v-if="videoEntity.status === 'have'">
                      <span>已经上传：{{ videoEntity.loaded }}MB/{{videoEntity.total }}MB</span>
                        <span style="margin-left: 10px">当前速度：{{ videoEntity.uploadSpeed }}MB/s</span>
                        <span
                            v-if="videoEntity.estimatedTime > 60">剩余时间：{{
                            (videoEntity.estimatedTime / 60).toFixed(1)
                          }}分钟</span>
                        <span v-else>剩余时间：{{ videoEntity.estimatedTime }}秒</span>
                      </div>
                      <div v-else-if="videoEntity.status === 'done'">上传完成</div>
                      <div v-else-if="videoEntity.status === 'error'">上传失败</div>
                    </div>
                  </div>
                  <div class="content-progress-wrap">
                    <a-progress
                        :stroke-color="{'0%': '#108ee9','100%': '#87d068',}"
                        :percent="videoEntity.progress"
                    />
                  </div>
                </div>
              </div>
            </a-space>
            <div>
              <a-button @click="emits('handleIndexUp',index)">上升</a-button>
              <a-button @click="emits('handleIndexDown',index)">下降</a-button>
              <a-popconfirm
                title="确定要删除该视频吗？"
                ok-text="删除"
                cancel-text="取消"
                @confirm="handleDeleteListItem"
            >
              <a-button type="primary" danger>
                <DeleteOutlined/>
              </a-button>
            </a-popconfirm>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </PhCard>

  <a-modal
      v-model:open="contrastModelOpen"
      @ok="contrastModelOpen = false"
      @openChange="onModalOpenChange"
      width="90%"
  >
    <div v-if="videoList.length > 1" style="display: flex; flex-direction: column; height: 100%;">
      <div style="flex: 1; display: flex; flex-direction: row; justify-content: center;">
        <div v-for="(video, index) in videoList" :key="index" style="flex: 1; padding: 5px;">
          <video ref="videoRefs" :src="video.tempUrl" controls style="width: 100%; height: auto;"
                 @timeupdate="syncProgress" @play="syncPlay" @pause="syncPause">
          </video>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <a-slider v-model:value="progress" @change="onSliderChange" />
      </div>
    </div>
  </a-modal>
</template>

<style scoped>
.difference-item{
  display: flex;
  height: 107px;
  margin-bottom: 10px;
  .cover-wrap{
    height: 100%;
    width: 189px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #888888;

    .cover-upload{
      height: 100%;
      width: 100%;
    }
  }
  .form-wrap{
    flex: 1;
    margin-left: 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
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
    .content-progress-wrap{
      width: 500px;
    }
  }
}

.task-status {
  font-size: 10px;
}
</style>