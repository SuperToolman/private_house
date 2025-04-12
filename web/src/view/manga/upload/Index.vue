<script setup>
import UploadTaskForm from "@view/manga/upload/components/UploadTaskForm.vue";
import UploadTask from "@view/manga/upload/components/UploadTask.vue";

const userAutomaticRegistration = ref(true)
const fileRef = ref(null)
const files = ref([])
const activeMangaIndex = ref(-1)
const api = inject('api')
const mangas = ref([]);
const phUploadButtonRef = ref(null)
const InitUploadManga = (file)=>{
  mangas.value.push({
    title:'',
    id:'',
    uuid:'',
    fileSize:'',
    pageNumber:'',// 获取上传的漫画页数
    authorIds:'',
    authors:[],
    language:'0',
    userAutomaticRegistration:true,// 自动添加作者
    tagString: '',
    tagList: [],

    file, // 文件对象
    progress: 0,
    status: 'wait', // 上传状态：'wait：等待上传'  'have：正在上传'  'done：上传完成'  'error：上传错误'
    loaded: 0,
    total: (file.size / 1024 / 1024).toFixed(1),  // 文件总大小，单位MB
    uploadSpeed: 0, // 实时网速，单位 MB/s
    estimatedTime: 0, // 估算的剩余时间，单位 秒
    size:file.size,
    fileName:file.name,
    durationBySecond:0,
    recommendTagList:[],
  })
}

const handleUploadZipClick = (event) =>{
  const files = Array.from(event.target.files);
  if (files.length) {
    files.forEach(file => {
      InitUploadManga(file)
    });
  }

  console.log(mangas.value)
  // 设置当前活跃的文件索引
  console.log("设置当前活跃的文件索引",mangas.value.length)
  activeMangaIndex.value = mangas.value.length - 1;

  // 上传文件并处理预览图
  for (const [index, manga] of mangas.value.entries()) {
    if (manga.status === 'wait') {
      manga.status = 'have'
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
            manga.uploadSpeed = uploadSpeed.toFixed(2);

            const remainingBytes = total - loaded;
            const estimatedTime = remainingBytes / (uploadSpeed * 1024 * 1024);

            manga.estimatedTime = estimatedTime.toFixed(2);
            manga.loaded = (loaded / 1024 / 1024).toFixed(1);
            manga.progress = Math.round((loaded / total) * 100);
          }
        }).then(res => {
          manga.status = 'done';
          manga.id = res.data.id
          manga.uuid = res.data.uuid
          manga.title = res.data.title
          manga.fileSize = res.data.fileSize
          manga.pageNumber = res.data.pageNumber
          console.log(`上传成功: 文件ID - ${manga.uuid}`);

          // 1.获取推荐标签
          // 2.存储数据到本地缓存中，复制对象，并移除file、previews属性
        })
      } catch (error) {
        manga.status = 'error';
        console.error('文件上传失败:', error);
      }
    }
  }

  if (event.target.files.length === 0) {
    console.log("没有选择文件");
  }
}
const handleActivateIndexChange = (index)=>{
  activeMangaIndex.value = index
}

const handleUploadClick = ()=>{
  // 等待 PhUploadButton2 已经渲染并且 ref 绑定成功
  if (phUploadButtonRef.value) {
    console.log('调用 PhUploadButton2 的 handleUploadClick 方法');
    phUploadButtonRef.value.handleUploadClick(); // 调用 PhUploadButton2 中的 handleUploadClick 方法
  } else {
    console.error('PhUploadButton2 组件未渲染或 ref 绑定失败');
  }
}
</script>

<template>
  <ph-view-layout title="漫画上传">
    <PhSpace>
      <!--<PhUploadButton @handle-upload-click="handleUploadClick" button-text="文件夹上传"/>-->
      <PhUploadButton2 ref="phUploadButtonRef" button-text="压缩包上传" @handle-file-change="handleUploadZipClick" file-type="zip"/>
    </PhSpace>

    <div class="have-file-container" v-if="mangas && mangas.length !== 0">
      <!--任务列表-->
      <UploadTask
          :mangas="mangas"
          :active-manga-index="activeMangaIndex"
          @handleActivateIndexChange="handleActivateIndexChange"
          @handleUploadClick="handleUploadClick"/>

      <!--焦点任务的基本信息-->
      <UploadTaskForm
          :manga-entity="mangas[activeMangaIndex]"
      />
    </div>
  </ph-view-layout>
</template>

<style scoped>

</style>