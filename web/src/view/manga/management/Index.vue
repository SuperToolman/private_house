<script setup>

import MangaCard from "@view/manga/management/components/MangaCard.vue";

const mangaList = ref([
  {id:'1',title:'斗破苍穹',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'3',title:'小魔头暴露啦！',tagString:'测试1,测试2,测试3,测试4,测试5,测试6,测试7'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
  {id:'2',title:'关于我转身成为史莱姆这档事',tagString:'测试1,测试2,测试3'},
])
</script>

<template>
  <PhViewLayout :title="'漫画管理'" :sub-title="'管理漫画，例如添加、删除、以及修改'">
    <PhCard>
      CES1
    </PhCard>
    <PhCard>
      <a-space :size="8" :wrap="true">
        <MangaCard v-for="manga in mangaList" :key="manga.id" :manga-entity="manga"/>
      </a-space>
    </PhCard>
  </PhViewLayout>
</template>

<style scoped>

</style>