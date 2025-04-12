<template>
  <!--头部-->
  <ph-view-layout title="用户信息管理" sub-title="管理和查看用户们的信息">
    <template #view-tool>
      <a-space>
        <a-button type="primary" @click="openDrawer('添加', true,null)">添加</a-button>
        <PhSimpleAddUser @handle-add-result="handleAddSimpleResult"/>
      </a-space>
    </template>

    <ph-card>
      <!--表格-->
      <a-table :columns="columns" :data-source="tableData" rowKey="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-image
                v-if="record.haveAvatar"
                :src="`${userAvatarResource}${record.uuid}.webp`"
                style="height: 30px; width: 30px; border-radius: 50%;"
            />
            <a-avatar v-else>{{record.name}}</a-avatar>
            <router-link :to="`/user/info/${record.id}`" class="user-name">{{ record.name }}</router-link>
          </template>
          <template v-else-if="column.key === 'sex'">
            <ManOutlined v-if="record.sex === '男'" style="color:#3269f3" />
            <WomanOutlined v-else-if="record.sex === '女'" style="color:#ef50f4" />
            <RobotOutlined v-else style="color:#a2a2a2" />
          </template>
          <template v-else-if="column.key === 'birthday'">
            <span v-if="record.birthday">{{ record.birthday }}（{{ getAge(record.birthday) }}岁）</span>
            <span v-if="record.birthday && daysUntilNextBirthday(record.birthday) <= 3"
                  class="iconfont icon-birthday"
                  :style="{'color':daysUntilNextBirthday(record.birthday) === 0?'#f6c323':'#797979'}">
            </span>
          </template>
          <template v-else-if="column.key === 'level'">
            <span :class="`iconfont icon-user_level_${record.level}`"></span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <!--编辑-->
              <a-tooltip title="编辑">
                <EditOutlined @click="openDrawer('编辑', true, record)" style="color:#797878; margin-right: 5px;" />
              </a-tooltip>

              <!--删除-->
              <a-tooltip title="删除">
                <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="Delete(record.id)">
                  <DeleteOutlined style="color: #d81e06" />
                </a-popconfirm>
              </a-tooltip>
            </span>
          </template>
        </template>
      </a-table>
    </ph-card>

    <!--用户表单 -->
    <user-modal :drawer-title="drawerTitle" :open="drawerVisible" :user="activeUser" @handle-close="(res)=>drawerVisible = res"/>
  </ph-view-layout>
</template>

<script setup>
import { DeleteOutlined, EditOutlined, ManOutlined, WomanOutlined, RobotOutlined } from '@ant-design/icons-vue';
import PhCard from "@components/ph_inputs/common/PhCard.vue";
import PhViewLayout from "@components/ph_inputs/common/PhViewLayout.vue";
import { message } from "ant-design-vue";
import UserModal from "@view/user/management/components/UserModal.vue";
import dayjs from "dayjs";

// ================ 依赖注入 ================
const api = inject('api');
const userAvatarResource = inject("resourceByUserAvatarUrl");

// ================ 状态定义 ================
/**
 * 抽屉控制状态
 */
const drawerVisible = ref(false);
const drawerTitle = ref("");
const activeUser = ref(null);

/**
 * 表格数据状态
 */
const tableData = ref([]);

// ================ 表格配置 ================
/**
 * 表格列定义
 * @type {Array<Object>}
 */
const columns = [
  { title: '用户编号', dataIndex: 'uuid', key: 'uuid', width: 300 },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '性别', dataIndex: 'sex', key: 'sex',width: 60 },
  { title: '生日', dataIndex: 'birthday', key: 'birthday' },
  { title: '电话', dataIndex: 'phone', key: 'phone' },
  { title: '电子邮箱', dataIndex: 'eMail', key: 'eMail' },
  { title: '等级', dataIndex: 'level', key: 'level',width:60 },
  { title: '操作', key: 'action' }
];

// ================ 方法定义 ================
/**
 * 初始化表格数据
 */
const dataInit = async () => {
  try {
    const res = await api.userApi.Get();
    if (res.isSuccess) {
      tableData.value = res.data;
    }
  } catch (error) {
    message.error('获取用户数据失败');
    console.error('获取用户数据失败:', error);
  }
};

/**
 * 处理简单添加用户的结果
 * @param {Object} newUser - 新添加的用户信息
 */
const handleAddSimpleResult = (newUser) => {
  tableData.value.push(newUser);
};

/**
 * 计算距离下次生日的天数
 * @param {string} birthdayStr - 生日日期字符串
 * @returns {number} 距离下次生日的天数
 */
const daysUntilNextBirthday = (birthdayStr) => {
  const today = dayjs().startOf('day');
  let birthdayThisYear = dayjs(birthdayStr).year(today.year()).startOf('day');

  // 如果今年的生日已过，计算到明年的生日
  if (birthdayThisYear.isBefore(today)) {
    birthdayThisYear = birthdayThisYear.add(1, 'year');
  }
  return birthdayThisYear.diff(today, 'day');
};

/**
 * 计算年龄
 * @param {string} birthdayStr - 生日日期字符串
 * @returns {number} 年龄
 */
const getAge = (birthdayStr) => {
  const birthday = new Date(birthdayStr);
  const today = new Date();
  return today.getFullYear() - birthday.getFullYear();
};

/**
 * 打开用户信息抽屉
 * @param {string} title - 抽屉标题
 * @param {boolean} showTools - 是否显示工具栏
 * @param {Object|null} user - 用户信息对象
 */
const openDrawer = (title, showTools, user = null) => {
  drawerTitle.value = title;
  drawerVisible.value = true;
  activeUser.value = user; // 设置当前活动用户
};

/**
 * 删除用户
 * @param {number|string} keyValue - 用户ID
 */
const Delete = async (keyValue) => {
  try {
    const res = await api.userApi.DeleteById(keyValue);
    if (res.isSuccess) {
      message.success(res.message);
      await dataInit(); // 重新加载数据
    } else {
      message.error(res.message);
    }
  } catch (error) {
    message.error('删除用户失败');
    console.error('删除用户失败:', error);
  }
};

// ================ 生命周期钩子 ================
onMounted(() => {
  dataInit();
});
</script>

<style scoped>
/* 添加你的样式 */
.user-name{
  margin-left: 8px;
}
</style>
