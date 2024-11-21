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
  <ph-card title="审核设置">
    <a-checkbox-group>
      <a-checkbox>视频审核</a-checkbox>
      <a-checkbox>视频差分审核</a-checkbox>
      <a-checkbox>视频集合审核</a-checkbox>
      <a-checkbox>漫画审核</a-checkbox>
      <a-checkbox>电影审核</a-checkbox>
      <a-checkbox>剧集审核</a-checkbox>
    </a-checkbox-group>
  </ph-card>
</template>

<style scoped>

</style>