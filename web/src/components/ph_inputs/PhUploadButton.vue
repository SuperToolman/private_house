<script setup>
const emits = defineEmits(['handleUploadClick'])
const props = defineProps({
  buttonText:{type:String,default:"上传"}
})
</script>

<template>
  <ph-card>
    <div class="no-file-container">
      <img class="update_icon" src="@assets/HarmonyOS_Icons/ic_public_upload.svg" alt=""/>
      <span>拖拽此处也可以上传</span>
      <div class="btn_upload" @click="emits('handleUploadClick')">{{ buttonText }}</div>
    </div>
  </ph-card>
</template>

<style scoped>
.no-file-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: dashed;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  color: #999;


  .btn_upload {
    color: #fff;
    margin: 20px auto;
    width: 200px;
    height: 44px;
    cursor: pointer;
    background: #00a1d6;
    border-radius: 4px;
    transition: background-color .3s ease;
    text-align: center;
    line-height: 40px;
    white-space: nowrap;
  }

  .update_icon {
    width: 60px;
    margin-bottom: 10px;
  }
}

.localStorage_files-wrap > * {
  margin-right: 8px;
}
</style>