<script setup>
import { ref, inject, defineProps } from 'vue'

const props = defineProps({
  fileInfo: { type: Object, default: null },
  baseDirectoryPath: { type: String, default: '/' }
})

const api = inject('api')
const videoEntity = ref(null)
const isVideoDirectory = ref(false)

const isValidUUID = async (uuid) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (regex.test(uuid)) {
    api.videoApi.GetByUUID(uuid).then(res => {
      if (res.data !== null) {
        videoEntity.value = res.data
        isVideoDirectory.value = true
      } else {
        isVideoDirectory.value = false
      }
    })
  }
}

onMounted(()=>{
  isValidUUID(props.fileInfo.name)
})

const resourceUrl = inject('resourceUrl')
</script>

<template>
  <div class="item_file">
    <!-- 视频文件目录 -->
    <div v-if="fileInfo.targetUrl.indexOf('/AppResources/Video') !== -1">
      <!--在数据库中收录了此视频-->
      <div class="have-video" v-if="isVideoDirectory">
        <router-link class="title" v-if="videoEntity" :to="'/video/' + (videoEntity.videoType === 0 ? 'Std' : 'Diff') + videoEntity.id">
          <div class="cover-wrap">
            <PhImage class="cover" :src="resourceUrl + fileInfo.targetUrl + '/cover.webp'" display="square"/>
          </div>
          {{ videoEntity.title }}
        </router-link>
      </div>
      <!--不存在于数据库中的视频目录-->
      <div class="not-video" v-else>
        <router-link :to="'file?directoryPath=' + baseDirectoryPath + '/' + fileInfo.name">
          <div class="cover-wrap">
            <img class="cover" src="@assets/img/file/file_directory.svg" alt="" />
          </div>
        </router-link>
        <div class="title">{{ fileInfo.name }}</div>
      </div>
    </div>

    <!-- 非视频文件目录 -->
    <div v-else>
      <router-link :to="'file?directoryPath=' + baseDirectoryPath + '/' + fileInfo.name">
        <div class="cover-wrap">
          <img class="cover" src="@assets/img/file/file_directory.svg" alt="" />
        </div>
      </router-link>
      <div class="title">{{ fileInfo.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.item_file {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cover-wrap {
  width: 100%;
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover {
  width: 100%;
  height: 100%;
}

.title {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}

.have-video {
  /* Add any specific styling for video files */
}

.not-video {
  /* Add any specific styling for non-video files */
}
</style>
