<script setup>
import { ref } from "vue";

const emits = defineEmits(["handleFileChange"]);
const props = defineProps({
  buttonText: {
    type: String,
    default: "上传",
  },
  fileType: {
    type: String,
    default: "all", // 默认接受所有文件类型
    validator(value) {
      return ["zip", "folder", "image", "pdf", "all"].includes(value);
    },
  },
});

// 定义输入框的引用
const folderInputRef = ref(null);
const zipInputRef = ref(null);

// 点击按钮触发上传逻辑
const handleUploadClick = () => {
  if (props.fileType === "folder") {
    folderInputRef.value?.click(); // 触发文件夹选择
  } else if (props.fileType === "zip") {
    zipInputRef.value?.click(); // 触发压缩文件选择
  }
};
</script>

<template>
  <!-- 文件夹上传 -->
  <input
      type="file"
      style="display: none"
      ref="folderInputRef"
      webkitdirectory
      @change="emits('handleFileChange', $event)"
  />

  <!-- 压缩文件上传 -->
  <input
      type="file"
      style="display: none"
      ref="zipInputRef"
      accept=".zip,.rar,.7z"
      @change="emits('handleFileChange', $event)"
  />

  <!-- 可拖拽上传区域 -->
  <ph-card>
    <div class="no-file-container">
      <img class="update_icon" src="@assets/HarmonyOS_Icons/ic_public_upload.svg"
       alt=""/>
      <span>拖拽此处也可以上传</span>
      <div class="btn_upload" @click="handleUploadClick">
        {{ buttonText }}
      </div>
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
}

.no-file-container .btn_upload {
  color: #fff;
  margin: 20px auto;
  width: 200px;
  height: 44px;
  cursor: pointer;
  background: #00a1d6;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  text-align: center;
  line-height: 40px;
  white-space: nowrap;
}

.no-file-container .update_icon {
  width: 60px;
  margin-bottom: 10px;
}
</style>
