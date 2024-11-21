<template>
  <div>
    <!-- 外围表单信息 -->
    <a-input
        v-if="users.length > 0"
        v-model:value="usersName"
        @click="openStatus = true;"
    />
    <a-input v-else @click="openStatus = true;" />

    <!-- 表单选择 -->
    <a-modal v-model:open="openStatus" :title="'请选择用户'">
      <!-- 搜索 -->
      <PhSpace>
        <a-input-search
            v-model:value="searchText"
            placeholder="搜索用户"
            enter-button
            @search="dataInit"
        />
        <div style="margin-bottom: 16px">
          <a-button
              type="primary"
              :disabled="!hasSelected"
              :loading="state.loading"
              @click="start"
          >
            提交
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `选择了 ${state.selectedRowKeys.length} 用户` }}
            </template>
          </span>
        </div>
      </PhSpace>
      <!-- 表格 -->
      <a-table
          :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="tableData"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-avatar
                :src="userAvatarResource + record.uuid + '.webp'"
                style="margin-right: 7px"
            >
              {{ record.name }}
            </a-avatar>
            <a>{{ record.name }}</a>
          </template>
          <template v-else-if="column.key === 'sex'">
            <ManOutlined
                v-if="record.sex === '男'"
                style="color: #6600ff"
            />
            <WomanOutlined
                v-else-if="record.sex === '女'"
                style="color: #ff4dc3"
            />
            <RobotOutlined
                v-else
                style="color: #a2a2a2"
            />
          </template>
          <template v-else-if="column.key === 'level'">
            <span :class="`iconfont icon-user_level_${record.level}`"></span>
          </template>
        </template>
      </a-table>

      <template #footer>

      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, reactive, watch, computed } from "vue";
import {
  ManOutlined,
  RobotOutlined,
  WomanOutlined
} from "@ant-design/icons-vue";
import { arrayToString } from "../../../common/js/utils";

const emits = defineEmits(["handleSelectUsers"]);
const props = defineProps({
  users: { type: Array, default: [] }
});

const api = inject("api");
const state = reactive({
  selectedRowKeys: [],
  loading: false
});

const searchText = ref("");
const userAvatarResource = inject("resourceByUserAvatarUrl");
const tableData = ref([]);
const openStatus = ref(false);

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"]
  },
  { title: "性别", dataIndex: "sex", key: "sex" },
  {
    title: "等级",
    dataIndex: "level",
    key: "level",
    sorter: (a, b) => a.level - b.level
  }
]; // 定义表格的列

const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const usersName = ref("");

// 监听 props.users 的变化
watch(
    props,
    () => {
      if (props.users.length > 0) {
        console.log("有值");
        // 将 name 转换为 @name 的格式
        usersName.value = props.users.map((user) => `@${user.name}`).join(", ");
        // state.selectedRowKeys =
      } else {
        console.log("无值");
        usersName.value = "";
      }
    },
    { immediate: true }
);

const start = () => {
  state.loading = true;
  // 提交逻辑
  const idsStr = arrayToString(state.selectedRowKeys);
  const users = tableData.value.filter((obj) =>
      state.selectedRowKeys.includes(obj.uuid)
  );

  emits("handleSelectUsers", users, idsStr);

  setTimeout(() => {
    state.loading = false;
    // state.selectedRowKeys = [];
    openStatus.value = false;
  }, 1000);
};

const onSelectChange = (selectedRowKeys) => {
  state.selectedRowKeys = selectedRowKeys;
};

const dataInit = async () => {
  if (searchText.value !== "") {
    await api.userApi
        .SearchUserByName(searchText.value)
        .then((res) => (tableData.value = res.data));
  } else {
    await api.userApi.Get().then((res) => {
      if (res.isSuccess) tableData.value = res.data;
    });
  }

  if (tableData.value.length > 0) {
    tableData.value = tableData.value.map((data) => {
      return { ...data, key: data.uuid };
    });
  }
};

onMounted(() => {
  dataInit();
});
</script>