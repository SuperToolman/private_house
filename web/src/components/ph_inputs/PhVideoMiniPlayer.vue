<script setup>
import { ref } from 'vue';

const props = defineProps({
  videoUrl: { type: String, default: '' },
  videoTitle: { type: String, default: '' },
});

const open = ref(false);

const showModal = () => {
  open.value = true;
  console.log('播放视频？');
};
const handleClose =()=>{
  console.log(open.value)
}
</script>

<template>
  <div style="height: 100%;width: 100%" @click="showModal">
    <slot name="trigger"></slot>
  </div>


  <a-modal v-if="open" v-model:open="open" :title="videoTitle" :width="'60%'" onclose="handleClose">
    <video style="width: 100%" :src="videoUrl" controls></video>
    <template #footer></template>
  </a-modal>
</template>

<style scoped>
</style>
