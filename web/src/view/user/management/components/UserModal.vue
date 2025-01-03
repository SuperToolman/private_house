<script setup>
import dayjs from 'dayjs';
import AvatarUploader2 from "@view/user/management/components/AvatarUploader2.vue";
import {api} from "@request/mangement";
import PhSpace from "@components/ph_inputs/PhSpace.vue";
import {v4 as uuidv4} from "uuid";

// 接收 props 和 emits
const emits = defineEmits(['handleClose']);
const props = defineProps({
  drawerTitle: {type: String, default: ''},
  open: {type: Boolean, default: false},
  user: {type: Object}
});

const avatarUploaderRef = ref(null)
const avatarFile = ref(null)
const formState = ref(null);// 初始化表单状态

// 计算属性 birthday，用于日期选择器的 v-model 绑定
const birthday = computed({
  get() {
    return formState.value.birthday ? dayjs(formState.value.birthday, 'YYYY-MM-DD') : null;
  },
  set(value) {
    formState.value.birthday = value ? value.format('YYYY-MM-DD') : '';
  },
});

// 表单提交处理
const handleSubmit = async () => {
  if (avatarUploaderRef.value) {
    await avatarUploaderRef.value.sureSava();

    //提交表单
    const apiMethod = formState.value.id ? api.userApi.Update : api.userApi.Add;
    console.log(formState.value)
    apiMethod(formState.value).then(res => {
      if (res.isSuccess) {
        handleClose()
      }
    });

    //提交头像文件
    api.userApi.UploadAvatar(avatarFile.value,formState.value.uuid).then(res=>{

    })
  } else {
    console.error('子组件未正确挂载');
  }
};
const handleClose = ()=>{
  emits('handleClose', false)
}

// 监听 props.user 变化并初始化 formState
watch(() => props.user, (newUser) => {
  formState.value = newUser? {...newUser}:{uuid: uuidv4(), name: "", eMail: "", phone: "", password: "", birthday: new Date().toLocaleDateString('en-CA'), coin: 0, level: 1, nowExp: 0, nextExp: 200, sign: "", sex: "", identityCard: "", avatarImageUrl: '',haveAvatar:false}
}, {immediate: true});//这是 watch 选项的一部分，表示在初始化时（即 watch 被设置后立即）也会执行一次回调函数。这样，formState.value 会在组件挂载时立即根据 newUser 的值进行一次初始化设置。

</script>

<template>
  <a-modal v-bind:open="props.open" :title="drawerTitle">
    <!--头像上传按钮-->
    <div style="display: flex; justify-content: center; margin: 10px 0;">
      <avatar-uploader2
          :user="formState"
          @handle-sure-sava-avatar="(avatarBlob) => avatarFile = avatarBlob"
          ref="avatarUploaderRef"
      />
    </div>

    <!--表单-->
    <a-form :model="formState" :label-col="{ style: {width: '50px'} }">
      <a-form-item label="临时ID" name="uuid">
        <a-input v-model:value="formState.uuid" :disabled="true"/>
      </a-form-item>
      <ph-space>
        <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入用户名！' }]">
          <a-input v-model:value="formState.name">
            <template #prefix>
              <UserOutlined/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="等级" name="level">
          <a-select v-model:value="formState.level" style="width: 70px">
            <a-select-option v-for="n in 6" :key="n" :value="n">
              <span :class="'iconfont icon-user_level_' + n"></span>
            </a-select-option>
          </a-select>
        </a-form-item>
      </ph-space>
      <ph-space>
        <a-form-item label="性别" name="sex">
          <a-radio-group v-model:value="formState.sex">
            <a-radio-button value="男">
              <ManOutlined style="color: #3269f3"/>
            </a-radio-button>
            <a-radio-button value="女">
              <WomanOutlined style="color: #ef50f4"/>
            </a-radio-button>
            <a-radio-button value="">
              <RobotOutlined style="color: #666666"/>
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="生日" name="birthday">
          <a-date-picker v-model:value="birthday"/>
        </a-form-item>
      </ph-space>
      <ph-space>
        <a-form-item label="邮箱" name="eMail" style="width: 270px">
          <a-input v-model:value="formState.eMail">
            <template #prefix>
              <MailOutlined/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="电话" name="phone">
          <a-input v-model:value="formState.phone">
            <template #prefix>
              <PhoneOutlined/>
            </template>
          </a-input>
        </a-form-item>
      </ph-space>
      <ph-space>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item label="硬币" name="coin">
          <a-input-number v-model:value="formState.coin"/>
        </a-form-item>
      </ph-space>
      <a-form-item label="签名" name="sign">
        <a-textarea v-model:value="formState.sign"/>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleClose">取消</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">提交</a-button>
    </template>
  </a-modal>
</template>