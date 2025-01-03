<script setup>
import ItemFileUserAvatar from "@view/file/components/ItemFileUserAvatar.vue";
import ItemDirectory from "@view/file/components/ItemDirectory.vue";
import ItemFile from "@view/file/components/ItemFile.vue";

const api = inject("api");
const route = useRoute();
const resourceUrl = inject('resourceUrl')
const fileList = ref([]);
const baseDirectoryPath = ref(route.query.directoryPath || '');
const breadcrumbList = ref([]);  // 初始值为空数组
const linkList = ref([
  {name:'首页',link:''},
  {name:'动漫资源',link:'/AppResources/Anime'},
  {name:'漫画资源',link:'/AppResources/Manga'},
  {name:'视频资源',link:'/AppResources/Video'},
  {name:'电影资源',link:'/AppResources/Movie'},
  {name:'用户头像',link:'/UserAvatars'},
  {name:'标签封面',link:'/TagCovers'},
  {name:'审核池',link:'/AuditPool'},
])
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

// onMounted(() => {
//   initData(baseDirectoryPath.value);
// });

// 使用 watchEffect 监听 route.query 的变化
watchEffect(() => {
  baseDirectoryPath.value = route.query.directoryPath || '';
  initData(baseDirectoryPath.value);
});
</script>

<template>
  <PhViewLayout :title="'文件管理'" :sub-title="'管理nginx资源文件'">
    <PhSpace class="files-body" :flex-count="2">
      <ph-card>
        <div class="link-list-wrap">
          <div class="link-list">
            <router-link
                :class="{
            'link-item':true,
            'active':baseDirectoryPath.includes(item.link)
          }"
                :to="'file?directoryPath=' + item.link" v-for="item in linkList"
                :key="item.name">{{ item.name }}
            </router-link>
          </div>
        </div>
      </ph-card>
      <ph-card>
        <div class="content">
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
                <ItemFileUserAvatar v-if="file.targetUrl.indexOf('UserAvatar') !== -1" :file-info="file"/>
                <ItemFile v-else :file-info="file"/>
              </div>

              <!--如果为目录-->
              <div v-else class="item_directory">
                <div class="type-tag-wrap">
                  <div class="type-tag">
                    <a-tag v-if="file.name === 'UserAvatar'" :color="'#2db7f5'">头像</a-tag>
                    <a-tag v-else-if="file.name === 'AppResources'" :color="'#87d068'">资源池</a-tag>
                    <a-tag v-else-if="file.name === 'AuditPool'" :color="'#108ee9'">审核池</a-tag>

                    <a-tag v-else-if="file.name === 'Manga'" :color="'#87d068'">漫画</a-tag>
                    <a-tag v-else-if="file.name === 'Anime'" :color="'#2db7f5'">动漫</a-tag>
                    <a-tag v-else-if="file.name === 'Movie'" :color="'#f50'">电影</a-tag>
                    <a-tag v-else-if="file.name === 'Video'" :color="'#2db7f5'">视频</a-tag>
                  </div>
                </div>
                <ItemDirectory :base-directory-path="baseDirectoryPath" :file-info="file"/>
              </div>
            </div>

            <!--如果文件不存在-->
            <div v-else>
              <a-empty/>
            </div>
          </div>
        </div>
      </ph-card>
    </PhSpace>
  </PhViewLayout>
</template>

<style scoped>
.files-body{
  height: 100%;
  display: flex;
  .link-list-wrap{

    .link-list{
      display: flex;
      flex-direction: column;

      .link-item{
        color: #636D7E;
        padding: 10px;
        margin-bottom: 7px;
        border-radius: 8px;
        transition: 0.3s;
        &:hover{
          transition: 0.3s;
          background-color: #eef9fe;
        }
      }
      .active{
        color: #06A7FF;
        background-color: #eef9fe;
      }
    }
  }

}
.content{
  display: flex;
  flex-direction: column;
  .breadcrumb-wrap {
    padding: 2px 5px;
  }
  .files-content{
    display: grid;
    grid-column: span 10;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 20px;
    padding-top: 20px;
    .files-item{
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      border-radius: 7px;
      //background-color: #00AEEC;
      .item_file{

      }
      .item_directory{
        width: 100%;
      }
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
