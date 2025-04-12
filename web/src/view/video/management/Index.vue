<template>
  <ph-view-layout :title="'视频管理'" :sub-title="'管理和查看以上架的全部视频信息'">
    <template #view-tool>
      <div class="videos-controller">
        <ph-select-video-area-by-parent-input
          @handle-update-video-area="(areaId) => { videoAreaId = areaId; console.log(areaId) }" />
        <a-select v-model:value="auditStatus" style="width: 150px;margin:0 8px">
          <a-select-option value="-1">全部状态</a-select-option>
          <a-select-option value="0">草稿</a-select-option>
          <a-select-option value="1">审核中</a-select-option>
          <a-select-option value="2">审核通过</a-select-option>
          <a-select-option value="3">审核驳回</a-select-option>
        </a-select>
        <a-select v-model:value="countOption" style="width: 150px">
          <a-select-option value="0">按投稿时间</a-select-option>
          <a-select-option value="1">按播放量</a-select-option>
          <a-select-option value="2">按收藏量</a-select-option>
          <a-select-option value="3">按弹幕量</a-select-option>
          <a-select-option value="4">按评论量</a-select-option>
        </a-select>
      </div>
    </template>

    <PhCard class="videos-container-wrap" v-if="pageData.data">
      <div class="videos-container" :style="{
        'grid-template-columns': `repeat(${gridTemplateColumns}, 1fr)`
      }">
        <div class="video-wrap" v-for="videoEntity in pageData.data" :key="videoEntity">
          <VideoCard :video-entity="videoEntity"
            @handle-delete-video-done="(videoId) => pageData.data = pageData.data.filter(x => x.id !== videoId)" />
        </div>
      </div>
    </PhCard>
    <PhCard v-if="pageData.data" class="pagination-wrap">
      <a-pagination v-model:current="pageIndex" show-quick-jumper showSizeChanger hideOnSinglePage
        v-model:page-size="pageData.pageSize" :defaultPageSize=pageSizeOptions[0] :pageSizeOptions=pageSizeOptions
        :total="pageData.total" :show-total="total => `共有 ${pageData.total} 条数据`" @change="handleChangePageIndex"
        @show-size-change="handleChangePageSize">
        <!--上下一步的按钮-->
        <template #itemRender="{ type, originalElement }">
          <a-button v-if="type === 'prev'">
            <LeftOutlined />
          </a-button>
          <a-button v-else-if="type === 'next'">
            <RightOutlined />
          </a-button>
          <component :is="originalElement" v-else></component>
        </template>
        <!--Size选择器的自定义样式-->
        <template #buildOptionText="props">
          <span v-if="props.value !== pageData.total">{{ props.value }}条/页</span>
          <span v-else>全部</span>
        </template>
      </a-pagination>
    </PhCard>
    <PhCard v-else>
      <a-empty />
    </PhCard>
  </ph-view-layout>
</template>

<script setup>
import VideoCard from "@components/ph_inputs/video_module/VideoCard.vue";

const api = inject('api');
const pageData = ref({}) // .data包含表格的数据（前videoList）
const pageIndex = ref(1); // 定义Page组件的Index
const pageSize = ref(15)
const pageSizeOptions = reactive([15, 30])
const videoAreaId = ref('-1')
const auditStatus = ref("-1")
const countOption = ref("5")
const gridTemplateColumns = ref(5)
const dataInit = () => {
  api.videoApi.CombinationQueryPaged(pageIndex.value, pageSize.value, videoAreaId.value, auditStatus.value, countOption.value).then(res => {
    if (res.isSuccess) {
      pageData.value = res.data
      console.log('获取页面数据', pageData.value)
    }
  })
}

const handleChangePageIndex = (pageNumber) => {
  console.log('页面: ', pageNumber);

}

const handleChangePageSize = (current, targetPageSize) => {
  if (targetPageSize === 15) {
    gridTemplateColumns.value = 5
  } else if (targetPageSize === 30) {
    gridTemplateColumns.value = 10
  }

  pageSize.value = targetPageSize

}

// 监听多个值
watch([pageIndex, pageSize, videoAreaId, auditStatus, countOption], () => {
  console.log(pageSize)
  dataInit(); // 任意一个值变化时调用
});

onMounted(() => {
  dataInit();
})
</script>

<style scoped>
.pagination-wrap {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.videos-container-wrap {
  .videos-container {
    /* padding: 20px; */
    grid-column: span 5;
    display: grid;
    position: relative;
    width: 100%;
    grid-gap: 10px;
  }
}


.form-tools button {
  margin-right: 7px;
}
</style>