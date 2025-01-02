<script setup>
const props = defineProps({
  mangaEntity:{type:Object,default:null},
  width:{type:Number},
  height:{type:Number}
})
const resourceUrl = inject('resourceUrl')
const getRandomColor = () => {return getRandomColorCode();}
const loading = ref(true)
const tagList = ref([])
onMounted(()=>{
  if (props.mangaEntity.tagString){
    tagList.value = props.mangaEntity.tagString.split(',')
  }
})
</script>

<template>
  <PhCard class="manga_card_wrap" :style="{
    'padding': 0,
    'width':`${width}px`,
    'height':`${height}px`
  }">
    <div class="cover">
      <div style="width: 240px;height: 314px">
        <PhImage v-if="mangaEntity.haveCover" :preview="false" :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/cover.webp`"/>
        <PhImage v-else :preview="false" :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/00001.webp`"/>
      </div>
      <div class="info-overlay">
        <div class="info-wrap">
          <div class="title-overlay">
            <a :href="`/manga/info/${mangaEntity.id}`">
              <ReadOutlined style="margin-right: 5px"/> {{mangaEntity.title}}
            </a>
          </div>
          <div class="author-wrap">
            <a-avatar style="margin-right: 5px">测试作者</a-avatar>
            <span class="author-name">测试作者</span>
          </div>
          <div class="tags">
            <a-tag
                style="margin-top: 10px"
                :color="getRandomColor()"
                v-for="tag in tagList"
                :key="tag">
              {{tag}}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      {{mangaEntity.title}}
    </div>


  </PhCard>
</template>

<style scoped>
.manga_card_wrap{
  position: relative;
  //width: 180px;
  //box-shadow: 0 0 0 0 #000000;

  .cover{
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative; /* 添加相对定位 */
  }

  .title{
    font-weight: bold;
    transition: 0.3s;
    position: absolute;
    bottom: 0; /* 靠底部对齐 */
    width: 100%; /* 充满整个宽度 */
    color: white;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0)); /* 渐变背景 */

    overflow: hidden;          /* 隐藏超出的内容 */
    white-space: nowrap;      /* 禁止换行 */
    text-overflow: ellipsis;  /* 超出部分以省略号表示 */
    padding: 5px;
  }

  .info-overlay {
    position: absolute;
    padding: 8px;
    top: 0;
    right: -100%; /* 初始位置在外部 */
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.7);
    color: white;

    transition: right 0.3s ease; /* 动画效果 */
    z-index: 999; /* 确保在标题之上 */
  }

  &:hover .cover .info-overlay{
    right: 0; /* 悬停时滑入 */
  }
  &:hover .title{
    display: none;
    transition: 0.3s;
  }

  .info-wrap{
    .title-overlay{
      font-weight: bold;
      a{
        color: white;
        &:hover{
          color: #00AEEC;
        }
      }
    }
    .author-wrap{
      margin-top: 10px;
      .author-name{
        font-size: 10px;
      }
    }
  }
}


</style>