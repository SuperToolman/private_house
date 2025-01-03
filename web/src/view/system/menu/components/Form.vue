<script setup>
const emits = defineEmits(['handleCancelModal'])
const props = defineProps({
  formState:{type:Object,default:reactive({
      name: '',
      parentID: '',
      routerPath: '',
      routerComponentPath: '',
      iconName: '',
      description: ''
    })}
})
const api = inject('api')
const handleSelectedMenu = (menuValue)=>{props.formState.parentID = menuValue;}
const onFinish = () => {
  // 判断entity是否存在id属性
  if ('id' in props.formState){
    api.systemMenuApi.Update(props.formState).then(res=>{
      emits('handleCancelModal')
    })
  }else {
    if (props.formState.parentID === '')
      props.formState.parentID = 0
    api.systemMenuApi.Add(props.formState).then(res=>{
      emits('handleCancelModal')
    })
  }
};
const onFinishFailed = (errorInfo) => {
  console.error(errorInfo)
};
</script>

<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      @submit=""
  >
    <a-form-item label="表单名称" name="name" :rules="[{ required: true, message: '请输入表单名称!' }]">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="上级菜单" name="parentID">
      <PhTreeSelectSystenMenuModal :initial-value="formState.parentID" @handleSelect="handleSelectedMenu"/>
    </a-form-item>

    <a-form-item label="路由地址" name="routerPath" :rules="[{ required: true, message: '请输入路由地址!' }]">
      <a-input v-model:value="formState.routerPath" />
    </a-form-item>

    <a-form-item label="路由组件地址" name="routerComponentPath">
      <a-input v-model:value="formState.routerComponentPath" />
    </a-form-item>

    <a-form-item label="图标名称" name="iconName">
      <a-input v-model:value="formState.iconName" />
    </a-form-item>

    <a-form-item label="描述" name="description">
      <a-input v-model:value="formState.description" />
    </a-form-item>

    <div style="display: flex; justify-content: end">
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
      <a-button @click="emits('handleCancelModal')" style="margin-left: 10px">取消</a-button>
    </div>
  </a-form>
</template>

<style scoped>

</style>