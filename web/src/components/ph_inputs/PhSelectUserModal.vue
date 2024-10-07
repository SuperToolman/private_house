<template>
  <div>
    <a-input v-if="userEntity" v-model:value="userEntity.name" @click="openStatus = true;"/>
    <a-input v-else @click="openStatus = true;"/>
    <a-modal
        v-model:open="openStatus"
        :width="'35%'"
        :title="'请选择作者'">
      <!--表格-->
      <a-table
          :columns="columns"
          :data-source="tableData">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-avatar :src="userAvatarResource+record.id+'.webp'" style="margin-right: 7px">{{ record.name }}</a-avatar>
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
const userAvatarResource = inject("resourceByUserAvatarUrl")
const tableData = ref({})
const openStatus = ref(false);
const columns = [
  {title: '姓名', dataIndex: 'name', key: 'name',},
  {title: '性别', dataIndex: 'sex', key: 'sex',},
  {title: '等级', dataIndex: 'level', key: 'level',},
  {title:'操作',dataIndex: 'action',key:'action'}
];//定义表格的列


const rowChose = (userEntity)=>{
  openStatus.value = false;
  props.userEntity = userEntity
  emits('handleSelectUser',userEntity)
}
onMounted(() => {
  api.userApi.Get().then(res => {
    if (res.isSuccess)
      tableData.value = res.data
  })
})
</script>