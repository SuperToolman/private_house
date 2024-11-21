<script setup>

const props = defineProps({
  fileInfo:{type:Object,default:null},
  baseDirectoryPath:{type:String,default:'/'}
})
const api = inject('api')
const videoEntity = ref(null)
const isValidUUID = (uuid) =>{
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (regex.test(uuid)){
    //如果为有效UUID则查询
    api.videoApi.GetById(uuid).then(res=>{
      videoEntity.value = res.data
    })
  }
  return regex.test(uuid);
}
const resourceUrl = inject('resourceUrl')
</script>


<template>
  <div class="item_file_video">
    <!--    <div class="type-tag-wrap">-->
    <!--      <div class="type-tag">-->
    <!--        <a-tag color="#cd201f">头像</a-tag>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="have-video" v-if="isValidUUID(fileInfo.name)">
      <div class="cover-wrap">
        <PhImage class="cover" :src="resourceUrl + fileInfo.targetUrl + '/cover.webp'"/>
      </div>
      <router-link  class="title" v-if="videoEntity" :to="'/video/'+videoEntity.id">
        {{ videoEntity.title }}
      </router-link>
      <!--      <VideoCard v-if="videoEntity" :video-entity="videoEntity"/>-->
    </div>


    <div class="not-video" v-else>
      <router-link  :to="'file?directoryPath=' + baseDirectoryPath + '/' +  fileInfo.name">
        <div class="cover-wrap">
          <img class="cover" src="@assets/HarmonyOS_Icons/ic_public_folder.svg">
        </div>
      </router-link>
      <p class="title">{{ fileInfo.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.item_file_video{
  display: flex;
  flex-direction: column;
  align-items: center;
  .cover-wrap{

  }
}

.not-video{
  .cover-wrap{
    width: 100%;
    height: 70px;
    .cover{
      width: 100%;
      height: 100%;
    }
  }
}


.title{
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}

</style>