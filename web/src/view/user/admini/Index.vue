<script setup>
import { DeleteOutlined, EditOutlined, ManOutlined, WomanOutlined, RobotOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import PhCard from "@components/ph_inputs/common/PhCard.vue";
import PhViewLayout from "@components/ph_inputs/common/PhViewLayout.vue";
import { message } from "ant-design-vue";
import UserModal from "@view/user/management/components/UserModal.vue";
import dayjs from "dayjs";
import { ref, onMounted } from "vue";

// 注入 API 和资源 URL
const api = inject('api');
const userAvatarResource = inject("resourceByUserAvatarUrl");
// 抽屉状态
const drawerVisible = ref(false);
const drawerTitle = ref("");
const activeUser = ref(null);

// 表格列定义
const columns = [
  { title: '管理员编号', dataIndex: 'uuid', key: 'uuid', width: 300 },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '性别', dataIndex: 'sex', key: 'sex', width: 60 },
  { title: '生日', dataIndex: 'birthday', key: 'birthday' },
  { title: '电话', dataIndex: 'phone', key: 'phone' },
  { title: '电子邮箱', dataIndex: 'eMail', key: 'eMail' },
  { title: '角色', dataIndex: 'roleItem', key: 'role' },
  { title: '权限', dataIndex: 'permissionItems', key: 'permissionItems' },
  { title: '操作', key: 'action' }
];

// 表格数据
const tableData = ref([]);

// 初始化数据
const dataInit = () => {
  api.adminiApi.Get().then(res => {
    if (res.isSuccess) {
      tableData.value = res.data.map(admin => ({
        ...admin,
        permissions: admin.role?.permissions?.slice(0, 3) || [], // 最多显示 3 个权限
        extraPermissions: admin.role?.permissions?.length > 3 ? admin.role.permissions.length - 3 : 0 // 超出的权限数量
      }));
    }
  });
};

const handleAddSimpleResult = (newUser) => {
  tableData.value.push(newUser);
};

// 打开抽屉（添加、编辑）
const openDrawer = (title, showTools, user = null) => {
  drawerTitle.value = title;
  drawerVisible.value = true;
  activeUser.value = user; // 激活焦点对象
};

// 删除用户
const Delete = (keyValue) => {
  api.adminiApi.DeleteById(keyValue).then(res => {
    if (res.isSuccess) {
      message.success(res.message);
      dataInit();
    } else {
      message.error(res.message);
    }
  });
};
// 计算年龄
const getAge = (birthdayStr) => {
  const birthday = new Date(birthdayStr);
  const today = new Date();
  return today.getFullYear() - birthday.getFullYear();
};

// 页面加载时初始化数据
onMounted(() => {
  dataInit();
});
</script>

<template>
  <!--头部-->
  <ph-view-layout title="账户信息管理" sub-title="管理和查看用户们的信息">
    <template #view-tool>
      <a-space>
        <a-button type="primary" @click="openDrawer('添加', true, null)">添加</a-button>
        <PhSimpleAddUser @handle-add-result="handleAddSimpleResult" />
      </a-space>
    </template>

    <ph-card>
      <!--表格-->
      <a-table :columns="columns" :data-source="tableData" rowKey="uuid">
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'name'">
            <a-image
              v-if="record.haveAvatar"
              :src="`${userAvatarResource}${record.uuid}.webp`"
              style="height: 30px; width: 30px; border-radius: 50%;"
            />
            <a-avatar v-else>{{ record.name }}</a-avatar>
            <a class="user-name">{{ record.name }}</a>
          </template>
          <template v-else-if="column.key === 'sex'">
            <ManOutlined v-if="record.sex === '男'" style="color:#3269f3" />
            <WomanOutlined v-else-if="record.sex === '女'" style="color:#ef50f4" />
            <RobotOutlined v-else style="color:#a2a2a2" />
          </template>
          <template v-else-if="column.key === 'birthday'">
            <span v-if="record.birthday">{{ record.birthday.replace('T', ' ') }}（{{ getAge(record.birthday) }}岁）</span>
          </template>
          <template v-else-if="column.key === 'role'">
            <span>{{ record.roleItem?.name || '无角色' }}</span>
          </template>
          <template v-else-if="column.key === 'permissionItems'">
            <a-popover v-if="record.roleItem?.permissionItems.length > 0" title="权限列表" overlayClassName="permission-popover">
              <template #content>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                  <div v-for="permission in record.roleItem?.permissionItems" :key="permission.id">
                    <a-tag color="blue">{{ permission.name }}</a-tag>
                  </div>
                </div>
              </template>
              <a-tag color="orange">
                {{ record.roleItem.permissionItems.length }} 个权限
              </a-tag>
            </a-popover>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-tooltip title="编辑">
                <EditOutlined @click="openDrawer('编辑', true, record)" style="color:#797878; margin-right: 5px;" />
              </a-tooltip>
              <a-tooltip title="删除">
                <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="Delete(record.uuid)">
                  <DeleteOutlined style="color: #d81e06" />
                </a-popconfirm>
              </a-tooltip>
            </span>
          </template>
        </template>
      </a-table>
    </ph-card>

    <!--用户表单 -->
    <user-modal :drawer-title="drawerTitle" :open="drawerVisible" :user="activeUser" @handle-close="(res) => drawerVisible = res" />
  </ph-view-layout>
</template>

<style scoped>
/* 添加你的样式 */
.user-name {
  margin-left: 8px;
}

/* 气泡卡片样式 */
.permission-popover .ant-popover-inner-content {
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
}
</style>
