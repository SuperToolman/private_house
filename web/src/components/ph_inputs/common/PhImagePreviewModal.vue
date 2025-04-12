<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
});

const scale = ref(1);
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const flipX = ref(false);
const flipY = ref(false);
const isPreviewVisible = defineModel('visible');
const handleClosePreview = () => {
  isPreviewVisible.value = false;
};

const imageStyle = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})` +
      ` rotate(${flipX.value ? 180 : 0}deg) ` +
      `scaleY(${flipY.value ? -1 : 1})`,
  cursor: isDragging.value ? 'grabbing' : 'grab',
}));

const handleWheel = (event) => {
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  scale.value = Math.max(0.5, Math.min(5, scale.value + delta));
  event.preventDefault(); // 阻止默认滚动行为
};

// 事件监听器的挂载与销毁
onMounted(() => {
  // 手动添加事件监听器，设置 passive: false
  window.addEventListener('wheel', handleWheel, { passive: false });

  // 手动添加 drag 事件监听器，并设置 passive: false
  window.addEventListener('mousedown', startDrag, { passive: false });
  window.addEventListener('mousemove', dragImage, { passive: false });
  window.addEventListener('mouseup', endDrag, { passive: false });
});

onBeforeUnmount(() => {
  // 移除事件监听器
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('mousedown', startDrag);
  window.removeEventListener('mousemove', dragImage);
  window.removeEventListener('mouseup', endDrag);
});

const startDrag = (event) => {
  event.preventDefault(); // 阻止默认行为，防止页面选中文本
  isDragging.value = true;
  dragStart.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  };
};

const dragImage = (event) => {
  if (!isDragging.value) return;
  position.value = {
    x: event.clientX - dragStart.value.x,
    y: event.clientY - dragStart.value.y,
  };
};

const endDrag = () => {
  isDragging.value = false;
};

const flipHorizontal = () => {
  flipX.value = !flipX.value;
};

const flipVertical = () => {
  flipY.value = !flipY.value;
};
</script>

<template>
  <div class="modal-overlay" @click.self="handleClosePreview">
    <div class="modal-content">
      <div class="modal-controls">
        <button @click="handleClosePreview">×</button>
        {{ isPreviewVisible }}
      </div>
      <div
          class="image-container"
          @mousedown="startDrag"
          @mousemove="dragImage"
          @mouseup="endDrag"
          @mouseleave="endDrag"
      >
        <PhImage
            :src="src"
            class="preview-image"
            :style="imageStyle"
            @dragstart.prevent
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
}

.modal-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.modal-controls button {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
}

.modal-controls button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.image-container {
  position: relative;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease;
  user-select: none;
}
</style>