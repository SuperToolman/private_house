<script setup>
const props = defineProps({
  fileInfo:{type:Object,default:null},
})
</script>

<template>
  <div class="cover-wrap">
    <img class="cover" src="@assets/HarmonyOS_Icons/ic_public_folder.svg">
  </div>
  <p class="title">{{ file.name }}</p>
</template>

<style scoped>
.cover-wrap{
  width: 100%;
  height: 70px;
  .cover{
    width: 100%;
    height: 100%;
  }
}

.title{
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>