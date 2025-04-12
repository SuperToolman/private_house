<script setup>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  tagEntity: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(["handleTagEdit", "handleTagDelete", "openTagDetail"]);
</script>

<template>
  <div class="tags-item" :style="{
    'box-shadow': '0 0 5px 1px #10000063',
    'background-color': '#0088cc',
  }" @click="emits('openTagDetail', tagEntity)">
    <div class="item__operations">
      <EditOutlined class="btn_edit" @click.stop="emits('handleTagEdit', tagEntity)" />
      <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="emits('handleTagDelete', tagEntity)">
        <DeleteOutlined class="btn_delete" />
      </a-popconfirm>
    </div>

    <div class="item__background">
      {{ tagEntity.name }}
    </div>
    <span class="item__name">{{ tagEntity.name }}</span>
  </div>
</template>

<style scoped>
.tags-item {
  height: 80px;
  border-radius: 15px;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .btn_delete {
    position: absolute;
    right: 10px;
    top: 6px;
    color: #5b5b5b;
    background-color: rgba(255, 255, 255, 0.57);
    border-radius: 30%;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
  .btn_edit {
    position: absolute;
    right: 30px;
    top: 6px;
    color: #5b5b5b;
    background-color: rgba(255, 255, 255, 0.57);
    border-radius: 30%;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  .item__name {
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    position: relative;
    z-index: 1;
  }
  
  .item__background {
    font-size: 40px;
    position: absolute;
    font-weight: bold;
    bottom: 5px;
    right: 5px;
    color: rgba(0, 0, 0, 0.13);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}
</style>