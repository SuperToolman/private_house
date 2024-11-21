<template>
  <a-modal v-model:open="props.formOpenStatus"
           :width="formModalWidth"
           :title="formTitle"
           :cancel-button-props="{ disabled: true ,type:'text'}"
           :cancel-text="' '"
           :ok-button-props="{ disabled: true ,type:'text'}"
           :ok-text="' '">
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
        <a-button @click="onCancel" style="margin-left: 10px">取消</a-button>
      </div>
    </a-form>

    <template #okText>
      <span>提交</span>
    </template>
    <template #cancelText>
      <span>取消</span>
    </template>
  </a-modal>
</template>

<script setup>
const props = defineProps({
  menuEntity: { type: Object,default:null },
  formOpenStatus:{type:Boolean,default:false},
  formModalWidth:{type:Number,default:700},
  formTitle:{type:String,default:'title'}
});
const emits = defineEmits(['onFinish','onCancel'])

const formState = reactive({
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
  emits('onFinish',formState)
};
const onFinishFailed = (errorInfo) => {
  console.error(errorInfo)
};

const onCancel = ()=>{
  emits('onCancel')
}

const updateFormState = (entity) => {

  if (entity) {
    for (let key in entity) formState[key] = entity[key]
  } else {
    // 重置表单状态
    for (let key in formState) {
      if (formState.hasOwnProperty(key)) {  // 检查对象是否有此属性，避免继承属性
        formState[key] = "";  // 设置所有属性为 ""
      }
    }
  }
};

watch(() => props.menuEntity, (newEntity) => {
  updateFormState(newEntity);
}, { immediate: true });

onMounted(() => {
  updateFormState(props.menuEntity);
});
</script>
