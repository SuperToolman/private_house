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
  language:'0',
  tagString: '',
  tagList: [],
  recommendTagList:[],

  progress: 0,
  uploadSpeed: 0, // 实时网速，单位 MB/s
  estimatedTime: 0, // 估算的剩余时间，单位 秒
  status: 'wait', // 上传状态：'wait：等待上传'  'have：正在上传'  'done：上传完成'  'error：上传错误'
  loaded: 0,
})

const handleFileChange = (event)=>{
  files.value = event.target.files;

  if (event.target.files.length === 0) {
    console.log("没有选择文件");
    return;
  }

  const formData = new FormData();

  for (const file of event.target.files) {
    formData.append('files', file);
    formData.append('paths', file.webkitRelativePath); // 将路径信息发送到后端
  }

  try {
    let startTime = Date.now();
    let lastLoaded = 0;
    api.mangaApi.UploadToTemp(event.target.files, {
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
      //获取推荐标签
      api.systemTagApi.GetRandomByCount(20).then(res2 => {
        console.log('获取推荐标签',res2.data)
        mangaForm.recommendTagList = res2.data
      })
    })
  } catch (error) {
    mangaForm.status = 'error';
    console.error('文件上传失败:', error);
  }
}// 更新文件列表
const handleZipFileChange = (event) =>{
  console.log(event)
  files.value = event.target.files;

  if (event.target.files.length === 0) {
    console.log("没有选择文件");
    return;
  }

  try {
    let startTime = Date.now();
    let lastLoaded = 0;
    api.mangaApi.UploadToTempByZip(event.target.files[0], {
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
}

const handleUploadClick = ()=>{document.querySelector('input[type="file"]').click()}
const handleSelectUser = (users,ids) =>{
  mangaForm.authors = users
  mangaForm.authorIds = ids
  console.log('选择作者',users,ids)
}
const handleSubmit = () =>{
  console.log(mangaForm)
}

const handleChangeTagList = (tagArray)=>{
  if(tagArray !== null && tagArray.length >0){
    mangaForm.tagList = tagArray
    mangaForm.tagString = tagArray.join(',');
    console.log('以更新标签',mangaForm)
  }
}

</script>

<template>
  <input type="file" style="display: none" :ref="fileRef" @change="handleFileChange" webkitdirectory />

  <PhUploadTask v-if="files.length > 0" :entity="mangaForm"/>

  <PhSpace v-else>
    <PhUploadButton style="flex: 1" @handle-upload-click="handleUploadClick" button-text="文件夹上传"/>
    <PhUploadButton2 style="flex:1;" button-text="压缩包上传" @handle-file-change="handleZipFileChange" file-type="zip"/>
<!--    <a-button danger/>-->
  </PhSpace>

  <PhCard v-if="files.length===0">
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
      <a-form-item label="语言" name="language">
        <a-select v-model:value="mangaForm.language" @focus="focus">
          <a-select-option value="0">中文</a-select-option>
          <a-select-option value="1">英文</a-select-option>
          <a-select-option value="2">日文</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标签" name="tagString">
        <ph-select-video-tag-modal :tag-list="mangaForm.tagList" :tag-recommend-tag-list="mangaForm.recommendTagList" @handle-change-tag-list="handleChangeTagList"/>
      </a-form-item>

      <a-form-item label="文件大小" name="fileSize">
        <a-input v-model:value="mangaForm.fileSize" :disabled="true"/>
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