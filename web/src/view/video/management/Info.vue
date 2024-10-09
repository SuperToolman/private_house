<script setup>
import Info_AuthorData from "@view/video/management/components/Info_AuthorData.vue";
import {message} from "ant-design-vue";

const resourceUrl = inject('resourceUrl')
const route = useRoute()
const api = inject('api')
const videoId = ref(null)
const videoEntity = ref(null)
const videoReviewList = ref([])
const videoTagList = ref([])
const pushTagInputSwitch = ref(false)
const pushTagInput = ref('')
const initVideoData = ()=>{
  api.videoApi.GetById(videoId.value).then(res=>{
    videoEntity.value = res.data
    if (videoEntity.tagString !== "")
      videoTagList.value = videoEntity.value.tagString.split(',')
  })
}
const initHistoryAudit = ()=>{
  api.videoHistoryAuditStatusApi.GetByVideoId(videoId.value).then(res=>{
    if (res.isSuccess)
      videoReviewList.value = res.data;
  })
}
const getRandomColor = () => {return getRandomColorCode();}
const getConversionTime = (timeBySecond) => {return conversionTime(timeBySecond)}
const handleSubmitByPushTag = ()=>{
  const tagString = pushTagInput.value
      .replace(/^,+|,+$/g, '') // 去除开头和结尾的逗号
      .replace(/,+/g, ',')    // 替换连续的逗号为单个逗号
      .trim();                // 去除两端空白
  pushTagInput.value = ''
  pushTagInputSwitch.value = false
  api.videoApi.PushTagByString(tagString,videoEntity.value.id).then(res=>{
    if (res.isSuccess){
      const newTagList = tagString.split(',')
      videoTagList.value.push(...newTagList)
      message.success(res.message)
    }else message.error(res.message)
  })
}
const handleRemoveTag = (tag) =>{
  videoTagList.value = videoTagList.value.filter(x=>x !== tag)
  videoEntity.value.tagString = videoTagList.value.join(',')
  api.videoApi.Update(videoEntity.value).then(res=>{
    res.isSuccess?message.success(res.message):message.error(res.message)
  })
}

onMounted(()=>{
  videoId.value = route.params.videoId
  initVideoData()
  initHistoryAudit()
})

</script>

<template>
  <div class="content" v-if="videoEntity">
    <div class="left">
      <ph-card style="padding: 10px">
        <video v-if="videoEntity" controls="controls" id="videoPreview" :src="resourceUrl + videoEntity.videoUrl"/>
      </ph-card>
      <a-row>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="播放量" valueStyle="color:'#fff'" :value="videoEntity.playCount"/>
          </ph-card>
        </a-col>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="点赞数" :value="videoEntity.likeCount"/>
          </ph-card>
        </a-col>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="收藏数" :value="videoEntity.collectCount"/>
          </ph-card>
        </a-col>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="评论数" :value="videoEntity.collectCount"/>
          </ph-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="投币数" :value="videoEntity.coinCount" style="margin-right: 50px"/>
          </ph-card>
        </a-col>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="转发数" :value="videoEntity.shareCount"/>
          </ph-card>
        </a-col>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="弹幕数" :value="videoEntity.collectCount"/>
          </ph-card>
        </a-col>
        <a-col :span="6">
          <ph-card>
            <a-statistic title="热度量" :value="123"/>
          </ph-card>
        </a-col>
      </a-row>
      <ph-card :title="'近期7日播放量趋势'">
        <div id="chart_container"></div>
      </ph-card>
    </div>
    <div class="right">
      <ph-card>
        <a-descriptions title="视频信息" :bordered="true">
          <a-descriptions-item label="ID" :span="3">{{videoEntity.id}}</a-descriptions-item>
          <a-descriptions-item label="标题" :span="3">{{videoEntity.title}}</a-descriptions-item>
          <a-descriptions-item label="时长" :span="3">{{ getConversionTime(videoEntity.durationBySecond) }}</a-descriptions-item>
          <a-descriptions-item label="发布" :span="3">
            <span v-if="videoEntity.releaseTime">
              {{videoEntity.releaseTime.toString().replace('T',' — ')}}
            </span></a-descriptions-item>
          <a-descriptions-item label="简介" :span="3">{{videoEntity.desc}}</a-descriptions-item>
          <a-descriptions-item label="标签" :span="3">
            <a-tag
                v-for="tag in videoTagList"
                :key="tag"
                :color="getRandomColor()">{{tag}} <CloseOutlined @click="handleRemoveTag(tag)"/></a-tag>
            <a-tag v-if="!pushTagInputSwitch" @click="pushTagInputSwitch = true" style="cursor: pointer"><PlusOutlined /> 补充标签</a-tag>
            <div class="pushTagInput-box" v-else>
              <div class="tips">
                <a-alert message="多个标签请以英文逗号间隔，例如：标签1,标签2,标签3" type="info" show-icon closable></a-alert>
              </div>
              <div class="pushTagInput-wrap">
                <a-input class="pushTagInput" v-model:value="pushTagInput"/>
                <a-button type="primary" class="submit" style="margin: 0 5px" @click="handleSubmitByPushTag"><CheckOutlined /></a-button>
                <a-button class="cancel" @click="pushTagInputSwitch = false"><CloseOutlined/></a-button>
              </div>
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </ph-card>

      <ph-card :title="'作者信息'">
        <Info_AuthorData/>
      </ph-card>

      <ph-card :title="'视频历史状态'">
        <div>
          <span>当前审核状态：</span>
          <span v-if="videoEntity.auditStatus === 0"><QuestionOutlined />草稿</span>
          <span v-else-if="videoEntity.auditStatus === 1"><ExclamationOutlined />审核中</span>
          <span v-else-if="videoEntity.auditStatus === 2"><CheckOutlined />审核通过</span>
          <span v-else-if="videoEntity.auditStatus === 3"><CloseOutlined />驳回中</span>
        </div>

        <PhTimeline
            style="margin-top: 20px"
            v-if="videoReviewList && videoReviewList.length >0"
            :data="videoReviewList">
        </PhTimeline>

      </ph-card>
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
.pushTagInput-box{
  .tips{
    margin: 10px 0;
  }
  .pushTagInput-wrap{
    display: flex;
    .pushTagInput{
      .submit{
      }
    }
  }
}

</style>