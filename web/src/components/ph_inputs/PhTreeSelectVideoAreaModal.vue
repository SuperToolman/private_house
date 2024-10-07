<template>
  <a-tree-select
      v-model="innerValue"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="请选择视频分区"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
      tree-node-filter-prop="label"
  >
    <template #title="{ value: val, label }">
      <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
      <template v-else>{{ label }}</template>
    </template>
  </a-tree-select>
</template>

<script setup>
import {inject, onMounted, ref, watch} from 'vue';

// 定义从父组件传递的 props
const props = defineProps({
  value: {
    type: [String, Number, Array, Object], // 根据实际的 value 类型进行调整
    default: null,
  },
});

// 定义 emits 用于发出事件
const emits = defineEmits(['update:value', 'handleSelect']);

// 内部引用的 value，用于双向绑定
const innerValue = ref(props.value);

// 引用树形数据
const treeData = ref([]);

// 数据初始化函数
const dataInit = async () => {
  const response = await api.videoAreaApi.LoadAntTreeSelected();
  treeData.value = response.data;
};

// 组件挂载时加载数据
onMounted(() => {
  dataInit();
});

// 监听内部 value 变化并发出事件
watch(innerValue, (newValue) => {
  emits('update:value', newValue);
  emits('handleSelect', newValue);
});
</script>
