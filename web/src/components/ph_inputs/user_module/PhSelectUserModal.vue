<template>
  <div>
    <!--外围表单信息-->
    <a-input v-if="userEntity" v-model:value="userEntity.name" @click="openStatus = true;"/>
    <a-input v-else @click="openStatus = true;"/>

    <!--表单选择-->
    <a-modal
        v-model:open="openStatus"
        :title="'请选择用户'">
      <!--搜索-->
      <a-input-search v-model:value="searchText" placeholder="搜索用户" enter-button @search="dataInit"/>

      <!--表格-->
      <a-table
          :columns="columns"
          :data-source="tableData">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-avatar :src="userAvatarResource+record.uuid+'.webp'" style="margin-right: 7px">{{ record.name }}</a-avatar>
            <a>{{ record.name }}</a>
          </template>
          <template v-else-if="column.key === 'sex'">
            <ManOutlined v-if="record.sex === '男'" style="color:#6600ff"/>
            <WomanOutlined v-else-if="record.sex === '女'" style="color: #ff4dc3"/>
            <RobotOutlined v-else style="color: #a2a2a2"/>
          </template>
          <template v-else-if="column.key==='level'">
            <span :class="`iconfont icon-user_level_${record.level}`"></span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button @click="rowChose(record)">选择</a-button>
          </template>
        </template>
      </a-table>

      <template #footer>

      </template>
    </a-modal>
  </div>
</template>
<script setup>
import {inject, onMounted, ref} from 'vue';
import {
  ManOutlined,
  RobotOutlined,
  WomanOutlined
} from "@ant-design/icons-vue";

const api = inject('api')
const props = defineProps({
  userEntity:{type:Object,default:null}
})
const emits = defineEmits(['handleSelectUser'])
const selectUserId = ref('')
const searchText = ref('')
const userAvatarResource = inject("resourceByUserAvatarUrl")
const tableData = ref({})
const openStatus = ref(false);
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {title: '性别', dataIndex: 'sex', key: 'sex',},
  {
    title: '等级',
    dataIndex: 'level',
    key: 'level',
    sorter: (a, b) => a.level - b.level,
  },
  {title:'操作',dataIndex: 'action',key:'action'}
];//定义表格的列


const rowChose = (userEntity)=>{
  openStatus.value = false;
  props.userEntity = userEntity
  emits('handleSelectUser',userEntity)
}
const dataInit = ()=>{
  if (searchText.value !== ''){
    api.userApi.SearchUserByName(searchText.value).then(res=> tableData.value = res.data)
  }else {
    api.userApi.Get().then(res => {
      if (res.isSuccess)
        tableData.value = res.data
    })
  }
}

onMounted(() => {
  dataInit()
})
</script>