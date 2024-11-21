<script setup>
import PhCard from "@components/ph_inputs/PhCard.vue";
import {inject, onMounted, ref} from "vue";
import {message} from "ant-design-vue";

const emits = defineEmits(['handleDeleteManuscriptVideo'])
const props = defineProps({
  manuscriptVideos:{type:Array,default:[]}
})
const api = inject('api')
const videoModelDisplay = ref(false)
const activeVideoIndex = ref(0)
const resourceUrl = inject('resourceUrl')
const handlePlay = (index)=>{
  activeVideoIndex.value = index;
  videoModelDisplay.value = true;
}
const handleAdopt = (video)=>{
  api.videoApi.AdoptForReview(video.id).then(res=>{
    if (res.isSuccess){
      message.success(res.message)
    }
  })
}

const handleDeleteTask = (video)=>{
  api.videoApi.DeleteById(video.id).then(res=>{
    if (res.isSuccess){
      emits('handleDeleteManuscriptVideo',video)
      message.success(res.message)
    }
    else message.error(res.message)
  })
}


</script>

<template>
  <ph-card>
    <div>审核列表：{{manuscriptVideos.length}}</div>
    <div class="videoList">
      <div class="video-item" v-for="(video,index) in manuscriptVideos" :key="video.id">
        <div class="left">
          <div class="item-cover">
            <a-image v-if="video.coverUrl!==undefined" :src="resourceUrl+video.coverUrl"/>
            <a-image v-else :src="resourceUrl+`Temp/${video.id}/cover.webp`"/>
          </div>
          <div class="item-infos">
            <div class="video-title" @click="handlePlay(index)">{{video.title}}</div>
            <div class="up-name">
              <a-avatar>测试up主</a-avatar>
              测试up主
            </div>
            <div class="video-count-data">
              <div class="count-data-item">120</div>
              <div class="count-data-item">120</div>
              <div class="count-data-item">120</div>
              <div class="count-data-item">120</div>
              <div class="count-data-item">120</div>
              <div class="count-data-item">120</div>
              <div class="count-data-item">120</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item-action">
            <a-button type="primary" @click="handleAdopt(video)">通过</a-button>
            <a-button style="margin:0 10px" danger @click="handleDeleteTask(video)">删除</a-button>
            <a-button>驳回</a-button>
          </div>

        </div>
      </div>
    </div>
  </ph-card>


<!--  :ok-button-props="{hidden:true}" :cancel-button-props="{hidden:true}"-->
  <a-modal width="1118px"
           v-if="manuscriptVideos && manuscriptVideos.length>0"
           v-model:open="videoModelDisplay"
           :title="manuscriptVideos[activeVideoIndex].title" >
    <div class="play-container">
      <video v-if="manuscriptVideos[activeVideoIndex].videoUrl !== undefined" :src="resourceUrl + manuscriptVideos[activeVideoIndex].videoUrl" controls/>
      <video v-else :src="resourceUrl + `Temp/${manuscriptVideos[activeVideoIndex].id}/video.mp4`" controls/>
    </div>
  </a-modal>
</template>

<style scoped>
.video-item{
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
  .left{
    display: flex;
    .item-cover{
      align-self: center;
      width: 154px;
      height: 87px;
      margin-right: 24px;
      border-radius: 5px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .item-infos{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .video-title{
        font-size: 16px;
        color: #212121;
        line-height: 20px;
        vertical-align: middle;
        transition: 0.3s;
        &:hover{
          color: #00a1d6;
          transition: 0.3s;
          cursor: pointer;
        }
      }
      .video-count-data{
        display: flex;
        .count-data-item{
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          margin-right: 25px;
          color: #99a2aa;
          font-size: 12px;
        }
      }
      .up-name{

      }
    }
  }
}

.play-container{
  height: 602px;
  width: 1070px;
  background-color: black;
  video{
    width: 100%;
    height: 100%;
  }
}
</style>