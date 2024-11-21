<script setup>
import {DeleteOutlined} from "@ant-design/icons-vue";

const props = defineProps({
  tagEntity:{type:Object,default:null}
})
const emits = defineEmits(["handleTagEdit","handleTagDelete"])
</script>

<template>
  <div class="tags-item">
    <EditOutlined class="btn_edit" @click="emits('handleTagEdit',tagEntity)"/>
    <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="emits('handleTagDelete',tagEntity)">
      <DeleteOutlined class="btn_delete"/>
    </a-popconfirm>
    <!--        <img src="https://xxx">-->
    <div class="item__background">{{tagEntity.name}}</div>
    <span class="item__name">{{tagEntity.name}}</span>
  </div>
</template>

<style scoped>
.tags-item{
  height: 80px;
  border-radius: 15px;
  background-color: #0088cc;
  padding: 15px;
  position: relative;
  box-shadow: 0 0 5px 1px #10000063;

  .btn_delete{
    position: absolute;
    right: 10px;
    top: 6px;
    color: #5b5b5b;
    background-color: rgba(255, 255, 255, 0.57);
    border-radius: 30%;
    transition: 0.3s;
    &:hover{
      transition: 0.3s;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
  .btn_edit{
    position: absolute;
    right: 30px;
    top: 6px;
    color: #5b5b5b;
    background-color: rgba(255, 255, 255, 0.57);
    border-radius: 30%;
    transition: 0.3s;
    &:hover{
      transition: 0.3s;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  .item__name{
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    position: absolute;
    bottom: 15px;
  }
  .item__background{
    font-size: 50px;
    position: absolute;
    font-weight: bold;
    bottom: 5px;
    right: 5px;
    color: rgba(0, 0, 0, 0.13);
  }
}
</style>