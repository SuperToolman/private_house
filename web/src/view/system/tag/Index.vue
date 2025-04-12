<script setup>
import PhTagByTagEntity from "@components/ph_inputs/system_module/PhTagByTagEntity.vue";
import TagDetailDialog from "./components/TagDetailDialog.vue";

const api = inject('api')
const tagList = ref(null)
const selectedTag = ref(null)
const isDialogOpen = ref(false)

onMounted(()=>{
  api.systemTagApi.Get().then(res=>{
    tagList.value = res.data
    console.log('获取标签数据',tagList.value)
  })
})

const openDialog = (tag) => {
  selectedTag.value = tag
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}
</script>

<template>
  <ph-view-layout :title="'标签'" :sub-title="'管理系统各领域相关标签，漫画、动漫、视频'">
    <ph-card>
      <div class="tags-container-wrap">
        <div class="tags-container">
          <PhTagByTagEntity :tag-entity="tag" v-for="tag in tagList" :key="tag.id" @openTagDetail="openDialog(tag)" @handleTagEdit="handleEdit(tag)" @handleTagDelete="handleDelete(tag)"/>
        </div>
      </div>
    </ph-card>
    <TagDetailDialog :tag-entity="selectedTag" :open="isDialogOpen" @close="closeDialog"/>
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