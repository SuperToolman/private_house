<script setup>
import {inject, onMounted, ref} from "vue";
import PhViewLayout from "@components/ph_inputs/PhViewLayout.vue";
import PhCard from "@components/ph_inputs/PhCard.vue";

const api = inject('api')
const tagList = ref(null)

onMounted(()=>{
  api.videoTagApi.Get().then(res=>{
    tagList.value = res.data
  })
})
</script>

<template>
  <ph-view-layout :title="'视频标签'" :sub-title="'管理视频常用标签'">
    <ph-card>
      <div class="tags-container-wrap">
        <div class="tags-container">
          <div class="tags-item" v-for="tag in tagList" :key="tag">
            <!--        <img src="https://xxx">-->
            <div class="item__background">{{tag.name}}</div>
            <span class="item__name">{{tag.name}}</span>
          </div>
        </div>
      </div>
    </ph-card>
  </ph-view-layout>
</template>

<style scoped>
.tags-container-wrap{
  .tags-container{
    display: grid;
    //padding: 20px;
    grid-gap: 20px;
    grid-column: span 7;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    .tags-item{
      height: 80px;
      border-radius: 15px;
      background-color: #0088cc;
      padding: 15px;
      position: relative;
      box-shadow: 0 0 5px 1px #10000063;

      .item__name{
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        position: absolute;
        bottom: 15px;
      }
      .item__background{
        font-size: 50px;
        position: absolute;
        font-weight: bold;
        bottom: 5px;
        right: 5px;
        color: rgba(0, 0, 0, 0.13);
      }
    }
  }
}
</style>