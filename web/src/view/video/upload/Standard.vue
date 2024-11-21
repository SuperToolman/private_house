<script setup>
import VideoHelper from "@common/js/videoHelper";
import localStorageHelper from "@common/js/localStorageHelper";
import VideoManuscriptManagement from "./components/VideoManuscriptManagement.vue";
import UploadTask from "./components/UploadTask.vue";
import UploadTaskForm from "./components/UploadTaskForm.vue";
import LocalStoreHelper from "@common/js/localStorageHelper";
import {message} from "ant-design-vue";

const api = inject('api');
const videos = ref([]);
const manuscriptVideos = ref([])
const activeVideoIndex = ref(-1);
const localFileList = ref([])

const handleUploadClick = ()=>{
  document.getElementById('videoFiles').click();
}
const handleFileChange = async (event) => {
  const files = Array.from(event.target.files);
  if (files.length) {
    files.forEach(file => {
      // 初始化表单和上传状态信息
      videos.value.push({
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

        // 视频信息表单
        id: '',
        userId:'',
        userEntity:'',
        title: file.name.split('.')[0],
        type: '0',
        videoAreaId: '',
        videoAreaEntity: {parent:null, child:null},
        tagString: '',
        tagList: [],
        cover: null,
        previews: [],
        desc: '',
      });
    });

    // 设置当前活跃的文件索引
    activeVideoIndex.value = videos.value.length - 1;

    // 上传文件并处理预览图
    for (const [index, video] of videos.value.entries()) {
      if (video.status === 'wait') {
        video.status = 'have'
        createPreviews(video) //生成预览图
        try {
          let startTime = Date.now();
          let lastLoaded = 0;

          api.videoApi.UploadToTemp(video.file, {
            onUploadProgress: (progressEvent) => {
              const currentTime = Date.now();
              const timeElapsed = (currentTime - startTime) / 1000;

              const loaded = progressEvent.loaded;
              const total = progressEvent.total;
              const bytesSinceLast = loaded - lastLoaded;

              lastLoaded = loaded;

              const uploadSpeed = (bytesSinceLast / (1024 * 1024)) / (timeElapsed || 1);
              video.uploadSpeed = uploadSpeed.toFixed(2);

              const remainingBytes = total - loaded;
              const estimatedTime = remainingBytes / (uploadSpeed * 1024 * 1024);

              video.estimatedTime = estimatedTime.toFixed(2);
              video.loaded = (loaded / 1024 / 1024).toFixed(1);
              video.progress = Math.round((loaded / total) * 100);
            }
          }).then(res => {
            video.status = 'done';
            video.uuid = res.data.id;
            // 复制对象，并移除file、previews属性
            const {file, previews, cover, ...rest} = video;
            localStorageHelper.addItemToLocalVideoArray({...rest, cover: null, previews: []})
            console.log(`上传成功: 文件ID - ${video.uuid}`);
          })
        } catch (error) {
          video.status = 'error';
          console.error('文件上传失败:', error);
        }
      }
    }
  }
};
const createPreviews = async (video) => {
  // 生成预览图
  if (!video.previews.length) {
    const videoHelper = new VideoHelper(video.file);
    const previews = await videoHelper.getRandomPreviews(5);
    const test = await videoHelper.getDuration()
    video.durationBySecond = await videoHelper.getDuration()
    console.log(test)
    video.previews = previews;
    video.cover = previews[0];
  }
}
const handleInitDataByLocalStorage = () => {
  const localData = localStorageHelper.getItem('video_upload_record')
  activeVideoIndex.value = localData.length - 1
  videos.value = localData
}
const handleClearLocalStorage = async () => {
  const localData = localStorageHelper.getItem('video_upload_record');

  if (localData && Array.isArray(localData)) {
    // 使用for...of循环来处理异步删除请求
    for (const video of localData) {
      try {
        await api.videoApi.DeleteById(video.id); // 异步等待每个视频删除完成
      } catch (error) {
        console.error(`Error deleting video with ID ${video.id}`, error);
      }
    }

    // 删除localStorage中的记录
    localStorageHelper.removeItem('video_upload_record');

    // 清空本地文件列表
    localFileList.value = null;
  }
}
const handleActivateIndexChange = (index)=>{
  activeVideoIndex.value = index
}
const handleSelectUser = (userEntity) => {
  videos.value[activeVideoIndex.value].userEntity = userEntity
  videos.value[activeVideoIndex.value].userId = userEntity.id
}
const handleSelectArea = (areaEntity) => {
  videos.value[activeVideoIndex.value].videoAreaId = areaEntity.child.value
  videos.value[activeVideoIndex.value].videoAreaEntity = areaEntity;
  console.log('选中的分区', videos.value[activeVideoIndex.value].videoAreaEntity)
}
const handleOnlySubmission = () => {
  console.log('投稿焦点视频表单：', videos.value[activeVideoIndex.value])
  api.videoApi.SubmissionForReview(videos.value[activeVideoIndex.value]).then(res => {
    //投稿成功删除本地存储
    try {
      if (res.isSuccess) {
        //上传成功
        //移除本地表单数据
        LocalStoreHelper.removeItemByIdFromVideoArray(videos.value[activeVideoIndex.value].id)
        //将该视频移除任务列表
        manuscriptVideos.value.push(videos.value[activeVideoIndex.value])
        videos.value = videos.value.filter(x=>x.id !== videos.value[activeVideoIndex.value].id)
        const backIndex = activeVideoIndex.value - 1;
        if (backIndex === -1) {
          //移除的视频为唯一任务
          videos.value = []
          message.success(res.message)
        }
      }
    } catch (error) {
      message.error(`投稿成功！但移除该本地存储发生错误：${error}`)
    }
  })
}
const handleAllSubmission = () => {
  console.log(videos.value)
}
//删除审核队列item
const handleDeleteManuscriptVideo = (video)=> manuscriptVideos.value = manuscriptVideos.value.filter(x=>x.id !== video.id)
onMounted(() => {
  localFileList.value = localStorageHelper.getItem('video_upload_record')
  //初始化审核列表
  api.videoApi.GetByCombinationQuery(-1,1,5).then(res=>{
    if (res.isSuccess){
      manuscriptVideos.value = res.data
    }
  })
})
</script>

<template>
  <ph-view-layout :title="'视频上传'" :sub-title="'管理员专用批量视频上传'">
    <template #view-tool v-if="localFileList && localFileList.length > 0 && videos.length === 0">
      <div class="localStorage_files-wrap">
        <span>本地浏览器存有{{ localFileList.length }}个未提交的视频</span>
        <a-button @click="handleInitDataByLocalStorage" type="primary">继续</a-button>
        <a-button @click="handleClearLocalStorage">不用了</a-button>
      </div>
    </template>
    <input id="videoFiles" @change="handleFileChange"
           accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v" multiple="multiple" type="file"
           style="display: none">
    <div class="update-container-wrap">
      <div class="update-container">
        <div class="have-file-container" v-if="videos && videos.length !== 0">
          <!--任务列表-->
          <UploadTask
              :videos="videos"
              :active-video-index="activeVideoIndex"
              @handle-upload-click="handleUploadClick"
              @handle-activate-index-change="handleActivateIndexChange"/>

          <!--焦点任务的基本信息-->
          <UploadTaskForm
              :videos="videos"
              :active-video-index="activeVideoIndex"
              @handle-select-user-change="handleSelectUser"
              @handle-select-area-change="handleSelectArea"
              @handle-only-submission="handleOnlySubmission"
              @handle-all-submission="handleAllSubmission"
          />
        </div>

        <ph-card v-else>
          <div class="no-file-container">
            <img class="update_icon" src="../../../assets/HarmonyOS_Icons/ic_public_upload.svg">
            <span>拖拽此处也可以上传</span>
            <div class="btn_upload" @click="handleUploadClick">上传视频</div>
          </div>
        </ph-card>
      </div>
    </div>

    <video-manuscript-management
        :manuscript-videos="manuscriptVideos"
        @handle-delete-manuscript-video="handleDeleteManuscriptVideo"/>
  </ph-view-layout>


</template>


<style scoped>
.update-container-wrap {
  width: 100%;
  //padding: 10px 200px;
  .update-container {
    .have-file-container {

    }
  }
}



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