<script setup>
  const props = defineProps({
    entity:{type:Object,default:null}
  })
</script>

<template>
 <PhCard>
   <div class="task-progress">
     <img class="task-progress-icon" src="@assets/HarmonyOS_Icons/ic_normal_white_grid_video.svg" alt="">
     <div class="task-progress-content">
       <div class="task-progress-info">
         <div class="task-progress-title">{{ entity.fileName }}</div>
         <div class="task-progress-speed">
           <div v-if="entity.status === 'have'">
             <span>已经上传：{{ entity.loaded }}MB/{{entity.total }}MB</span>
             <span style="margin-left: 10px">当前速度：{{ entity.uploadSpeed }}MB/s</span>
             <span v-if="entity.estimatedTime > 60">剩余时间：{{(entity.estimatedTime / 60).toFixed(1) }}分钟</span>
             <span v-else>剩余时间：{{ entity.estimatedTime }}秒</span>
           </div>
           <div v-else-if="entity.status === 'done'">上传完成</div>
           <div v-else-if="entity.status === 'error'">上传失败</div>
         </div>
       </div>
       <div class="content-progress-wrap">
         <a-progress
             :stroke-color="{'0%': '#108ee9','100%': '#87d068',}"
             :percent="entity.progress"
         />
       </div>
     </div>
   </div>
 </PhCard>
</template>

<style scoped>
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
</style>