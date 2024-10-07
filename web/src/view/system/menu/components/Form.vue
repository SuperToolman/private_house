<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item label="ID" name="id">
      <a-input v-model:value="formState.id" :disabled="true"/>
    </a-form-item>

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

    <a-form-item :wrapper-col="{ offset: 11, span: 3 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import PhTreeSelectSystenMenuModal from "@components/ph_inputs/PhTreeSelectSystenMenuModal.vue";
import { api } from "@request/mangement";

const props = defineProps({
  menuEntity: { type: Object }
});

let formState = reactive({
  id: '',
  name: '',
  parentID: '',
  routerPath: '',
  routerComponentPath: '',
  iconName: '',
  description: ''
});

const handleSelectedMenu = (menuValue) => {
  formState.parentID = menuValue;
};

const onFinish = (values) => {
  console.log(values);
  console.log(formState);
  if (formState.id === ""){
    //添加
    api.systemMenuApi.Add(formState).then(res => {
      if (res.isSuccess) {
        console.log('Success:', values);
      }
    });
  }else{
    //编辑
    api.systemMenuApi.Update(formState)
  }

};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const updateFormState = (entity) => {
  if (entity) {
    formState.id = entity.id || '';
    formState.name = entity.name || '';
    formState.parentID = entity.parentID || '';
    formState.routerPath = entity.routerPath || '';
    formState.routerComponentPath = entity.routerComponentPath || '';
    formState.iconName = entity.iconName || '';
    formState.description = entity.description || '';
  } else {
    // 重置表单状态
    formState.id = '';
    formState.name = '';
    formState.parentID = '';
    formState.routerPath = '';
    formState.routerComponentPath = '';
    formState.iconName = '';
    formState.description = '';
  }
};

watch(() => props.menuEntity, (newEntity) => {
  updateFormState(newEntity);
}, { immediate: true });

onMounted(() => {
  updateFormState(props.menuEntity);
});
</script>
