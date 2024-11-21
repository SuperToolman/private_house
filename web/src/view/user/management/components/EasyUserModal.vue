<script setup>
import {v4 as uuidv4} from "uuid";
import {message} from "ant-design-vue";

const api = inject("api")
const open = ref(false)
const formState = reactive({uuid: uuidv4(), name: "", eMail: "", phone: "", password: "", birthday: new Date().toLocaleDateString('en-CA'), coin: 0, level: 1, nowExp: 0, nextExp: 0, sign: "", sex: "", identityCard: "", avatarImageUrl: '',haveAvatar:false});// 初始化表单状态
const handleSubmit = ()=>{
  formState.password = formState.name
  formState.eMail = `${formState.name}@ph.com`
  api.userApi.Add(formState).then(res=>{
    if (res.isSuccess){
      message.success(res.message)
      open.value = false
    }
  })
}
</script>


<template>
  <a-button type="primary" @click="open=true">简单添加</a-button>
  <a-modal v-bind:open="open" :title="'简单添加'">
    <div style="margin-top: 30px">
      <a-form :model="formState" :label-col="{ style: {width: '50px'} }">
        <a-form-item label="名称" name="name">
          <a-input v-model:value="formState.name"/>
        </a-form-item>
      </a-form>
    </div>

    <template #footer>
      <a-button key="back" @click="open=false">取消</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">提交</a-button>
    </template>
  </a-modal>
</template>

<style scoped>

</style>