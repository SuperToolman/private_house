<script setup>
const api = inject('api')
const props = defineProps({
  tagList:{type:Array},
  tagRecommendTagList:{type:Array,default:[]},
  isAutoAddTag:{type:Boolean,default:false}
})
const emits = defineEmits(['handleChangeTagList'])
const autoValue = ref('')// 自动完成组件
const autoOptions = ref([]);
const handleKeyDownEnter = (event)=>{
  // 即使你不触发Enter键，auto-complete也会自动添加数据进入数组
  if (event.key === 'Enter') {
    if (props.tagList.length < 10){
      if (props.tagList.indexOf(autoValue.value) === -1 && autoValue.value){
        props.tagList.push(autoValue.value)
        console.log('添加了输入标签',autoValue.value,props.tagList)
      }
    }

    // 当autoOptions仅为一个数据时尝试添加标签
    console.log()
    if(props.isAutoAddTag && autoValue.value && autoOptions.value.length === 1){
      console.log('触发自动添加标签')
      api.systemTagApi.AddByName(autoValue.value)
    }
    autoValue.value = '';
    autoOptions.value = [];
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
  if (props.tagList){
    return props.tagList.includes(tag);
  }
  return false
}
const onSearch = async (searchText) => {
  // console.log(searchText); // 输出用户输入的内容
  // 如果输入为空，直接清空建议
  if (!searchText) {
    autoOptions.value = [];
    return;
  }

  try {
    const res = await api.systemTagApi.SearchByName(searchText);
    // 将接口返回的数据转换为组件要求的格式
    autoOptions.value = (res.data || [searchText]).map(item => ({ value: item.name }));
    if (!autoOptions.value.some(item=>item.value === searchText)){
      autoOptions.value.unshift({value:searchText})
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    autoOptions.value = [];
  }
};
const onSelect = value => {
  // 将选中的建议加入 tagList
  if (props.tagList.indexOf(value) === -1) {
    props.tagList.push(value);
  }
};
//应该根据视频来分析标签的，这次就随便弄吧
watch(props.tagList,()=>{
  // console.log('handleChangeTagList',props.tagList)
  emits('handleChangeTagList',props.tagList)
})

onMounted(()=>{
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
<!--          <input  class="input-val" >-->
          <a-auto-complete
              :bordered="false"
              class="input-val"
              @keydown="handleKeyDownEnter"
              data-v-4f2d07f8=""
              type="text" maxlength="20"
              placeholder="按回车键Enter创建标签"
              v-model:value="autoValue"
              :options="autoOptions"
              style="width: 200px"
              @select="onSelect"
              @search="onSearch"
          />
        </div>
        <p v-if="tagList" class="tag-last-wrp"> 还可以添加{{10 - tagList.length}}个标签 </p>
      </div>

    </div>
    <div class="tag-recommend">
      <div :class="{'label-item-v1-container':true,'active':isTagActive(tag.name)}" v-for="tag in tagRecommendTagList" :key="tag" @click="handleChoseRecommend(tag.name)">
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