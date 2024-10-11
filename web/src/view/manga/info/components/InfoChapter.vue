<script setup>
const props = defineProps({
  mangaId:{type:String,default:''}
})

const testTitle = ref('当成宝宝在怀里宠吗？')
const activeChapterHeaderIndex = ref(0)
const chapterHeaderLength = ref(240);
const chapterHeaderGroupLength = ref(0)
const handleChoseChatpterHeader = (index)=>{
  activeChapterHeaderIndex.value = index
}
onMounted(()=>{
  chapterHeaderGroupLength.value = Math.ceil(chapterHeaderLength.value / 50)
})

</script>

<template>
  <PhCard :title="'章节'" style="flex: 1">
    <div class="list-header">
      <a-button
          :type="activeChapterHeaderIndex===i-1?'primary':''"
          class="chapter-header-item"
          v-for="i in chapterHeaderGroupLength"
      @click="handleChoseChatpterHeader(i-1)">
        <span v-if="i !== chapterHeaderGroupLength">{{(i-1)*50 + 1}}-{{i*50}}</span>
        <span v-else>{{(i-1)*50 + 1}}-{{chapterHeaderLength}}</span>
      </a-button>
    </div>
    <a-row>
      <a-col :span="6" v-for="i in 10"><div class="chapter-item">{{testTitle}}</div></a-col>
    </a-row>
  </PhCard>
</template>

<style scoped>
.list-header{
  margin: 10px;
  & > *{
    margin-right: 5px;
  }
}
.chapter-item{
  align-items: center;
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 3px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, .87);
  display: flex;
  font-size: 14px;
  height: 42px;
  line-height: 1.5;
  margin: 0 10px 16px 10px;
  //margin-bottom: 16px;
  //margin-right: 16px;
  overflow: visible;
  padding: 0 12px;
  position: relative;
  text-align: left;
  //width: 198px;
}
</style>