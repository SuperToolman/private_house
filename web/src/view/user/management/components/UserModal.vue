<script setup>
// ================ 导入依赖 ================
import dayjs from 'dayjs';
import { v4 as uuidv4 } from "uuid";
import { api } from "@request/mangement";

// 组件导入
import AvatarUploader2 from "@view/user/management/components/AvatarUploader2.vue";
import PhSpace from "@components/ph_inputs/common/PhSpace.vue";

// ================ Props & Emits 定义 ================
const props = defineProps({
  /** 抽屉标题 */
  drawerTitle: {
    type: String,
    default: ''
  },
  /** 是否显示抽屉 */
  open: {
    type: Boolean,
    default: false
  },
  /** 用户数据对象 */
  user: {
    type: Object,
    default: null
  }
});

const emits = defineEmits(['handleClose']);

// ================ 响应式状态 ================
/** 头像上传组件引用 */
const avatarUploaderRef = ref(null);
/** 头像文件数据 */
const avatarFile = ref(null);
/** 表单状态数据 */
const formState = ref(null);

// ================ 计算属性 ================
/**
 * 处理生日日期的双向绑定
 * 转换between日期对象和字符串格式
 */
const birthday = computed({
  get() {
    return formState.value.birthday ? dayjs(formState.value.birthday, 'YYYY-MM-DD') : null;
  },
  set(value) {
    formState.value.birthday = value ? value.format('YYYY-MM-DD') : '';
  },
});

// ================ 方法定义 ================
/**
 * 初始化新用户的默认数据
 * @returns {Object} 默认的用户数据对象
 */
const getDefaultUserData = () => ({
  uuid: uuidv4(),
  name: "",
  eMail: "",
  phone: "",
  password: "",
  birthday: new Date().toLocaleDateString('en-CA'),
  coin: 0,
  level: 1,
  nowExp: 0,
  nextExp: 200,
  sign: "",
  sex: "",
  identityCard: "",
  avatarImageUrl: '',
  haveAvatar: false
});

/**
 * 处理表单提交
 * 包括头像上传和用户数据提交
 */
const handleSubmit = async () => {
  try {
    if (!avatarUploaderRef.value) {
      console.error('头像上传组件未正确挂载');
      return;
    }

    // 保存头像
    await avatarUploaderRef.value.sureSava();

    // 选择合适的API方法（新增或更新）
    const apiMethod = formState.value.id ? api.userApi.Update : api.userApi.Add;
    
    // 提交用户数据
    const response = await apiMethod(formState.value);
    if (response.isSuccess) {
      // 如果有头像文件，上传头像
      if (avatarFile.value) {
        await api.userApi.UploadAvatar(avatarFile.value, formState.value.uuid);
      }
      handleClose();
    }
  } catch (error) {
    console.error('提交表单失败:', error);
  }
};

/**
 * 关闭模态框
 */
const handleClose = () => {
  emits('handleClose', false);
};

// ================ 监听器 ================
/**
 * 监听用户数据变化，初始化表单状态
 */
watch(() => props.user, (newUser) => {
  formState.value = newUser ? { ...newUser } : getDefaultUserData();
}, { immediate: true });
</script>

<template>
  <a-modal 
    v-bind:open="props.open" 
    :title="drawerTitle"
    :closable="false"
    :maskClosable="false"
    width="600px"
  >
    <!-- 头像上传区域 -->
    <div class="avatar-upload-container">
      <avatar-uploader2
        :user="formState"
        @handle-sure-sava-avatar="(avatarBlob) => avatarFile = avatarBlob"
        ref="avatarUploaderRef"
      />
    </div>

    <!-- 用户信息表单 -->
    <a-form 
      :model="formState" 
      :label-col="{ style: { width: '80px' } }"
      :wrapper-col="{ span: 20 }"
      class="user-form"
    >
      <!-- 用户ID -->
      <a-form-item label="临时ID" name="uuid">
        <a-input v-model:value="formState.uuid" :disabled="true"/>
      </a-form-item>

      <!-- 用户名称和等级 -->
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item 
            label="名称" 
            name="name" 
            :rules="[{ required: true, message: '请输入用户名！' }]"
            class="required-label"
          >
            <a-input v-model:value="formState.name">
              <template #prefix>
                <UserOutlined/>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="等级" name="level" class="level-select">
            <a-select v-model:value="formState.level">
              <a-select-option v-for="n in 6" :key="n" :value="n">
                <span :class="`iconfont icon-user_level_${n}`"></span>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 性别和生日 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="formState.sex" class="gender-group">
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
        </a-col>
        <a-col :span="12">
          <a-form-item label="生日" name="birthday">
            <a-date-picker v-model:value="birthday" style="width: 100%"/>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 联系方式 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="邮箱" name="eMail">
            <a-input v-model:value="formState.eMail">
              <template #prefix>
                <MailOutlined/>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电话" name="phone">
            <a-input v-model:value="formState.phone">
              <template #prefix>
                <PhoneOutlined/>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 密码和硬币 -->
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item 
            label="密码" 
            name="password" 
            :rules="[{ required: true, message: '请输入密码！' }]"
            class="required-label"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined/>
              </template>
            </a-input-password>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="硬币" name="coin" class="coin-input">
            <a-input-number v-model:value="formState.coin" :min="0"/>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 个性签名 -->
      <a-form-item label="签名" name="sign">
        <a-textarea v-model:value="formState.sign" :rows="4"/>
      </a-form-item>
    </a-form>

    <!-- 操作按钮 -->
    <template #footer>
      <div class="modal-footer">
        <a-button key="back" @click="handleClose">取消</a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">提交</a-button>
      </div>
    </template>
  </a-modal>
</template>

<style scoped>
.avatar-upload-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.user-form {
  padding: 0 24px;
}

.gender-group {
  display: flex;
  width: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

:deep(.ant-form-item) {
  margin-bottom: 20px;
}

:deep(.ant-modal-content) {
  padding: 20px;
}

:deep(.ant-form-item-label) {
  text-align: right;
  padding-right: 12px;
  line-height: 32px;
}

:deep(.ant-input-number) {
  width: 100%;
}

/* 必填项标记样式 */
:deep(.ant-form-item-required::before) {
  position: absolute;
  left: -14px;
  top: 4px;
}

/* 性别选择组样式 */
.gender-group {
  display: flex;
  width: auto;
}

:deep(.ant-radio-button-wrapper) {
  text-align: center;
  padding: 0 15px;
}

/* 硬币输入框样式 */
.coin-input {
  :deep(.ant-input-number) {
    width: 100%;
  }
}

/* 等级选择器样式 */
.level-select {
  :deep(.ant-select) {
    width: 100%;
  }
}

/* 调整输入框高度统一 */
:deep(.ant-input),
:deep(.ant-input-password),
:deep(.ant-select-selector),
:deep(.ant-input-number),
:deep(.ant-picker) {
  height: 32px !important;
}

/* 特别处理密码输入框 */
:deep(.ant-input-password input) {
  height: 30px !important; /* 减去边框的2px */
}

:deep(.ant-input-affix-wrapper) {
  padding: 0 11px;
  height: 32px !important;
}

:deep(.ant-input-affix-wrapper > input.ant-input) {
  height: 30px !important;
  padding: 0;
}

/* 确保所有输入框容器高度一致 */
:deep(.ant-form-item-control-input) {
  min-height: 32px;
}

:deep(.ant-form-item-control-input-content) {
  height: 32px;
  line-height: 32px;
}
</style>