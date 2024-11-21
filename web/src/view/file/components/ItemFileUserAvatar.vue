<script setup>
const props = defineProps({
  fileInfo:{type:Object,default:null}
})

const resourceUrl = inject('resourceUrl')
</script>

<template>
  <div class="item_file_user-avatar">
    <div class="type-tag-wrap">
      <div class="type-tag">
        <a-tag color="#cd201f">头像</a-tag>
      </div>
    </div>
    <div class="cover-wrap">
      <a-image class="cover user_avatar" :src="resourceUrl + fileInfo.targetUrl">
        <template #placeholder>
          <a-image class="cover user_avatar" :src="resourceUrl + fileInfo.targetUrl" :preview="false"/>
        </template>
      </a-image>
    </div>
    <p class="title">{{ fileInfo.name }}</p>
  </div>
</template>

<style scoped>
.item_file_user-avatar{
  display: flex;
  flex-direction: column;
  align-items: center;
  .cover-wrap{
    border-radius: 50%;
    overflow: hidden;
    height: 70px;
    width: 70px;
  }
}

.title{
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
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