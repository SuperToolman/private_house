<script setup>
import CollapsePanel from "@view/video/area/components/CollapsePanel.vue";
import Form from './components/Form.vue'

const api = inject('api')
const formOpenStatus = ref(false)
const formTitle = ref('')
const formEntity = ref(null)
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
  formEntity.value = {id:'', name: "", desc:'',}
}
const Edite = (entity)=>{
  formOpenStatus.value = true
  formTitle.value = '编辑分区'
  formEntity.value = entity
}
const Delete = (id)=>{
  api.videoAreaApi.DeleteById(id).then(res=>{
    if (res.isSuccess){
      dataInit()
    }
  });
}

const dataInit = async () =>{
  collapseData.value = (await api.videoAreaApi.GetByTree()).data
}

onBeforeMount(()=>{
  dataInit()
})
</script>

<template>
  <PhViewLayout :title="'视频分区管理'" :sub-title="'管理和查看视频的分区信息信息'">
    <!--头部-->
    <template #view-tool>
      <a-button type="primary" @click="Add">添加</a-button>
    </template>
    <!--内容-->
    <PhSpace :flex-count="1" class="content">
      <PhCard class="left">
        <CollapsePanel @handelEdit="Edite" @handelDelete="Delete" :chides="collapseData"/>
      </PhCard>

      <PhCard class="right">
        测试
      </PhCard>
    </PhSpace>
  </PhViewLayout>




  <!--form表单-->
  <a-modal v-model:open="formOpenStatus" width="500px" :title="formTitle">
    <template #footer>
    </template>
    <Form @handleOpen="handleOpen" :treeData="collapseData" :entity="formEntity"/>
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
