<script setup>
import { ref, watch } from 'vue';

// 声明事件
const emits = defineEmits(['handleOk', 'handleCancel', 'triggerEvent']);

// 定义 props
const props = defineProps({
  title: { type: String, default: '' },
  hideButtons: { type: Boolean, default: false },
  open: { type: Boolean, default: false }, // 假设父组件传递的 open 用来控制 Modal 是否打开
});

const isModalOpen = ref(); // 使用 ref 来保存 Modal 的打开状态

// 监听 props.open 变化，保持本地状态与父组件同步
watch(() => props, (newValue) => {
  isModalOpen.value = newValue;
});

const showModal = () => {
  emits('triggerEvent'); // 触发事件
  isModalOpen.value = true; // 修改本地状态打开 Modal
};

const handleOk = () => {
  isModalOpen.value = false; // 关闭 Modal
  emits('handleOk'); // 触发 handleOk 事件
};

const handleCancel = () => {
  isModalOpen.value = false; // 关闭 Modal
  emits('handleCancel'); // 触发 handleCancel 事件
};
</script>

<template>
  <div @click="showModal">
    <slot name="trigger"></slot>
  </div>
  <div v-if="isModalOpen">
    <a-modal
        v-model:open="isModalOpen"
        :title="title">
      <slot name="content"></slot>

      <template #footer>
        <a-button v-if="!hideButtons" @click="handleOk">OK</a-button>
        <a-button v-if="!hideButtons" @click="handleCancel">Cancel</a-button>
      </template>
    </a-modal>
  </div>
</template>

<style scoped>
</style>
