<script setup>
import {inject, onMounted, ref, watch} from "vue";
import {CloseOutlined} from '@ant-design/icons-vue'

const api = inject('api')
const props = defineProps({
  tagList:{type:Array},
})
const emits = defineEmits(['handleChangeTagList'])
const recommendTagList = ref([])
const handleKeyDownEnter = (event)=>{
  if (event.key === 'Enter') {
    if (props.tagList.length < 10){
      const inputTag = document.querySelector(".input-val").value
      if (props.tagList.indexOf(inputTag) === -1 && inputTag !== '')
        props.tagList.push(inputTag)
    }
    document.querySelector(".input-val").value = '';
  }
}
const handleDeleteTag = (tag)=>{
  const index = props.tagList.indexOf(tag);
  props.tagList.splice(index,1)
}
const handleChoseRecommend = (tag)=>{
  if (props.tagList.indexOf(tag) === -1){
    props.tagList.push(tag)
    return true
  }
  return false
}
const isTagActive = (tag)=>{
  return props.tagList.includes(tag);
}

watch(props.tagList,()=>{
  emits('handleChangeTagList',props.tagList)
})

onMounted(()=>{
  api.videoTagApi.Get().then(res=>{
    recommendTagList.value = res.data
  })
})
</script>



<template>
  <div class="tag-container">
    <div class="tag-input-wrap">
      <div class="input-container">
        <div class="tag-pre-wrp">
          <div class="label-item-v2-container" v-for="tag in tagList" :key="tag">
            <div class="label-item-v2-content">{{ tag }}</div>
            <CloseOutlined style="margin-left: 4px;font-size: 8px" @click="handleDeleteTag(tag)"/>
          </div>
        </div>
        <div class="input-instance">
          <input data-v-4f2d07f8="" type="text" maxlength="20" placeholder="按回车键Enter创建标签" class="input-val" @keydown="handleKeyDownEnter">
        </div>
        <p data-v-4f2d07f8="" class="tag-last-wrp"> 还可以添加{{10 - tagList.length}}个标签 </p>
      </div>

    </div>
    <div class="tag-recommend">
      <div :class="{'label-item-v1-container':true,'active':isTagActive(tag.name)}" v-for="tag in recommendTagList" :key="tag" @click="handleChoseRecommend(tag.name)">
        <div class="label-item-v2-content">{{ tag.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-container{
  .tag-input-wrap{
    .input-container{
      background: hsla(0, 0%, 84.7%, 0);
      border: 1px solid #ccd0d7;
      border-radius: 4px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      transition: border .3s ease;
      .tag-pre-wrp{
        display: flex;
        flex-wrap: wrap;

      }
      .input-instance{
        flex: 1;
        min-width: 200px;
        margin: 6px 0;
        input{
          display: block;
          width: 100%;
          color: #222;
          line-height: 22px;
          height: 22px;
          font-size: 14px;
          outline: 0;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: 0;
          background-color: transparent;
        }
      }
      .tag-last-wrp{
        font-size: 14px;
        color: #858585;
        margin: 8px 0 8px 12px;
        cursor: default;
      }
    }
  }
  .tag-recommend{
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }
}

.label-item-v2-container{
  background: #00a1d6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 9px 0 11px;
  cursor: pointer;
  color: #fff;
  font-size: 12px;

  margin: 4px 6px 4px 0;
}

.label-item-v1-container{
  background: #F6F6F6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 9px 0 11px;
  cursor: pointer;
  color: #000;
  font-size: 12px;
  transition: 0.3s;

  margin: 4px 6px 4px 0;
}.active{
   background: #00a1d6;
   color: #fff;
  transition: 0.3s;
 }


</style>