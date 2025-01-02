<script setup>
// 定义 props
const props = defineProps({
  gap: {
    type: String,
    default: '10px' // 默认间距值
  },
  flexCount: {
    type: Number,
    default: 0 // 默认的 flex 索引（从 1 开始计数）
  }
});

const phSpace = ref(null);

onMounted(() => {
  const children = phSpace.value?.children;
  if (children) {
    if (props.flexCount === 0) {
      // 如果 flexCount 为 0，所有子元素设置 flex: 1
      Array.from(children).forEach(child => {
        child.style.flex = '1';
      });
    } else {
      // 否则，根据 flexCount 设置指定子元素为 flex: 1
      const targetIndex = props.flexCount - 1; // 将 flexCount 转为索引
      Array.from(children).forEach((child, index) => {
        if (index === targetIndex) {
          child.style.flex = '1';
        } else {
          child.style.flex = 'initial'; // 确保其他子元素恢复默认
        }
      });
    }
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
