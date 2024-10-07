<script setup>
import {reactive} from "vue";
import {api} from "@request/mangement";
import PhCard from "@components/ph_inputs/PhCard.vue";
let formState = reactive({
  id: '',
  name: '',
  parentID: '',
  routerPath: '',
  routerComponentPath: '',
  iconName: '',
  description: ''
});

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
</script>

<template>
  <ph-card>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 15 }"
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
  </ph-card>
</template>

<style scoped>

</style>