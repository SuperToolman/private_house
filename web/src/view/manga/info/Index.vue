<script setup>
import InfoChapter from "./components/InfoChapter.vue";
import InfoRecommend from "./components/InfoRecommend.vue";
import InfoComment from "./components/InfoComment.vue";
import InfoAuditStatus from "./components/InfoAuditStatus.vue";
import { formatFileSize } from "@common/js/utils";
import { message } from "ant-design-vue"; // 引入 message 用于提示

const route = useRoute();
const router = useRouter();
const mangaId = ref("");
const mangaEntity = ref({});
const api = inject("api");
const resourceUrl = inject("resourceUrl");

const getRandomColor = () => {
  return getRandomColorCode();
};
const dataInit = () => {
  api.mangaApi.GetById(mangaId.value).then((res) => {
    if (res.isSuccess) {
      console.log("获取漫画信息：", res.data);
      mangaEntity.value = res.data;
    }
  });
};
const handleRead = () => {
  router.push("/manga/" + mangaId.value);
};
const handleDelete = () => {
  api.mangaApi.DeleteById(mangaEntity.value.id).then((res) => {
    if (res.isSuccess) {
      // 删除成功返回首页
      router.push("/manga/management");
    }
  });
};

onMounted(async () => {
  mangaId.value = route.params.mangaId;
  dataInit();
});
</script>

<template>
  <PhCard :title="'漫画信息'">
    <div class="manga-info-wrap">
      <div style="width: 270px; height: 373px">
        <PhImage
          v-if="mangaEntity.haveCover"
          :preview="false"
          :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/cover.webp`"
        />
        <PhImage
          v-else
          :preview="false"
          :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/00001.webp`"
        />
      </div>
      <div class="manga-info">
        <div class="title">
          <div class="title-text">{{ mangaEntity.title }}</div>
          <div class="score">
            <div class="score_title">2.5分</div>
            <a-rate :value="2" disabled allow-half />
            <div class="score_title">，共57人评价</div>
          </div>
        </div>
        <div class="sub-title">
          作者：
          <a :href="''">王某某</a>，
          <a :href="''">里水平</a>
        </div>
        <div class="sub-title">
          作品：
          <a-tag :color="getRandomColor()">原神</a-tag>
          <a-tag :color="getRandomColor()">星球铁道</a-tag>
        </div>
        <div class="sub-title">
          登场角色：
          <a-tag :color="getRandomColor()">云堇</a-tag>
        </div>
        <div class="tip">
          <div class="status">
            <span class="title-2">状态：</span>
            <span>连载中</span>
          </div>
          <div class="tags">
            <span class="title-2">题材标签：</span>
            <a-tag :color="getRandomColor()">测试标签1</a-tag>
            <a-tag :color="getRandomColor()">测试标签2</a-tag>
          </div>
        </div>
        <div class="desc">
          <span v-if="mangaEntity.description">{{ mangaEntity.description }}</span>
          <span v-else>暂无简介</span>
        </div>

        <div class="action">
          <a-button @click="handleRead()" type="primary">开始阅读</a-button>
          <a-button>续看xxx</a-button>
          <a-button>编辑信息</a-button>
          <a-button @click="handleDelete" danger>删除</a-button>
        </div>
      </div>
      <PhCard>
        <a-descriptions :bordered="true">
          <a-descriptions-item :span="4" label="id - uuid">{{ mangaEntity.id }} - {{ mangaEntity.uuid }}</a-descriptions-item>
          <a-descriptions-item :span="4" label="语言">中文</a-descriptions-item>
          <a-descriptions-item :span="4" label="页数">{{ mangaEntity.pageNumber }}</a-descriptions-item>
          <a-descriptions-item :span="4" label="文件大小">{{ formatFileSize(parseInt(mangaEntity.fileSize)) }}</a-descriptions-item>
          <a-descriptions-item :span="4" label="上传时间">{{ mangaEntity.addTime }}</a-descriptions-item>
          <a-descriptions-item :span="4" label="出版时间">2024-10-16</a-descriptions-item>
        </a-descriptions>
      </PhCard>
    </div>
  </PhCard>

  <PhSpace :flex-count="1" class="other-info-wrap">
    <!--连载才使用章节-->
    <div class="left">
      <InfoChapter v-if="true" :manga-id="mangaId" style="flex: 1"/>
      <InfoRecommend/>
    </div>
    <div class="right">
      <!-- 添加漫画历史状态 -->
      <InfoAuditStatus :audit-status="mangaEntity.auditStatus" :manga-entity="mangaEntity" @audit-change="handleAuditChange" @audit-reject="handleAuditReject"/>
      <InfoComment :manga-id="mangaId"/>
    </div>
  </PhSpace>
<!--  测试信息{{mangaId}}-->
</template>

<style lang="scss" scoped>
$manga-info-tile:30px;
.manga-info-wrap{
  display: flex;

  .manga-info{
    flex: 1;
    margin: 0 30px;
    display: flex;
    flex-direction: column;

    .title{
      display: flex;
      justify-content: space-between;

      .title-text{
        font-size: $manga-info-tile;
        font-weight: bold;
      }

      .score{
        display: flex;
        align-items: center;
        margin-top: 10px;
        .score_title{
          margin: 7px 10px 0 0;
          font-size: 20px;
        }
      }
    }

    .sub-title{
      margin-top: 10px;
      color: #666666;
      font-size: 13px;

      a{
        transition: color 0.3s;
      }
      a:hover{
        color: #00AEEC;
        transition: color 0.3s;
      }
    }

    .tip{
      display: flex;
      margin-top: 20px;
      font-size: 13px;
      align-items: center;

      .tags{
        margin-left: 30px;

      }
    }
    .desc{
      font-size: 13px;
      margin-top: 10px;
      color: #666666;
    }

    .action{
      margin-top: auto; /* 这个元素将被推到最底部 */
      & > *{
        margin-right: 10px;
      }
    }
  }

  .author-info{
    //width: 240px;
  }
}
.other-info-wrap{
  display: flex;

  .left{
    flex: 1;
  }
  .right{
    width: 500px;
  }
}

.title-2{
  font-size: 13px;
  color: #999999;
}
</style>