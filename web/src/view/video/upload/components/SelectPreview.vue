<script setup>
import VideoHelper from "@common/js/videoHelper";
import FileHelper from "@common/js/fileHelper";
import {message} from "ant-design-vue";

const emits = defineEmits(['handleUploadCover','handleChoseCover'])
const props = defineProps({
  cover:{type:Object,default:null},
  previews:{type:Array}
})

const coverEntity = ref({
  dataURL:null,
  blob:null,
})
const choseIndex = ref(0);
const handleChoseCover = (index) =>{
  choseIndex.value = index
  emits('handleChoseCover',{cover:props.previews[index],index})
}
const handleUploadCover = ()=>document.querySelector('#coverFileInput').click();
const handleFileChange = async () => {
  const coverFile = event.target.files[0];
  FileHelper.GetBlobAndBase64StringForObject(coverFile).then(res=>{
    coverEntity.value = res
    emits('handleUploadCover',coverEntity.value)
  }).catch(error=>message.error(error))
}

watch(props,()=>{
  coverEntity.value = props.cover;
})
</script>

<template>
  <input id="coverFileInput" type="file" @change="handleFileChange" style="display: none" accept="image/*"/>

  <div class="cover-content">
    <div class="cover-upload-wrap">
      <div v-if="cover" class="cover-upload" :style="{
        'background-image': `url(${cover.dataURL})`,
        'background-size': 'cover',  // 将图片完整显示在容器中
        'background-position': 'center',  // 居中显示图片
        'background-repeat': 'no-repeat'  // 防止图片重复
      }">
      </div>
      <div v-else class="cover-upload no-cover" @click="handleUploadCover">
        <img class="update_icon" src="@assets/HarmonyOS_Icons/ic_public_upload.svg" style="margin-bottom: 10px;" alt="">
        <span>上传封面</span>
      </div>
    </div>
    <div class="cover-preview">
      <div class="cover-preview-list" v-if="previews.length > 0">
        <div @click="handleChoseCover(index)" :class="{
          'cover-preview-list-item':true,
        }" v-for="(item,index) in previews" :key="item" :style="{
          'background-image': `url(${item.dataURL})`,
          'background-size': 'cover',  // 将图片完整显示在容器中
          'background-position': 'center',  // 居中显示图片
          'background-repeat': 'no-repeat'  // 防止图片重复
        }">
          <div class="chose-mask" v-if="index === choseIndex">
            <CheckOutlined style="color: #00AEEC"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover-content{
  display: flex;
}
.cover-upload-wrap{
  .cover-upload{
    width: 169px;
    height: 127px;
    position: relative;
    border-radius: 10px;
  }.no-cover{
       background: #fafafa;
       border: 1px dashed silver;
       display: flex;
       align-items: center;
       justify-content: center;
       flex-direction: column;
       font-size: 12px;
       font-weight: 400;
       color: #999;
     }
}
.cover-preview{
  margin-left: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .cover-preview-list{
    padding: 6px 0 0 0;
    display: flex;
    .cover-preview-list-item{
      overflow: hidden;
      width: 120px;
      height: 90px;
      position: relative;
      background: #f4f5f7;
      border-radius: 10px;
      border: 2px solid #f4f5f7;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .5s ease-in-out;
      margin: 0 10px 0 0;

      .chose-mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>