<template>
  <div class="image-wrap" :style="containerStyle" @click="openPreview">
    <viewer v-if="preview">
      <img
          v-lazy="src"
          :alt="alt"
          :style="imageStyle"
          :src="placeholder"
          :width="containerStyle.width"
          :height="containerStyle.height"
          :border-radius = "containerStyle.borderRadius"
      />
    </viewer>
    <img
        v-else
        v-lazy="src"
        :alt="alt"
        :style="imageStyle"
        :src="placeholder"
        :width="containerStyle.width"
        :height="containerStyle.height"
        :border-radius = "containerStyle.borderRadius"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  preview: { type: Boolean, default: false },
  containerStyle: { type: Object, default: () => ({}) },
  placeholder: { type: String, default: './assets/img/common/transparent-placeholder.png' }
});

const imageStyle = computed(() => ({
  objectFit: 'cover', // 默认填充方式
  objectPosition: 'center center', // 默认居中
}));
const openPreview = () => {
  if (props.preview) {
    // 预览图片的打开处理逻辑
  }
};
</script>

<style scoped>
.image-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease-in-out;
}

.image-wrap:hover img {
  opacity: 0.9;
}
</style>
