<template>
  <ph-view-layout :title="'视频管理'" :sub-title="'管理和查看以上架的全部视频信息'">
    <template #view-tool>
      <div class="videos-controller">
        <ph-select-video-area-by-parent-input @handle-update-video-area="areaId => videoAreaId = areaId"/>
        <a-select v-model:value="auditStatus" style="width: 150px;margin:0 8px">
          <a-select-option value="-1">全部状态</a-select-option>
          <a-select-option value="0">草稿</a-select-option>
          <a-select-option value="1">审核中</a-select-option>
          <a-select-option value="2">审核通过</a-select-option>
          <a-select-option value="3">审核驳回</a-select-option>
        </a-select>
        <a-select v-model:value="countOption" style="width: 150px">
          <a-select-option value="0">按投稿时间</a-select-option>
          <a-select-option value="1">按播放量</a-select-option>
          <a-select-option value="2">按收藏量</a-select-option>
          <a-select-option value="3">按弹幕量</a-select-option>
          <a-select-option value="4">按评论量</a-select-option>
        </a-select>
      </div>
    </template>
    <ph-card style="padding: 15px">
      <div class="videos-container">
        <div class="video-wrap" v-for="videoEntity in videoList" :key="videoEntity">
          <VideoCard :video-entity="videoEntity" />
        </div>
      </div>
    </ph-card>
  </ph-view-layout>
</template>

<script setup>
import {inject, onMounted, reactive, ref, watch} from "vue";
import {DeleteOutlined, EditOutlined, PlayCircleOutlined, MoreOutlined} from '@ant-design/icons-vue';
import VideoCard from "@view/video/management/components/VideoCard.vue";
import PhViewLayout from "@components/ph_inputs/PhViewLayout.vue";
import PhCard from "@components/ph_inputs/PhCard.vue";
import PhSelectVideoAreaByParentInput from "@components/ph_inputs/PhSelectVideoAreaByParentInput.vue";
const api = inject('api');
const videoList = ref([])//定义表格的数据
const videoAreaId = ref('')
const auditStatus = ref("-1")
const countOption = ref("0")
const dataInit = () => {
  api.videoApi.GetByCombinationQuery(videoAreaId.value,auditStatus.value,countOption.value).then(res => {
    if (res.isSuccess)
      videoList.value = res.data
    console.log(videoList.value)
  })
}

// 监听多个值
watch([videoAreaId, auditStatus, countOption], () => {
  dataInit(); // 任意一个值变化时调用
});

onMounted(() => {
  dataInit();
})
</script>

<style scoped>
.videos-container{
  //padding: 20px;
  grid-column: span 6;
  grid-template-columns: repeat(6, 1fr);
  display: grid;
  position: relative;
  width: 100%;
  grid-gap: 20px;
}


.form-tools{
  display: flex;
}
.form-tools button{
  margin-right: 7px;
}
.form-tools .a-button{
  margin-right: 5px;
}
</style>