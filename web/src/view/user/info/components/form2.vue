<template>
  <a-drawer :width="500" :title="DrawerTitle" placement="right" :open="DrawerStatus" @close="onClose">
    <template v-if="DrawerShowTool" #extra>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="onSubmit">提交</a-button>
    </template>

    <!--头像上传按钮-->
    <div style="display: flex;justify-content: center;margin: 10px 0;">
      <AvatarUploader/>
    </div>



    <!--表单-->
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户编号" name="uid">
        <a-input v-model:value="formState.uid" disabled="true"/>
      </a-form-item>
      <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名！' }]">
        <a-input v-model:value="formState.name">
          <template #prefix>
            <UserOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-space wrap>
        <a-form-item label="性别" name="sex">

          <a-radio-group v-model:value="formState.sex">
            <a-radio-button value="男"><ManOutlined style="color: #3269f3" /></a-radio-button>
            <a-radio-button value="女"><WomanOutlined style="color: #ef50f4" /></a-radio-button>
            <a-radio-button :aria-checked="true" value=""><RobotOutlined style="color: #666666"/></a-radio-button>
          </a-radio-group>


        </a-form-item>
        <a-form-item label="生日" name="birthday">
          <a-date-picker v-model:value="formInputDate"/>
        </a-form-item>
      </a-space>
      <a-form-item label="电子邮箱" name="eMail">
        <a-input v-model:value="formState.eMail">
          <template #prefix>
            <MailOutlined />
          </template>
          <template #addonAfter>
            <a-select v-model:value="EmailAfter" style="width: 120px">
              <a-select-option value="@qq.com">@qq.com</a-select-option>
              <a-select-option value="@gmail.com">@gmail.com</a-select-option>
              <a-select-option value="@163.com">@163.com</a-select-option>
            </a-select>
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
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-space warp>
        <a-form-item label="硬币" name="coin">
          <a-input-number v-model:value="formState.coin"/>
        </a-form-item>
        <a-form-item label="等级" name="level">
          <a-select v-model:value="formState.level" style="width: 90px">
            <a-select-option value="1"><span class="iconfont icon-user_level_1"></span></a-select-option>
            <a-select-option value="2"><span class="iconfont icon-user_level_2"></span></a-select-option>
            <a-select-option value="3"><span class="iconfont icon-user_level_3"></span></a-select-option>
            <a-select-option value="4"><span class="iconfont icon-user_level_4"></span></a-select-option>
            <a-select-option value="5"><span class="iconfont icon-user_level_5"></span></a-select-option>
            <a-select-option value="6"><span class="iconfont icon-user_level_6"></span></a-select-option>
          </a-select>
        </a-form-item>
      </a-space>
      <a-form-item label="签名" name="sign">
        <a-textarea v-model:value="formState.sign"/>
      </a-form-item>
      <a-form-item label="身份证" name="identityCard">
        <a-input v-model:value="formState.identityCard"/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script setup>
import {inject, onMounted, reactive, ref, toRaw, watch} from 'vue';
import AvatarUploader from "./avatarUploader.vue"
import {LockOutlined, PhoneOutlined, UserOutlined,WomanOutlined,ManOutlined,RobotOutlined,MailOutlined} from '@ant-design/icons-vue';
import {notification} from "ant-design-vue";


const api = inject("api")
const props = defineProps({
  DrawerStatus: {type: Boolean},
  DrawerTitle: {type: String},
  DrawerShowTool: {type: Boolean},
  formState: {type: Object}
})
props.formState = reactive({
  uid: 0,
  name: "",
  eMail: "",
  phone: "",
  password: "",
  coin: 0,
  level: 1,
  birthday: "",
  sign: "",
  sex: "",
  identityCard: ""
});

const emits = defineEmits(["updateOpen"])//给父组件添加一个响应事件
const EmailAfter = ref('@qq.com');
const formInputDate = ref();

const onSubmit = () => {
  if (props.formState.EMail != null && props.formState.EMail != "") {
    props.formState.EMail = props.formState.EMail += EmailAfter.value;
  }


  props.formState.birthday = "2024-01-14";
  if (props.formState.uid != 0) {
    alert("编辑")
  }else{
    // 添加
    alert("添加")
  }

  //判断编号是添加还是删除


  // api.userApi.Add(formState).then(res=>{
  //   if (res.data.isSuccess)
  //     notification['success']({message: '成功', description: `${res.data.message}`,});
  //   else
  //     notification['error']({message: '错误', description: `${res.data.message}`,});
  // }).catch(error=>{
  //   notification['error']({message: '错误', description: `${error}`,});
  // })

  onClose();
};
const onClose = () => {
  emits('updateOpen', false) //value是传给父元素事件的参数
};

const labelCol = {
  style: {
    width: '70px',
  },
};
const wrapperCol = {
  span: 18,
};
</script>