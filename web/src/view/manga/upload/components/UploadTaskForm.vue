<script setup>
const props = defineProps({
  mangaEntity: { type: Object, default: null }
});
const handleSubmit = () => {
  console.log('提交', props.mangaEntity);
};
const handleSelectUser = (users, ids) => {
  props.mangaEntity.authors = users;
  props.mangaEntity.authorIds = ids;
  console.log('选择作者', users, ids);
};

const handleChangeTagList = (tagArray) => {
  if (tagArray !== null && tagArray.length > 0) {
    props.mangaEntity.tagList = tagArray;
    props.mangaEntity.tagString = tagArray.join(',');
    console.log('以更新标签', props.mangaEntity);
  }
};
</script>

<template>
  <PhCard v-if="mangaEntity">
    <a-form :model="mangaEntity" :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="UUID" name="uuid">
        <a-input v-model:value="mangaEntity.uuid" :disabled="true" />
      </a-form-item>
      <a-form-item label="标题" name="title">
        <a-input v-model:value="mangaEntity.title" />
      </a-form-item>

      <a-form-item label="作者" name="authorIds">
        <a-checkbox v-model:checked="mangaEntity.userAutomaticRegistration"><span>自动添加作者</span></a-checkbox>
        <PhMultipleSelectUserModal v-if="!mangaEntity.userAutomaticRegistration" :users="mangaEntity.authors" @handle-select-users="handleSelectUser" />
      </a-form-item>

      <a-form-item label="语言" name="language">
        <a-select v-model:value="mangaEntity.language" @focus="focus">
          <a-select-option value="0">中文</a-select-option>
          <a-select-option value="1">英文</a-select-option>
          <a-select-option value="2">日文</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标签" name="tagString">
        <ph-select-video-tag-modal :tag-list="mangaEntity.tagList" :tag-recommend-tag-list="mangaEntity.recommendTagList" @handle-change-tag-list="handleChangeTagList" />
      </a-form-item>

      <a-form-item label="文件大小" name="fileSize">
        <a-input v-model:value="mangaEntity.fileSize" :disabled="true" />
      </a-form-item>
      <a-form-item label="页数" name="pageNumber">
        <a-input v-model:value="mangaEntity.pageNumber" :disabled="true" />
      </a-form-item>
    </a-form>

    <a-button type="primary" @click="handleSubmit">提交</a-button>
  </PhCard>
</template>

<style scoped>

</style>