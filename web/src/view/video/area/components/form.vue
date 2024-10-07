<script setup>
import {LockOutlined, MailOutlined, ManOutlined, PhoneOutlined, RobotOutlined, UserOutlined, WomanOutlined} from "@ant-design/icons-vue";
import {inject, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {notification} from "ant-design-vue";
const emit = defineEmits(['handleOpen'])
const props = defineProps({
  showTools:{type:Boolean},
  keyValue:{type:String}
})


const api = inject('api')
const areaSelected = ref([])
let formState = ref({
  id:'',
  addTime:'',
  updateTime:'',
  name: "",
  preNodeId:'',
  desc:'',
});//定义表单的对象

onBeforeMount(()=>{
  dataInit()
  areaSelectedInit()
})
const dataInit = async ()=>{
  if (props.keyValue!==''){
    formState.value = (await api.videoAreaApi.GetById(props.keyValue)).data
  }else{
    formState.value = {
      id:'',
      addTime:'',
      updateTime:'',
      name: "",
      preNodeId:'',
      desc:'',
    }
  }
}
const areaSelectedInit = async ()=>{
  areaSelected.value = (await api.videoAreaApi.LoadSelectedData()).data
}
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
watch(props,(newValue,oldValue)=>{
  dataInit()
})

const onSubmit = () => {
  //判断编号是添加还是删除
  if (props.keyValue !== '') {
    api.videoAreaApi.Update(formState.value)
  }else{
    api.videoAreaApi.Add(formState.value)
  }
  onClose(true);//关闭抽屉
};
const onClose = (reload=false) => {
  emit("handleOpen", false,reload)
};
</script>

<template>
  <!--表单-->
  <a-form :model="formState" :label-col="{ style: {width: '70px'},}">
    <a-form-item label="分区编号" name="id">
      <a-input v-model:value="formState.id" disabled="disabled"/>
    </a-form-item>
    <a-form-item label="上级" name="preNodeId">
      <a-select
          v-model:value="formState.preNodeId"
          show-search
          placeholder="Select a person"
          style="width: 200px"
          :options="areaSelected"
          :filter-option="filterOption"
      ></a-select>
    </a-form-item>
    <a-form-item label="分区名" name="name">
      <a-input v-model:value="formState.name"/>
    </a-form-item>
    <a-form-item label="备注" name="desc">
      <a-textarea v-model:value="formState.desc" placeholder="备注"/>
    </a-form-item>
  </a-form>

  <!--工具栏-->
  <div>
    <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
    <a-button type="primary" @click="onSubmit">提交</a-button>
  </div>
</template>