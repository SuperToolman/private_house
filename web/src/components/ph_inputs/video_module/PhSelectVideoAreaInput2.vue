<template>
  <a-input
      ref="inputRef"
      @click="handleShowModel"
      @input="showModel = true"
      :value="choseAreaText"
  />
  <div class="area-list-wrap" ref="dropdownRef" :style="{'display': showModel ? 'flex' : 'none'}">
    <div class="area-list-parent" v-if="treeData && treeData.length">
      <div
          :class="{'drop-f-item': true,'drop-f-item-selected': choseArea.parent === parent}"
          v-for="parent in treeData"
          :key="parent.id"
          @click="handleChoseParent(parent)"
      >
        {{ parent.label }}
      </div>
    </div>
    <div v-if="choseArea.parent" class="area-list-child">
      <div v-if="choseArea.parent.children">
        <div :class="{'drop-t-item': true,'drop-t-item-select': choseArea.child === child}"
             v-for="child in choseArea.parent.children"
             :key="child.id"
             @click="handleChoseChild(child)"
        >
          <div class="item-main">{{ child.label }}</div>
        </div>
      </div>
      <div v-else class="drop-t-item">无子分区</div>
    </div>
    <div v-else class="area-list-child">什么几把？？？</div>
  </div>
</template>

<script setup>
import {inject, onMounted, ref, onBeforeUnmount, watch} from 'vue';
const props = defineProps({
  choseArea:{type:Object,default:{parent:null,child:null}}
})
const emits = defineEmits(['handleSelect']);
const api = inject('api');
const treeData = ref([]);
const showModel = ref(false);
const choseAreaText = ref('')
const inputRef = ref(null);
const dropdownRef = ref(null);

const handleWriteAreaText = (area)=>{
  if (area.children !== null && area.children.length >0){
    choseAreaText.value += area.label + " → ";
  }else{
    const haveIndex = choseAreaText.value.indexOf('→')
    if (haveIndex !== -1){
      choseAreaText.value = choseAreaText.value.substring(0,haveIndex+2) + area.label
    }else{
      choseAreaText.value += area.label
    }
  }
}
const handleChoseParent = (parent)=>{
  choseAreaText.value = ''
  props.choseArea.parent = parent
  handleWriteAreaText(parent)
}
const handleChoseChild = (child) =>{
  props.choseArea.child = child
  handleWriteAreaText(child)
  emits('handleSelect',props.choseArea)
}
const handleShowModel = ()=>{
  showModel.value = true
}
onMounted(async () => {
  const res = await api.videoAreaApi.LoadAntTreeSelected()
  console.log(res)
  treeData.value = res.data

  watch(props.choseArea, () => {
    console.log('监听到props的变动',props.choseArea)
    if (props.choseArea.child) {
      handleChoseParent(props.choseArea.parent)
      handleChoseChild(props.choseArea.child)
    } else {
      console.log('推荐初始化')
      handleChoseParent(treeData.value[0])
      handleChoseChild(treeData.value[0].children[0])
    }
  }, {immediate: true})
})

// 点击外部区域时关闭弹窗
const handleClickOutside = (event) => {
  const isClickInsideInput = inputRef.value?.$el?.contains(event.target);
  const isClickInsideDropdown = dropdownRef.value?.contains(event.target);

  if (!isClickInsideInput && !isClickInsideDropdown) {
    showModel.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.area-list-wrap {
  top: 46px;
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  position: absolute;
  left: 0;
  z-index: 10;
  display: flex;
}

.area-list-parent {
  padding: 12px 0;
  width: 128px;
  height: 239px;
  overflow-x: hidden;
  overflow-y: auto;
}

.drop-f-item {
  padding: 12px 24px;
  width: 128px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
}

.drop-f-item-selected {
  color: #00a1d6;
}

.drop-f-item:hover {
  background-color: #f4f5f7;
  transition: 0.2s;
}

.area-list-child {
  border-left: 1px solid #e5e9ef;
  padding: 12px 0;
  min-width: 128px;
  height: 239px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: 0.2s;
}

.drop-t-item {
  padding: 10px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 128px;

  &:hover{
    background-color: #f4f5f7;
    transition: 0.2s;
  }

}

.drop-t-item-select {
  color: #00a1d6;
}
</style>