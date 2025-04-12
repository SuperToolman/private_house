<script setup>
const props = defineProps({
  mangaEntity: { type: Object, default: null },
  width: { type: Number },
  height: { type: Number }
});
const resourceUrl = inject('resourceUrl');
const getRandomColor = () => { return getRandomColorCode(); };
const loading = ref(true);
const tagList = ref([]);

onMounted(() => {
  if (props.mangaEntity.tagString) {
    tagList.value = props.mangaEntity.tagString.split(',');
  }
});

// 获取审核状态文本
const getAuditStatusText = (status) => {
  switch (status) {
    case 0: return '草稿'; // Draft
    case 1: return '审核中'; // Have
    case 2: return '审核通过'; // Adopt
    case 3: return '审核驳回'; // Reject
    default: return '未知状态';
  }
};

// 获取审核状态对应的 CSS 类
const getAuditStatusClass = (status) => {
  switch (status) {
    case 0: return 'status-draft'; // Draft
    case 1: return 'status-have'; // Have
    case 2: return 'status-adopt'; // Adopt
    case 3: return 'status-reject'; // Reject
    default: return '';
  }
};
</script>

<template>
  <PhCard class="manga_card_wrap" :style="{
    'padding': 0,
    'width': `${width}px`,
    'height': `${height}px`
  }">
    <div class="cover">
      <div style="width: 100%; height: 100%; position: relative;">
        <PhImage v-if="mangaEntity.haveCover" :preview="false" :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/cover.webp`" />
        <PhImage v-else :preview="false" :src="`${resourceUrl}/${mangaEntity.savePath}/${mangaEntity.uuid}/00001.webp`" />
      </div>
      <div class="info-overlay">
        <div class="info-wrap">
          <div class="audit-status" :class="getAuditStatusClass(mangaEntity.auditStatus)">
            {{ getAuditStatusText(mangaEntity.auditStatus) }}
          </div>
          <div class="title-overlay">
            <a :href="`/manga/info/${mangaEntity.id}`">
              <ReadOutlined style="margin-right: 5px" /> {{ mangaEntity.title }}
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
              {{ tag }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      {{ mangaEntity.title }}
    </div>
  </PhCard>
</template>

<style scoped>
.manga_card_wrap {
  position: relative;
  width: 100%; /* 确保卡片铺满容器 */
  height: 100%; /* 确保卡片铺满容器 */
  overflow: hidden; /* 防止内容溢出 */
  flex: 1; /* 确保多个卡片均匀分布 */
  margin: 8px; /* 添加间距 */
}

.cover {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.title {
  font-weight: bold;
  transition: 0.3s;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0));
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 5px;
}

.info-overlay {
  position: absolute;
  padding: 8px;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  transition: right 0.3s ease;
  z-index: 999;
}

.manga_card_wrap:hover .cover .info-overlay {
  right: 0;
}

.manga_card_wrap:hover .title {
  display: none;
  transition: 0.3s;
}

.info-wrap {
  .title-overlay {
    font-weight: bold;
    a {
      color: white;
      &:hover {
        color: #00AEEC;
      }
    }
  }

  .author-wrap {
    margin-top: 10px;
    .author-name {
      font-size: 10px;
    }
  }

  .audit-status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 8px;
    display: inline-block;
  }

  .status-draft {
    background-color: #f0ad4e; /* 草稿状态 - 橙色 */
    color: white;
  }

  .status-have {
    background-color: #5bc0de; /* 审核中状态 - 蓝色 */
    color: white;
  }

  .status-adopt {
    background-color: #5cb85c; /* 审核通过状态 - 绿色 */
    color: white;
  }

  .status-reject {
    background-color: #d9534f; /* 审核驳回状态 - 红色 */
    color: white;
  }
}
</style>