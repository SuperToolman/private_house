<script setup>
import piliForm from "@components/input/ph-formModal.vue"
import {inject, onMounted, ref} from "vue";
import VideoAreaTreeSelect from "@components/ph_inputs/PhTreeSelectVideoAreaModal.vue";
import UserModal from "@components/ph_inputs/PhSelectUserModal.vue";
import FormTools from "@components/input/ph-formTools.vue";
const api = inject('api')
const formState = ref({
  videoFile:'',
  coverFile:'',
  durationBySecond:0,
  userId:'',
  videoAreaId:'',
  title:'',
  desc:'',
})
const props = defineProps({
  title:{type:String},
  entity:{type:Object}
})
const DrawerStatus = ref(true)
//#region 表单方法
const onFinish = values => {
  // console.log('Success:', values);
  api.videoApi.SubmissionForReview(formState.value)
  // api.videoApi.FormSave
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
//#endregion
//#region 其他组件响应方法
const handleUpload = (videoEntity)=>{
  console.log('子传父',videoEntity)
  formState.value = videoEntity
}
const handleSelectUser = userEntity =>formState.value.userId = userEntity.id
const handleSelectVideoArea = areaId=>formState.value.videoAreaId = areaId
//#endregion
onMounted(()=>{
  formState.value = props.entity
})
</script>

<template>
  <pili-form :title="title" :width="'800px'">
    <template #show_modal>
      <slot>
      </slot>
    </template>

    <template #modal_body>
      <a-form :model="formState"
              :label-col="{ span: 3 }"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed">
        <form-tools/>

        <UploadVideo @handleUpload="handleUpload"/>

        <a-row>
          <a-col :span="12">
            <!--用户名-->
            <a-form-item label="用户"
                         :label-col="{span:6}"
                         name="userId"
                         :rules="[{ required: true, message: '请选择用户' }]">
              <!--<a-input v-model:value="formState.userId"/>-->
              <UserModal @handleSelectUser="handleSelectUser"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!--视频分区-->
            <a-form-item label="视频分区"
                         :label-col="{span:6}"
                         name="videoAreaId"
                         :rules="[{ required: true, message: '请选择视频分区' }]">
              <!--          <a-input v-model:value="formState.videoAreaId"/>-->
              <VideoAreaTreeSelect @handleSelect="handleSelectVideoArea"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="14">
            <!--视频标题-->
            <a-form-item label="视频标题"
                         :label-col="{span:5}"
                         name="title"
                         :rules="[{ required: true, message: '请输入视频标题' }]">
              <a-input v-model:value="formState.title"/>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <!--视频时长-->
            <a-form-item label="视频时长"
                         :label-col="{span:7}"
                         name="durationBySecond"
                         :rules="[{ required: true, message: '（选择视频后，自动带出时长）' }]">
              <a-input v-model:value="formState.durationBySecond" disabled="disabled"/>
            </a-form-item>
          </a-col>
        </a-row>


        <!--视频简介-->
        <a-form-item label="视频简介"
                     name="desc"
                     :rules="[{ required: true, message: '请输入视频简介' }]">
          <a-input v-model:value="formState.desc"/>
        </a-form-item>
      </a-form>
    </template>
  </pili-form>
</template>

