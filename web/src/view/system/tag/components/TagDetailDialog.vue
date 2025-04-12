<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import PhModal from '@components/ph_inputs/common/PhModal.vue';

const props = defineProps({
  tagEntity: {
    type: Object,
    required: true
  },
  open: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const handleEdit = () => {
  // 处理编辑逻辑
  emit('close');
};

const handleDelete = () => {
  // 处理删除逻辑
  emit('close');
};
</script>

<template>
  <PhModal :open="open" @handleCancel="emit('close')" title="标签详细信息">
    <template #content>
      <div>
        <h3>{{ tagEntity.name }}</h3>
        <p>{{ tagEntity.desc }}</p>
        <p>添加时间: {{ tagEntity.addTime }}</p>
        <p>更新时间: {{ tagEntity.updateTime }}</p>
        <div class="item__operations">
          <EditOutlined @click="handleEdit" />
          <DeleteOutlined @click="handleDelete" />
        </div>
      </div>
    </template>
  </PhModal>
</template>

<style scoped>
.item__operations {
  display: flex;
  gap: 10px;
}
</style>