<script setup>
import {inject, onBeforeMount, onMounted, ref} from 'vue';
import CollapsePanel from "@view/video/area/components/collapse-panel.vue";
import Form from './components/form.vue'

const api = inject('api')
const formOpenStatus = ref(false)
const formTitle = ref('')
const formColumnKey = ref('')
const collapseData = ref([])
const activeKey = ref([]);

const changeActivekey = key => {
  console.log(key);
};
const handleOpen = (openStatus,reload)=>{
  formOpenStatus.value = openStatus
  if (reload){
    dataInit()
  }
}
const Add = ()=>{
  formOpenStatus.value = true
  formTitle.value = '添加分区'
  formColumnKey.value = ''
}
const Edite = (id)=>{
  formOpenStatus.value = true
  formTitle.value = '编辑分区'
  formColumnKey.value = id
}
const Delete = (id)=>{
  api.videoAreaApi.DeleteById(id);
  dataInit()
}

const dataInit = async () =>{
  collapseData.value = (await api.videoAreaApi.GetByTree()).data
}

onBeforeMount(()=>{
  dataInit()
})
</script>

<template>
  <!--头部-->
  <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="'视频分区管理'"
                 :sub-title="'管理和查看视频的分区信息信息'" @back="() => null">
    <template #extra>
      <a-button type="primary" @click="Add">添加</a-button>
    </template>
  </a-page-header>

  <!--内容-->
  <div class="content">
    <div class="left">
      <collapse-panel @handelEdit="Edite" @handelDelete="Delete" :chides="collapseData"/>
    </div>
    <div class="right">
      <a-card>
        测试
      </a-card>
    </div>
  </div>



  <!--form表单-->
  <a-modal v-model:open="formOpenStatus" width="500px" :title="formTitle">
    <template #footer>
    </template>
    <Form @handleOpen="handleOpen" :treeData="collapseData" :keyValue="formColumnKey"/>
  </a-modal>
</template>

<style scoped>
.content .left{
  flex-grow: 1;
}
.content .right{
  min-width: 620px;
}
</style>
