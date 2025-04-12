<script setup>

const props = defineProps({
  videoUrl: { type: String, default: '' },
  videoTitle: { type: String, default: '' },
});

const open = defineModel('open');

const showModal = () => {
  open.value = true;
};

const handleClose = () => {
  open.value = false;
};
</script>

<template>
  <div style="height: 100%; width: 100%" @click="showModal">
    <slot name="trigger"></slot>
  </div>

  <a-modal v-if="open || props.open" v-model:open="open" :title="videoTitle" :width="'60%'" @close="handleClose">
    <video style="width: 100%" :src="videoUrl" controls></video>
    <template #footer></template>
  </a-modal>
</template>

<style scoped>
</style>
