<script setup>
import {onMounted, reactive, ref} from "vue";
import {api} from "@request/mangement";
import PhQuestionCircleOutlined from "@components/ph_inputs/ph-QuestionCircleOutlined.vue";
import PhTable from "@components/ph_inputs/Ph-Table.vue";
import {SwapOutlined} from "@ant-design/icons-vue"
import PhCard from "@components/ph_inputs/PhCard.vue";

let formState = ref({
  url:'',
  targetFolderPath:'',
  appResources: ref({
    Temp:'',
    VideoResources:'',
    UserAvatarResources:'',
  }),
});

const onFinish = (values) => {
  api.systemConfig.UpdateConfigByNginx(formState.value)
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const initData = ()=>{
  api.systemConfig.GetConfigByNginx().then(res=>{
    formState.value = res.data
  })
}
onMounted(()=>{
  initData()
})
</script>

<template>
  <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <ph-card :title="'Nginx静态资源服务器配置'" class="setting-group">
      <div style="display: flex;align-items: center">
        <a-form-item label="资源URL根地址" name="url">
          <a-input v-model:value="formState.url"/>
        </a-form-item>
        <SwapOutlined style="margin:0 10px 24px 10px"/>
        <a-form-item label="目标目录路径" name="targetFolderPath">
          <div style="display: flex">
            <a-input v-model:value="formState.targetFolderPath" />
            <ph-question-circle-outlined :prompt-text="'nginx资源服务器的根目录（root）'"/>
          </div>
        </a-form-item>
      </div>
    </ph-card>


    <ph-card :title="'媒体库'" class="setting-group">
      <a-form-item label="视频审核池路径" name="url">
        <a-input v-model:value="formState.appResources.Temp" :addon-before="formState.url" placeholder="Nginx目标目录路径+视频审核池路径"/>
      </a-form-item>
      <a-form-item label="视频路径" name="targetFolderPath">
        <a-input v-model:value="formState.appResources.VideoResources" :addon-before="formState.url" placeholder="Nginx目标目录路径+视频路径"/>
      </a-form-item>
      <a-form-item label="用户头像路径" name="targetFolderPath">
        <a-input v-model:value="formState.appResources.UserAvatarResources" :addon-before="formState.url" placeholder="Nginx目标目录路径+用户头像路径"/>
      </a-form-item>
    </ph-card>

    <ph-card>
      <a-form-item>
        <a-button type="primary" html-type="submit">保存更改</a-button>
      </a-form-item>
    </ph-card>
  </a-form>
</template>

<style scoped>

</style>