<template>
  <a-input
      ref="inputRef"
      @click="showModel = true"
      @input="showModel = true"
      :value="choseAreaText"
  />
  <div
      class="area-list-wrap"
      ref="dropdownRef"
      :style="{
      'display': showModel ? 'flex' : 'none'
    }"
  >
    <div class="area-list-parent" v-if="treeData && treeData.length">
      <div
          :class="{
          'drop-f-item': true,
          'drop-f-item-selected': activeParent === parent
        }"
          v-for="parent in treeData"
          :key="parent.id"
          @click="handleChoseParent(parent)"
      >
        {{ parent.label }}
      </div>
    </div>
    <div v-if="activeParent && activeParent.children" class="area-list-child">
      <div
          :class="{
          'drop-t-item': true,
          'drop-t-item-select': activeChild === child
        }"
          v-for="child in activeParent.children"
          :key="child.id"
          @click="handleChoseArea(child)"
      >
        <div class="item-main">{{ child.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, ref, onBeforeUnmount, watch} from 'vue';

// 获取注入的api
const api = inject('api');

// 获取传入的props
const props = defineProps({
  activeArea:{type:Object,default:{parent:null, child:null}}
});

// 定义事件
const emits = defineEmits(['handleSelect']);

// 定义 treeData 和 activeParent 变量
const treeData = ref([]);
const choseAreaText = ref('');
const activeParent = ref(null);
const activeChild = ref(null);
const showModel = ref(false);

const inputRef = ref(null);
const dropdownRef = ref(null);

const handleChoseParent = (parent) => {
  activeParent.value = parent;
  choseAreaText.value = parent.label;
};

const handleChoseArea = (area) => {
  choseAreaText.value = choseAreaText.value.includes(' → ')
      ? `${choseAreaText.value.substring(0, choseAreaText.value.indexOf(' → '))} → ${area.label}`
      : `${choseAreaText.value} → ${area.label}`;

  activeChild.value = area;
  showModel.value = false;
  emits('handleSelect', {parent:activeParent.value, child:activeChild.value});
};

// 在组件挂载时，获取数据并设置默认的activeParent
onMounted(async () => {
  const response = await api.videoAreaApi.LoadAntTreeSelected();
  treeData.value = response.data;
  watch(props,()=>{
    if(props.activeArea.parent !== null){
      activeParent.value = props.activeArea.parent
      choseAreaText.value = activeParent.value.label;
    }else {
      handleChoseParent(treeData.value[0]); // 默认选中第一个父节点
    }

    if (props.activeArea.child !== null){
      activeChild.value = props.activeArea.child
      choseAreaText.value = choseAreaText.value.includes(' → ')
          ? `${choseAreaText.value.substring(0, choseAreaText.value.indexOf(' → '))} → ${activeChild.value.label}`
          : `${choseAreaText.value} → ${activeChild.value.label}`;
    }else{
      handleChoseArea(treeData.value[0].children[0])
    }
  },{immediate: true});//这是 watch 选项的一部分，表示在初始化时（即 watch 被设置后立即）也会执行一次回调函数。这样，formState.value 会在组件挂载时立即根据 newUser 的值进行一次初始化设置。

});

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
}

.drop-t-item-select {
  color: #00a1d6;
}

.drop-t-item:hover {
  background-color: #f4f5f7;
  transition: 0.2s;
}
</style>
