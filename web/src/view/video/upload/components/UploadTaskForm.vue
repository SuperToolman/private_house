<script setup>

import SelectPreview from "./SelectPreview.vue";
import PhSelectTagInput from "@components/ph_inputs/common/PhSelectTagInput.vue";

const api = inject('api')
const props = defineProps({
  videos:{type:Array,default:[]},
  activeVideoIndex:{type:Number,default:-1}
})
const emits = defineEmits(['handleSelectUserChange','handleSelectAreaChange','handleOnlySubmission','handleAllSubmission','handleCancel'])

const handleSelectUser = (userEntity) => emits('handleSelectUserChange',userEntity)

const handleSelectArea = (areaEntity) => emits('handleSelectAreaChange',areaEntity)

const handleChangeTagList = (tagArray)=>{
  if(tagArray !== null && tagArray.length >0){
    props.videos[props.activeVideoIndex].tagList = tagArray
    props.videos[props.activeVideoIndex].tagString = tagArray.join(',');
    console.log(props.videos[props.activeVideoIndex])
  }
}




</script>

<template>
  <ph-card :title="'基本信息'">
    <a-form :model="videos[activeVideoIndex]"
            name="basic"
            autocomplete="off"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 16 }">
      <a-form-item label="生成ID" name="id">
        <a-input v-model:value="videos[activeVideoIndex].uuid" disabled/>
      </a-form-item>
      <a-form-item label="作者" name="userId">
        <ph-select-user-modal :user-entity="videos[activeVideoIndex].userEntity"
                              @handle-select-user="handleSelectUser"/>
      </a-form-item>
      <a-form-item label="封面" name="cover">
        <select-preview :cover="videos[activeVideoIndex].cover" :previews="videos[activeVideoIndex].previews"
                        @handle-upload-cover="(cover)=>videos[activeVideoIndex].cover = cover"
                        @handle-chose-cover="(cover) => videos[activeVideoIndex].cover = cover.cover"/>
      </a-form-item>
      <a-form-item label="标题" name="title">
        <a-input v-model:value="videos[activeVideoIndex].title"/>
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-radio-group v-model:value="videos[activeVideoIndex].type">
          <a-radio value="0">自制</a-radio>
          <a-radio value="1">转载</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="分区" name="videoArea">
        <PhSelectVideoAreaInput2
            v-if="videos[activeVideoIndex].videoAreaEntity"
            :active-area="videos[activeVideoIndex].videoAreaEntity"
            @handle-select="handleSelectArea"/>
      </a-form-item>
      <a-form-item label="标签" name="tagString">
<!--        <ph-select-video-tag-modal :tag-list="videos[activeVideoIndex].tagList" :tag-recommend-tag-list="videos[activeVideoIndex].recommendTagList" @handle-change-tag-list="handleChangeTagList"/>-->
        <PhSelectTagInput
            :is-auto-add-tag="true"
            :tag-list=videos[activeVideoIndex].tagList
            :tag-recommend-tag-list="videos[activeVideoIndex].recommendTagList"
            @handle-change-tag-list="handleChangeTagList"
        />
      </a-form-item>
      <a-form-item label="简介" name="description">
        <a-input v-model:value="videos[activeVideoIndex].desc"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-space>
          <a-button type="primary" @click="emits('handleOnlySubmission')">投稿当前</a-button>
          <a-button type="primary" @click="emits('handleAllSubmission')">投稿全部</a-button>
          <a-button type="primary" danger @click="emits('handleCancel')">取消</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </ph-card>
</template>

<style scoped>

</style>