<script setup>
import { defineProps, onMounted, ref } from 'vue';

// 定义 props
const props = defineProps({
  gap: {
    type: String,
    default: '10px' // 默认间距值
  }
});

const phSpace = ref(null);

onMounted(() => {
  // 确保第一个子元素的 flex 值为 1
  const firstChild = phSpace.value?.firstElementChild;
  if (firstChild) {
    firstChild.style.flex = '1';
  }
});
</script>

<template>
  <div class="ph-space" ref="phSpace" :style="{ gap: props.gap }">
    <slot></slot>
  </div>
</template>

<style scoped>
.ph-space {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
