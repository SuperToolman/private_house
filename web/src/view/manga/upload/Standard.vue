<script setup>
import PhUploadTask from "../../../components/ph_inputs/PhUploadTask.vue";

const fileRef = ref(null)
const files = ref([])
const api = inject('api')
const mangaForm = reactive({
  title:'',
  uuid:'',
  fileSize:'',
  pageNumber:'',// 获取上传的漫画页数
  authorIds:'',
  authors:[],

  progress: 0,
  uploadSpeed: 0, // 实时网速，单位 MB/s
  estimatedTime: 0, // 估算的剩余时间，单位 秒
  status: 'wait', // 上传状态：'wait：等待上传'  'have：正在上传'  'done：上传完成'  'error：上传错误'
  loaded: 0,
})

const handleFileChange = (event)=>{
  files.value = event.target.files;

  const input = document.querySelector('input[type="file"]');
  if (input.files.length === 0) {
    console.log("没有选择文件");
    return;
  }

  const formData = new FormData();

  for (const file of input.files) {
    formData.append('files', file);
    formData.append('paths', file.webkitRelativePath); // 将路径信息发送到后端
  }

  try {
    let startTime = Date.now();
    let lastLoaded = 0;
    api.mangaApi.UploadToTemp(input.files, {
      onUploadProgress: (progressEvent) => {
        const currentTime = Date.now();
        const timeElapsed = (currentTime - startTime) / 1000;

        const loaded = progressEvent.loaded;
        const total = progressEvent.total;
        const bytesSinceLast = loaded - lastLoaded;

        lastLoaded = loaded;

        const uploadSpeed = (bytesSinceLast / (1024 * 1024)) / (timeElapsed || 1);
        mangaForm.uploadSpeed = uploadSpeed.toFixed(2);

        const remainingBytes = total - loaded;
        const estimatedTime = remainingBytes / (uploadSpeed * 1024 * 1024);

        mangaForm.estimatedTime = estimatedTime.toFixed(2);
        mangaForm.loaded = (loaded / 1024 / 1024).toFixed(1);
        mangaForm.progress = Math.round((loaded / total) * 100);
      }
    }).then(res => {
      mangaForm.status = 'done';
      mangaForm.uuid = res.data.uuid
      mangaForm.title = res.data.title
      mangaForm.fileSize = res.data.fileSize
      mangaForm.pageNumber = res.data.pageNumber
      // 复制对象，并移除file、previews属性

      console.log(`上传成功: 文件ID - ${mangaForm.uuid}`);
    })
  } catch (error) {
    mangaForm.status = 'error';
    console.error('文件上传失败:', error);
  }
}// 更新文件列表
const handleUploadClick = ()=>{document.querySelector('input[type="file"]').click()}
const handleSelectUser = (users,ids) =>{
  mangaForm.authors = users
  mangaForm.authorIds = ids
  console.log('选择作者',users,ids)
}
const handleSubmit = () =>{
  console.log(mangaForm)
}

</script>

<template>
  <input type="file" style="display: none" :ref="fileRef" @change="handleFileChange" webkitdirectory />

  <PhUploadTask v-if="files.length > 0" :entity="mangaForm"/>

  <PhSpace v-else>
    <PhUploadButton style="flex: 1" @handle-upload-click="handleUploadClick" button-text="文件夹上传"/>
    <PhUploadButton style="flex:1;" @handle-upload-click="handleUploadClick" button-text="压缩包上传"/>
  </PhSpace>

  <PhCard>
    <a-form :model="mangaForm" :label-col="{ span: 2 }"
            :wrapper-col="{ span: 16 }">
      <a-form-item label="UUID" name="uuid">
        <a-input v-model:value="mangaForm.uuid" :disabled="true"/>
      </a-form-item>
      <a-form-item label="标题" name="title">
        <a-input v-model:value="mangaForm.title"/>
      </a-form-item>
      <a-form-item label="作者" name="authorIds">
        <PhMultipleSelectUserModal :users="mangaForm.authors" @handle-select-users="handleSelectUser"/>
      </a-form-item>
      <a-form-item label="文件大小" name="fileSize">
        <a-input v-model:value="mangaForm.fileSize"/>
      </a-form-item>
      <a-form-item label="页数" name="pageNumber">
        <a-input v-model:value="mangaForm.pageNumber" :disabled="true"/>
      </a-form-item>
    </a-form>

    <a-button type="primary" @click="handleSubmit">提交</a-button>
  </PhCard>
</template>

<style scoped>

</style>