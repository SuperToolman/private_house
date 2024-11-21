<script setup>
const props = defineProps({
  fileInfo:{type:Object,default:null},
  baseDirectoryPath:{type:String,default:'/'}
})
</script>

<template>
  <router-link  :to="'file?directoryPath=' + baseDirectoryPath + '/' +  fileInfo.name">
    <div class="cover-wrap">

      <img class="cover" src="@assets/HarmonyOS_Icons/ic_public_folder.svg">
    </div>
  </router-link>
  <p class="title">{{ fileInfo.name }}</p>
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