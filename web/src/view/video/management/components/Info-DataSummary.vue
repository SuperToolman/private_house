<script setup>
import PiliCard from "@components/ph_inputs/PhCard.vue";
import {inject, onMounted, ref} from "vue";
import {Chart} from "@antv/g2";
import PhTimeline from "@components/ph_inputs/PhTimeline.vue";

const resourceUrl = inject('resourceUrl')
const props = defineProps({
  videoEntity:{type:Object}
})
const api = inject('api')
const videoReviewList = ref([])
const initChart = () => {
  const data = [
    {day: '5月19日', value: 3.5},
    {day: '5月20日', value: 5},
    {day: '5月21日', value: 4.9},
    {day: '5月22日', value: 6},
    {day: '5月23日', value: 7},
    {day: '5月24日', value: 9},
    {day: '5月25日', value: 13},
  ];


  // 初始化图表实例
  const chart = new Chart({
    // width: 400, // 图表高度
    height: 350, // 图表宽度
    autoFit: true,
    container: 'chart_container'
  });
  // 声明可视化
  chart
      .data(data)
      .encode('x', 'day')
      .encode('y', 'value')
      .scale('x', {
        range: [0, 1],
      })
      .scale('y', {
        domainMin: 0,
        nice: true,
      });

  chart.line().label({
    text: 'value',
    style: {
      dx: -10,
      dy: -12,
    },
  });

  chart.point().style('fill', 'white').tooltip(false);

  chart.render();
}
const conversionTime = (timeBySecond) => {
  const hours = Math.floor(timeBySecond / 3600); // 获取小时
  const minutes = Math.floor((timeBySecond % 3600) / 60); // 获取分钟
  const seconds = timeBySecond % 60; // 获取秒

  let result = "";

  if (hours > 0) {
    result += hours + "小时";
  }
  if (minutes > 0 || hours > 0) { // 如果有小时，就总是显示分钟
    result += minutes + "分钟";
  }
  result += seconds + "秒";

  return result;
}
onMounted(()=>{
  initChart()
})
</script>

<template>
<!--  v-if="activeKey==='1'"-->
  <div class="content">
    <div class="left">
      <pili-card>
        <video v-if="videoEntity" controls="controls" id="videoPreview" :src="resourceUrl + videoEntity.videoUrl"/>
      </pili-card>
      <a-row>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="播放量" valueStyle="color:'#fff'" :value="videoEntity.playCount"/>
          </pili-card>
        </a-col>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="点赞数" :value="videoEntity.likeCount"/>
          </pili-card>
        </a-col>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="收藏数" :value="videoEntity.collectCount"/>
          </pili-card>
        </a-col>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="评论数" :value="videoEntity.collectCount"/>
          </pili-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="投币数" :value="videoEntity.coinCount" style="margin-right: 50px"/>
          </pili-card>
        </a-col>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="转发数" :value="videoEntity.shareCount"/>
          </pili-card>
        </a-col>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="弹幕数" :value="videoEntity.collectCount"/>
          </pili-card>
        </a-col>
        <a-col :span="6">
          <pili-card>
            <a-statistic title="热度量" :value="123"/>
          </pili-card>
        </a-col>
      </a-row>
      <pili-card :title="'近期7日播放量趋势'">
        <div id="chart_container"></div>
      </pili-card>
    </div>
    <div class="right">
      <pili-card>
        <a-descriptions title="视频信息" :bordered="true">
          <a-descriptions-item label="编号" :span="3">{{videoEntity.id}}</a-descriptions-item>
          <a-descriptions-item label="标题" :span="3">{{videoEntity.title}}</a-descriptions-item>
          <a-descriptions-item label="时长" :span="3">{{conversionTime(videoEntity.durationBySecond)}}</a-descriptions-item>
          <a-descriptions-item label="发布" :span="3">
            <span v-if="videoEntity.releaseTime">
              {{videoEntity.releaseTime.toString().replace('T',' — ')}}
            </span></a-descriptions-item>
          <a-descriptions-item label="简介" :span="3">{{videoEntity.desc}}</a-descriptions-item>
        </a-descriptions>
      </pili-card>
      <pili-card :title="'视频历史状态'">
        <div>
          <span>当前审核状态：</span>
          <span v-if="videoEntity.auditStatus === 0">草稿</span>
          <span v-else-if="videoEntity.auditStatus === 1">审核中</span>
          <span v-else-if="videoEntity.auditStatus === 2">审核通过</span>
          <span v-else-if="videoEntity.auditStatus === 3">驳回中</span>
        </div>

        <ph-timeline v-if="videoReviewList && videoReviewList.length >0" :data="videoReviewList"></ph-timeline>

      </pili-card>
    </div>
  </div>
</template>

<style scoped>
#videoPreview {
  width: 100%; /* 或者根据需要设置宽度 */
  aspect-ratio: 1155 / 650; /* 等比宽高比 */
  background-color: #000000; /* 用于可视化 */
}

.content{
  width: 100%;
  display: flex;


  .left{
    width: 50%;
  }
  .right{
    width: 50%;
  }
}



#chart_container {
  width: 100%;
  //height: 100%;
  overflow: hidden;
}
</style>