<script setup>
import {message} from "ant-design-vue";

const api = inject('api');
const resourceUrl = inject('resourceUrl');
const route = useRoute();
const mangaEntity = ref({});
const backgroundLight = ref(true)

// 获取漫画数据并处理
const dataInit = async (mangaId) => {
  try {
    const res = await api.mangaApi.GetById(mangaId);
    if (res.isSuccess) {
      mangaEntity.value = res.data;
    } else {
      message.error(res.message);
    }
  } catch (error) {
    message.error("加载漫画数据失败！");
    console.error(error);
  }
};

// 获取最大页数的位数
const getPageNumberLength = (pageNumber) => {
  return String(pageNumber).length;
};

const handleLightSwitching = ()=>{
  backgroundLight.value = !backgroundLight.value
}

onMounted(() => {
  const mangaId = route.params.mangaId;
  dataInit(mangaId);
});
</script>

<template>
  <div class="tool-container">
    <a-button @click="handleLightSwitching"><BulbOutlined /></a-button>
  </div>

  <div
      class="manga-page-container-wrap"
      :style="{
        'background-color':backgroundLight?'var(--bg3)':'#333333'
      }">
    <div
        class="manga-page-container"
        v-if="mangaEntity.pageNumber" >
      <PhImage
          v-for="index in mangaEntity.pageNumber"
          :key="index"
          :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/${mangaEntity.basePrefix}${String(index).padStart(getPageNumberLength(mangaEntity.pageNumber), '0')}.webp`"
          :alt="`Page ${index}`"
      />
    </div>
  </div>
</template>

<style scoped>
.manga-page-container-wrap{
  .manga-page-container{
    max-width: 860px;
    margin: 0 auto;
  }
}


.tool-container{
  position: fixed;
  bottom: 60px;
  right: 60px;
}
</style>
