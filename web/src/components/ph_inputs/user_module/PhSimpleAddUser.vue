<script setup>
const api = inject('api')
const emits = defineEmits(['handleAddResult'])
const props = defineProps({
  title:{type:String,default:'简单添加用户'}
})
const showInput = ref(false)
const inputValue = ref('')
const handleSubmit = ()=>{
  api.userApi.AddBySimple(inputValue.value).then(res=>{
    if (res.isSuccess){
      emits('handleAddResult',res.data)
      showInput.value = false
    }
  })
}
const handleShowInput = ()=>{
  inputValue.value = ''
  showInput.value = true
}

const handleCancel = ()=>{showInput.value = false;inputValue.value = ''}
</script>

<template>
  <PhSpace v-if="showInput" class="input-wrap" :flex-count="1">
    <a-input v-model:value="inputValue" placeholder="请输入用户名" style="width: 20px"></a-input>
    <a-tooltip :title="'添加'">
      <a-button @click="handleSubmit" type="primary"><UserAddOutlined /></a-button>
    </a-tooltip>
    <a-tooltip :title="'取消'">
      <a-button @click="handleCancel" danger><UserDeleteOutlined /></a-button>
    </a-tooltip>
  </PhSpace>
  <a-button v-else @click="handleShowInput" type="primary">{{ title }}</a-button>
</template>

<style scoped>
.input-wrap{
  display: flex;
  width: 250px;
}
</style>