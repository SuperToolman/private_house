<script setup>

import InfoComment from "@view/manga/info/components/InfoComment.vue";
import InfoChapter from "@view/manga/info/components/InfoChapter.vue";
import InfoRecommend from "@view/manga/info/components/InfoRecommend.vue";

const route = useRoute()
const mangaId = ref('')
const mangaEntity = ref(null)

const getRandomColor = () => {return getRandomColorCode();}

onMounted(()=>{
  mangaId.value = route.params.mangaId
})

</script>

<template>
  <PhCard :title="'漫画信息'">
    <div class="manga-info-wrap">
      <PhImage :src="'/src/assets/test.jpg'"/>
      <div class="manga-info">
        <div class="title">
          <div class="title-text">测试标题</div>
          <div class="score">
            <div class="score_title">2.5分</div>
            <a-rate :value="2" disabled allow-half/>
            <div class="score_title">，共57人评价</div>
          </div>
        </div>
        <div class="sub-title">作者：
          <a :href="''">王某某</a>，
          <a :href="''">里水平</a>
        </div>
        <div class="sub-title">作品：
          <a-tag :color="getRandomColor()">原神</a-tag>
          <a-tag :color="getRandomColor()">星球铁道</a-tag>
        </div>
        <div class="sub-title">登场角色：
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
          现身为卑微家奴的罗征，本身家中大少爷，因家族败落，妹妹被强大势力囚禁，无奈只得听命于人。可是天无绝人之路，父亲留给他的古书中竟然暗藏炼器神法，可将人炼制成器！而隐藏在这背后的神秘力量到底是什么？这是一场与命运的较量。
        </div>

        <div class="action">
          <a-button>开始阅读</a-button>
          <a-button>续看xxx</a-button>
          <a-button>编辑信息</a-button>
          <a-button>删除</a-button>
        </div>
      </div>
      <PhCard>
        <a-descriptions :bordered="true">
          <a-descriptions-item :span="4" label="语言">中文</a-descriptions-item>
          <a-descriptions-item :span="4" label="页数">314</a-descriptions-item>
          <a-descriptions-item :span="4" label="文件大小">24Mb</a-descriptions-item>
          <!--          <a-descriptions-item label="章节数">XX</a-descriptions-item>-->
          <a-descriptions-item :span="4" label="上传时间">2024-10-16</a-descriptions-item>
          <a-descriptions-item :span="4" label="出版时间">2024-10-16</a-descriptions-item>
        </a-descriptions>
      </PhCard>
    </div>
  </PhCard>
  <div class="other-info-wrap">
<!--连载才使用章节-->
    <div class="left">
      <InfoChapter v-if="true" :manga-id="mangaId" style="flex: 1"/>
      <InfoRecommend/>
    </div>
    <div class="right">
      <InfoComment :manga-id="mangaId"/>
    </div>
  </div>
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