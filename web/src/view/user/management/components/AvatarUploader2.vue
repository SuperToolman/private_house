<script setup>
import {onMounted, ref, nextTick, inject, watch} from "vue";
import Cropper from "cropperjs";  // 确保正确导入 cropperjs
import {UploadOutlined,SaveOutlined} from '@ant-design/icons-vue'
import FileHelper from '@common/js/fileHelper';
import {message} from "ant-design-vue"; // 假设这个是你的文件路径

const props = defineProps({
  user:{type:Object,default:null}
})
const emits = defineEmits(['handleSureSavaAvatar'])
const api = inject('api')
const userAvatarResource = inject("resourceByUserAvatarUrl");
const myCropper = ref(null);
const afterImg = ref("");
const image = ref(null);
const uploadedImage = ref(null);
// 处理文件上传
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result;
      nextTick(() => {
        initCropper();
      });
    };
    reader.readAsDataURL(file);
  }
};

const sureSava =async () => {
  if (myCropper.value) {
    afterImg.value = myCropper.value.getCroppedCanvas({imageSmoothingQuality: 'high'}).toDataURL('image/webp');
    const avatarBlob = await FileHelper.Base64StringToBlob(afterImg.value, 'image/webp');

    props.user.haveAvatar = true
    uploadedImage.value = null //保存后重置显示状态
    emits('handleSureSavaAvatar', avatarBlob)
  }else
    props.user.haveAvatar = false
}
const initCropper = () => {
  if (image.value) {
    if (myCropper.value) {
      myCropper.value.destroy();  // 销毁之前的 cropper 实例
    }
    myCropper.value = new Cropper(image.value, {
      viewMode: 1,
      dragMode: 'none',
      initialAspectRatio: 1,
      aspectRatio: 1,
      preview: '.before',
      background: false,
      autoCropArea: 0.6,
      zoomOnWheel: false
    });
  }
};
const handleFileUpload = () => document.querySelector("#avatarFileInput").click()

watch(props,()=>{
  if (props.user){
    if (props.user.haveAvatar)
      afterImg.value = userAvatarResource + props.user.id + '.webp';
    else {
      afterImg.value = "";
    }
  }
},{immediate:true})

// 暴露函数或属性
defineExpose({
  sureSava
})
</script>
<template>
  <div>
    <input id="avatarFileInput" type="file" @change="handleFileChange" style="display: none" accept="image/*"/>
    <div class="container">
      <div class="img-container" v-if="uploadedImage">
        <!-- 动态展示上传的图片 -->
        <img :src="uploadedImage" ref="image" alt="图片加载失败"/>
        <!--      <img v-else  @click="handleFileUpload" src="/src/assets/avatar-defult.gif" alt="404">-->
      </div>
      <div class="before" v-if="uploadedImage"></div>
      <!--最终头像预览图（裁切）-->
      <div class="afterCropper" v-if="!uploadedImage">
        <img v-if="afterImg" :src="afterImg" alt="裁剪后图片"/>
      </div>
    </div>
    <!--更换与保存-->
    <div class="avatar-upload-btn-wrap">
      <span class="avatar-upload-btn" @click="handleFileUpload">
        <UploadOutlined style="margin-right: 5px"/><span>更换头像</span>
      </span>
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 10px; /* 使各元素之间有间距 */
}

.before {
  width: 190px;
  height: 190px;
  border: 1px solid #ddd;
  background-color: #f5f5f5; /* 预览区域的背景颜色 */
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 50%;
}

.img-container {
  width: 190px;
  height: 190px;
  background-color: #313131;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 避免图片超出容器 */
  border: 1px solid #ddd; /* 给容器加个边框以便更好地看到裁剪区域 */
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片宽高比，填满容器 */
}

.afterCropper {
  //display: none;
  overflow: hidden;
  border-radius: 50%;
  width: 190px;
  height: 190px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd; /* 给容器加个边框以便更好地看到裁剪后的图片 */
}

.afterCropper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片宽高比，填满容器 */
}

.avatar-upload-btn-wrap{
  border-top: 0.5px solid rgba(204, 204, 204, 0.64);
  margin: 10px 0;
  padding-top: 10px;
  text-align: center;
  .avatar-upload-btn{
    text-align: center;
    transition: 0.3s;
  }:hover{
  transition: 0.3s;
  color: #0088cc;
  cursor:pointer;
     }
}
.avatar-save-btn{
  margin-left: 25px;
}
</style>
