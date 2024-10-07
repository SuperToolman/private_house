<script setup>
import PhViewLayout from "@components/ph_inputs/PhViewLayout.vue";
import { inject, onMounted, ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import PhCard from "@components/ph_inputs/PhCard.vue";

const api = inject("api");
const route = useRoute();

const fileList = ref([]);
const baseDirectoryPath = ref(route.query.directoryPath || '');
const breadcrumbList = ref([]);  // 初始值为空数组

const initData = async (targetPath) => {
  const res = await api.systemFile.GetFiles(targetPath);
  fileList.value = res.data;
  breadcrumbList.value = baseDirectoryPath.value.split('/').filter(part => part !== '');
};

// 使用 computed 计算 breadcrumbPaths
const breadcrumbPaths = computed(() => {
  return breadcrumbList.value.map((folder, index) => {
    return {
      name: folder,
      path: '/' + breadcrumbList.value.slice(0, index + 1).join('/')
    };
  });
});

onMounted(() => {
  initData(baseDirectoryPath.value);
});

// 使用 watchEffect 监听 route.query 的变化
watchEffect(() => {
  baseDirectoryPath.value = route.query.directoryPath || '';
  initData(baseDirectoryPath.value);
});
</script>

<template>
  <PhViewLayout :title="'文件管理'" :sub-title="'管理nginx资源文件'">
    <ph-card>
      <div class="breadcrumb-wrap">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="'file'">..</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in breadcrumbPaths" :key="index">
            <router-link :to="'file?directoryPath=' + item.path">{{ item.name }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="files-content">
        <div class="files-item" v-for="file in fileList" :key="file.name">
          <router-link :to="'file?directoryPath=' + baseDirectoryPath + '/' +  file.name">
            <div class="cover-wrap">
              <img class="cover" src="@assets/HarmonyOS_Icons/ic_public_folder.svg">
            </div>
            <p class="title">{{ file.name }}</p>
          </router-link>
        </div>
      </div>
    </ph-card>
  </PhViewLayout>
</template>

<style scoped>
.breadcrumb-wrap {
  padding: 2px 5px;
}

.files-content{
  display: grid;
  grid-column: span 10;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 20px;

  .files-item{
    display: flex;
    align-items: center;
    flex-direction: column;

    .cover-wrap{
      width: 100%;
      height: 70px;
      .cover{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      text-align: center;
    }
  }
}
</style>
