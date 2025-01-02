<script setup>
import {message} from "ant-design-vue";

const api = inject('api')
const auditStatus = ref("-1")
const countOption = ref("0")
const mangaList = ref([])

const dataInit = ()=>{
  api.mangaApi.GetByCombinationQuery(auditStatus.value,countOption.value).then(res=>{
    if (res.isSuccess){
      console.log("获取漫画数据",res.data)
      mangaList.value = res.data;
    }else
      message.error(res.message)
  })
}
onMounted(()=>{
  dataInit()
})

</script>

<template>
  <PhViewLayout :title="'漫画管理'" :sub-title="'管理漫画，例如添加、删除、以及修改'">
    <template #view-tool>
      <div class="videos-controller">
        <a-select v-model:value="auditStatus" style="width: 150px;margin:0 8px">
          <a-select-option value="-1">全部状态</a-select-option>
          <a-select-option value="0">草稿</a-select-option>
          <a-select-option value="1">审核中</a-select-option>
          <a-select-option value="2">审核通过</a-select-option>
          <a-select-option value="3">审核驳回</a-select-option>
        </a-select>
        <a-select v-model:value="countOption" style="width: 150px">
          <a-select-option value="0">按投稿时间</a-select-option>
          <a-select-option value="1">按评分</a-select-option>
          <a-select-option value="2">按阅读量</a-select-option>
          <a-select-option value="3">按收藏量</a-select-option>
          <a-select-option value="4">按弹幕量</a-select-option>
          <a-select-option value="5">按评论量</a-select-option>
          <a-select-option value="6">按添加时间</a-select-option>

        </a-select>
      </div>
    </template>
    <PhCard>
      <a-space :size="8" :wrap="true">
        <MangaCard v-for="manga in mangaList" :key="manga.id" :manga-entity="manga"/>
      </a-space>
    </PhCard>
  </PhViewLayout>
</template>

<style scoped>

</style>