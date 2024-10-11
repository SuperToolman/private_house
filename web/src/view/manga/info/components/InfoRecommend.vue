<script setup>

const recommendMangaList = ref([
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
  <PhCard :title="'相关推荐'">
    <a-space :size="8" :wrap="true">
      <MangaCard
          v-for="manga in recommendMangaList"
          :key="manga.id"
          :manga-entity="manga"
          :width="166"
          :height="220"
      />
    </a-space>
  </PhCard>
</template>

<style scoped>

</style>