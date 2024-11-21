<script setup>
import VideoHelper from "@common/js/videoHelper";
import DifferenceList from "@view/video/upload/components/DifferenceList.vue";
import SelectPreview from "@view/video/upload/components/SelectPreview.vue";

const api = inject('api')
const videos = ref([])
const videoPreviewTimeList = ref([])
const handleUploadClick = ()=>{document.querySelector("#videoInput").click()}
const videoDifferenceForm = ref({
  id:'',
  userId:'',
  userEntity:'',
  title: '',
  type: '0',
  videoAreaId: '',
  videoAreaEntity: {parent:null, child:null},
  tagString: '',
  tagList: [],
  cover: null,
  desc: '',
})
const handleFileChange = async(event)=>{
  const files = Array.from(event.target.files);
  videoDifferenceForm.value.title = files[0].name.substring(0,files[0].name.lastIndexOf('.'))
  if (files.length) {
    if (videoPreviewTimeList.value.length === 0){
      const videoHelper = new VideoHelper(files[0]);
      // 获取视频时长
      const maxTime = await videoHelper.getDuration()
      // 生成随机时间列表
      for (let i = 0; i < 6; i++) {
        videoPreviewTimeList.value.push(Math.random() * maxTime);
      }
    }

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
        cover: null,
        previews: [],
        tempUrl:URL.createObjectURL(file)
      });
    })

    // 上传文件并处理预览图
    for (const [index, video] of videos.value.entries()) {
      if (video.status === 'wait') {
        video.status = 'have'

        //生成预览图
        createPreviews(video)

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
            video.id = res.data.id;
            // console.log(`上传成功: 文件ID - ${video.id}`);
          })
        } catch (error) {
          video.status = 'error';
          console.error('文件上传失败:', error);
        }
      }
    }
  }
}

const createPreviews = async (video)=>{
  const videoHelper = new VideoHelper(video.file)
  // 截取随机时间点的预览图
  for (let time of videoPreviewTimeList.value) {
    const res = await videoHelper.getPreview(time);
    video.previews.push(res);
  }
}

const handleSelectUser = (userEntity) => {
  videoDifferenceForm.value.userEntity = userEntity
  videoDifferenceForm.value.userId = userEntity.id
}
const handleChangeTagList = (tagArray)=>{
  if(tagArray !== null && tagArray.length >0){
    videoDifferenceForm.value.tagString = tagArray.join(',');
  }
}
const handleSelectArea = (areaEntity) => {
  videoDifferenceForm.value.videoAreaId = areaEntity.child.value
  videoDifferenceForm.value.videoAreaEntity = areaEntity;
  console.log('选中的分区', videoDifferenceForm.value.videoAreaEntity)
}
</script>

<template>
  <PhViewLayout title="差分视频上传" sub-title="差分视频指的是视频集合中，每一个视频，在整体视频中内容大体一致，只有略微区别，是一种特殊的视频集合">
    <input id="videoInput" @change="handleFileChange"
           accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v" multiple="multiple" type="file"
           style="display: none">
    <div class="have-file-container" v-if="videos && videos.length > 0">
      <ph-card :title="'基本信息'">
        <a-form name="basic"
                autocomplete="off"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 16 }">
          <a-form-item label="生成ID" name="id">
            <a-input v-model:value="videoDifferenceForm.id" disabled/>
          </a-form-item>
          <a-form-item label="作者" name="userId">
            <ph-select-user-modal :user-entity="videoDifferenceForm.userEntity"
                                  @handle-select-user="handleSelectUser"/>
          </a-form-item>
          <a-form-item label="封面" name="cover">
            <SelectPreview
                :cover="videos[0].cover"
                :previews="videos[0].previews"
                @handle-upload-cover="(cover)=>videoDifferenceForm.cover"/>
          </a-form-item>
          <a-form-item label="标题" name="title">
            <a-input v-model:value="videoDifferenceForm.title"/>
          </a-form-item>
          <a-form-item label="类型" name="type">
            <a-radio-group v-model:value="videoDifferenceForm.type">
              <a-radio value="0">自制</a-radio>
              <a-radio value="1">转载</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="分区" name="videoArea">
            <PhSelectVideoAreaInput2
                v-if="videoDifferenceForm.videoAreaEntity"
                :active-area="videoDifferenceForm.videoAreaEntity"
                @handle-select="handleSelectArea"/>
          </a-form-item>
          <a-form-item label="标签" name="tagString">
            <PhSelectVideoTagModal :tag-list="videoDifferenceForm.tagList" @handle-change-tag-list="handleChangeTagList"/>
            <!--              <ph-select-video-tag-modal :tag-list="videoDifferenceForm.tagList" @handle-change-tag-list="handleChangeTagList"/>-->
          </a-form-item>
          <a-form-item label="简介" name="description">
            <a-input v-model:value="videoDifferenceForm.desc"/>
          </a-form-item>
        </a-form>
      </ph-card>

      <!--视频列表-->
      <DifferenceList :video-list="videos"/>

      <!--action-->
      <ph-card>
        <div class="action-wrap">
          <a-button type="primary">上传</a-button>
          <a-button>取消</a-button>
        </div>
      </ph-card>
    </div>
    <!--不存在文件时-->
    <div class="not-file-container" v-else>
      <img class="update_icon" src="../../../assets/HarmonyOS_Icons/ic_public_upload.svg">
      <span>拖拽此处也可以上传</span>
      <div class="btn_upload" @click="handleUploadClick">上传差分视频</div>
    </div>
  </PhViewLayout>
</template>

<style scoped>
.not-file-container {
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

.action-wrap{
  width: 100%;
  display: flex;
  align-items: center;
}
</style>