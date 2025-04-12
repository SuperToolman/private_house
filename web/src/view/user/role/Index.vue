<template>
  <ph-view-layout title="角色管理" sub-title="管理和查看角色及其权限">
    <template #view-tool>
      <a-space>
        <a-button type="primary" @click="openDrawer('添加', true, null)">添加角色</a-button>
      </a-space>
    </template>

    <ph-card>
      <a-table :dataSource="tableData" :columns="columns" rowKey="id">
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'name'">
            <span>{{ record.name }}</span>
          </template>
          <template v-else-if="column.key === 'description'">
            <span>{{ record.description }}</span>
          </template>
          <template v-else-if="column.key === 'permissions'">
            <a-popover v-if="record.permissionItems && record.permissionItems.length > 0" title="权限列表" overlayClassName="permission-popover">
              <template #content>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                  <div v-for="permission in record.permissionItems" :key="permission.id">
                    <a-tag color="blue">{{ permission.name }}</a-tag>
                  </div>
                </div>
              </template>
              <a-tag color="orange">{{ record.permissionItems.length }} 个权限</a-tag>
            </a-popover>
            <a-tag v-else color="gray">没有权限</a-tag>
          </template>
          <template v-else-if="column.key === 'addTime'">
            <span>{{ record.addTime.replace('T', ' ') }}</span>
          </template>
          <template v-else-if="column.key === 'updateTime'">
            <span>{{ record.updateTime.replace('T', ' ') }}</span>
          </template>
          <template v-else-if="column.key === 'updateVersion'">
            <span>{{ record.updateVersion }}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-tooltip title="编辑">
                <EditOutlined @click="openDrawer('编辑', true, record)" style="color:#797878; margin-right: 5px;" />
              </a-tooltip>
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

    <!--角色表单 -->
    <role-modal :drawer-title="drawerTitle" :open="drawerVisible" :role="activeRole" @handle-close="(res) => drawerVisible = res" />
  </ph-view-layout>
</template>

<script setup>
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import PhCard from "@components/ph_inputs/common/PhCard.vue";
import PhViewLayout from "@components/ph_inputs/common/PhViewLayout.vue";
import { message } from "ant-design-vue";
import { ref, onMounted } from "vue";

// 注入 API
const api = inject('api');

// 抽屉状态
const drawerVisible = ref(false);
const drawerTitle = ref("");
const activeRole = ref(null);

// 表格列定义
const columns = [
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '权限', dataIndex: 'permissionItems', key: 'permissions' },
  { title: '创建时间', dataIndex: 'addTime', key: 'addTime' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '迭代版本', dataIndex: 'updateVersion', key: 'updateVersion' },
  { title: '操作', key: 'action' }
];

// 表格数据
const tableData = ref([]);

// 初始化数据
const dataInit = () => {
  api.roleApi.Get().then(res => {
    if (res.isSuccess) {
      tableData.value = res.data.map(role => ({
        ...role,
        permissionItems: role.permissionItems || [] // 确保权限项存在
      }));
    } else {
      message.error(res.message);
    }
  });
};

// 打开抽屉（添加、编辑）
const openDrawer = (title, showTools, role = null) => {
  drawerTitle.value = title;
  drawerVisible.value = true;
  activeRole.value = role; // 激活焦点对象
};

// 删除角色
const Delete = (id) => {
  api.roleApi.DeleteById(id).then(res => {
    if (res.isSuccess) {
      message.success(res.message);
      dataInit();
    } else {
      message.error(res.message);
    }
  });
};

// 页面加载时初始化数据
onMounted(() => {
  dataInit();
});
</script>

<style scoped>
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
