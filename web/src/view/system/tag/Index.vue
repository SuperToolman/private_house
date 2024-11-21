<script setup>
import PhTag from "../../../components/ph_inputs/PhTag.vue";

const api = inject('api')
const tagList = ref(null)

onMounted(()=>{
  api.systemTagApi.Get().then(res=>{
    tagList.value = res.data
  })
})
</script>

<template>
  <ph-view-layout :title="'标签'" :sub-title="'管理系统各领域相关标签，漫画、动漫、视频'">
    <ph-card>
      <div class="tags-container-wrap">
        <div class="tags-container">
          <PhTag :tag-entity="tag" v-for="tag in tagList" :key="tag.id"/>
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
  }
}
</style>