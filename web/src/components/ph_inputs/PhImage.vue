<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: {type: String, default: ''},
  alt: {type: String, default: ''},
  fit: {type: String, default: 'cover'}, // 默认填充方式
  display: {
    type: String,
    default: 'original', // 默认接受所有文件类型
    validator(value) {
      return ['square', 'high', 'long', 'original'].includes(value);
    },
  },
});

const imageStyle = ref({});
const containerStyle = ref({});
const placeholder = ref('./assets/img/common/transparent-placeholder.png'); // 透明占位符

// 用于计算图片的长宽比
const calculateAspectRatio = (img) => {
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  if (props.display === 'original') {
    if (width > height) {
      // 宽大于高
      imageStyle.value = {objectFit: 'cover', objectPosition: 'center center'};
      containerStyle.value = {width: '100%', height: 'auto'}; // 高度自适应，宽度保持100%
    } else {
      // 高大于宽
      imageStyle.value = {objectFit: 'cover', objectPosition: 'center center'};
      containerStyle.value = {width: '100%', height: 'auto'}; // 高度自适应，宽度保持100%
    }
  } else if (props.display === 'square') {
    // 正方形显示
    imageStyle.value = {objectFit: 'cover', objectPosition: 'center center'};
    containerStyle.value = {width: '70px', height: '70px'}; // 固定尺寸
  }
};

// 计算图片容器和样式的尺寸
onMounted(() => {
  const img = new Image();
  img.src = props.src;
  img.onload = () => calculateAspectRatio(img); // 计算图片比例和容器大小
});
</script>

<template>
  <div class="image-wrap" :style="containerStyle">
    <!-- 懒加载图片：v-lazy已经在main.js配置，所以组件内不需要引入 -->
    <img
        v-lazy="src"
        :alt="alt"
        :style="imageStyle"
        :src="placeholder"
        :width="containerStyle.width"
        :height="containerStyle.height"
    />
  </div>
</template>

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
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
}
</style>
