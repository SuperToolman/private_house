<script setup>
import ItemFileUserAvatar from "@view/file/components/ItemFileUserAvatar.vue";
import ItemDirectoryVideo from "@view/file/components/ItemDirectoryVideo.vue";
import ItemDirectory from "@view/file/components/ItemDirectory.vue";
import ItemFile from "@view/file/components/ItemFile.vue";

const api = inject("api");
const route = useRoute();
const resourceUrl = inject('resourceUrl')
const fileList = ref([]);
const baseDirectoryPath = ref(route.query.directoryPath || '');
const breadcrumbList = ref([]);  // 初始值为空数组
const initData = async (targetPath) => {
  api.systemFile.GetFiles(targetPath).then(res=>{
    console.log(res.data)
    fileList.value = res.data;
    breadcrumbList.value = baseDirectoryPath.value.split('/').filter(part => part !== '');
  })

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
        <div v-if="fileList && fileList.length >0" class="files-item" v-for="file in fileList" :key="file.name">
          <!--如果为文件类型，则显示源资源-->
          <div v-if="file.type === 'File'" class="item_file">
            <ItemFileUserAvatar v-if="file.targetUrl.indexOf('UserAvatarResources') !== -1" :file-info="file"/>
            <ItemFile v-else :file-info="file"/>
          </div>

          <!--如果为目录-->
          <div v-else class="item_directory">
            <div class="type-tag-wrap">
              <div class="type-tag">
                <a-tag v-if="file.name === 'UserAvatarResources'" :color="'#2db7f5'">头像目录</a-tag>
                <a-tag v-else-if="file.name === 'MangaResources'" :color="'#87d068'">漫画目录</a-tag>
                <a-tag v-else-if="file.name === 'AnimeResources'" :color="'#2db7f5'">动漫目录</a-tag>
                <a-tag v-else-if="file.name === 'MovieResources'" :color="'#f50'">电影目录</a-tag>
                <a-tag v-else-if="file.name === 'VideoResources'" :color="'#2db7f5'">视频目录</a-tag>
                <a-tag v-else-if="file.name === 'Temp'" :color="'#108ee9'">审核池</a-tag>
              </div>
            </div>
            <ItemDirectoryVideo v-if="file.targetUrl.indexOf('VideoResources') !== -1" :file-info="file" :baseDirectoryPath="baseDirectoryPath"/>
            <ItemDirectory v-else :base-directory-path="baseDirectoryPath" :file-info="file"/>
          </div>
        </div>

        <!--如果文件不存在-->
        <div v-else>
          无文件
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

    .item_file{

    }

    .item_directory{
      width: 100%;
    }
  }
}

.type-tag-wrap{
  z-index: 1;
  width: 100%;
  position: relative;
  .type-tag{
    position: absolute;
    right: 0;
  }
}
</style>
