<script setup>
import {DeleteOutlined} from "@ant-design/icons-vue";

const props = defineProps({
  contentStr:{type:String,default:''},
  isBackgroundFontVisible :{type:Boolean,default:true},
  backgroundColor:{type:String,default:'#0088cc'},
  backgroundFont:{type:String,default:''},
  isOperations:{type:Boolean,default:false},
  isBoxShadow:{type:Boolean,default:false},
})
const emits = defineEmits(["handleTagEdit","handleTagDelete"])
</script>

<template>
  <div class="tags-item" :style="{
    'box-shadow': isBoxShadow?'0 0 5px 1px #10000063':'none',
    'background-color':backgroundColor,
  }">
    <div class="item__operations" v-if="isOperations">
      <EditOutlined class="btn_edit" @click="emits('handleTagEdit',tagEntity)"/>
      <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="emits('handleTagDelete',tagEntity)">
        <DeleteOutlined class="btn_delete"/>
      </a-popconfirm>
    </div>

    <div class="item__background" v-if="isBackgroundFontVisible">
      {{ backgroundFont ? backgroundFont : contentStr }}
    </div>
    <span class="item__name">{{contentStr}}</span>
  </div>
</template>

<style scoped>
.tags-item{
  height: 80px;
  border-radius: 15px;
  padding: 15px;
  position: relative;


  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
    position: relative;
    z-index: 1;
  }
  .item__background{
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