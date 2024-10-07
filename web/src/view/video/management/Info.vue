<script setup>
import {useRoute} from "vue-router";
import {inject, onMounted, ref} from "vue";
import {PlayCircleOutlined} from "@ant-design/icons-vue";
import InfoDataSummary from "@view/video/management/components/Info-DataSummary.vue";

const route = useRoute()
const api = inject('api')
const videoId = ref(null)
const videoEntity = ref(null)
const activeKey = ref('1');

onMounted(()=>{
  videoId.value = route.params.videoId
  api.videoApi.GetById(videoId.value).then(res=>{
    videoEntity.value = res.data
    console.log('videoEntity',videoEntity.value)
  })
})

</script>

<template>
  <div v-if="videoEntity">
    <div class="modal_wrap">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="数据概要">
          <InfoDataSummary v-if="activeKey==='1'" :video-entity="videoEntity"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="账号诊断">账号诊断</a-tab-pane>
        <a-tab-pane key="3" tab="稿件分析">稿件分析</a-tab-pane>
        <a-tab-pane key="4" tab="粉丝分析">粉丝分析</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>

</style>