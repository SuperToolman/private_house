<script setup>
import Form from "./components/Form.vue";

const api = inject('api');
const modalTrigger = ref(null)
const formState = ref({})
const phModalOpen = ref(false)
const tableColumns = [
  {title: 'ID', dataIndex: 'id', key: 'id'},
  // {title: '上级ID', dataIndex: 'parentID', key: 'parentID'},
  {title: '菜单名称', dataIndex: 'name', key: 'name'},
  {title: '路由', dataIndex: 'routerPath', key: 'routerPath'},
  {title: '路由组件路径', dataIndex: 'routerComponentPath', key: 'routerComponentPath'},
  {title: '图标名称', dataIndex: 'iconName', key: 'iconName'},
  {title: '说明', dataIndex: 'description', key: 'description'},
  {title: '操作', key: 'action',},
];
const tableData = ref([]);


const addKey = (nodes) => {
  return nodes.map(node => {
    node.key = node.id; // Assuming `id` is unique

    if (node.children) {
      node.children = addKey(node.children);
    }
    return node;
  });
};
const dataInit = ()=>{
  api.systemMenuApi.GetTree().then(res => {
    tableData.value = addKey(res.data);
    // console.log('初始化数据',tableData.value)
  });
}

const handleColumnDeleteEvent = (id)=>{
  api.systemMenuApi.DeleteById(id).then(res=>{
    if(res.isSuccess)
      dataInit()
  })
}
const handleColumnEditEvent = (menuEntity)=>{
  //需要将Entity传递进入Form中的Entity
  formState.value = menuEntity
  phModalOpen.value = true
}
const handleTriggerEvent = ()=>{

}

onMounted(() => {
  dataInit()
});
</script>

<template>
  <PhViewLayout title="菜单管理" sub-title="管理系统的菜单、路由配置">
    <template #view-tool>
      <PhModal
          v-model:open="phModalOpen"
          title="添加菜单"
          :hide-buttons="true"
      >
        <template #trigger>
          <a-button type="primary" ref="modalTrigger">添加菜单</a-button>
        </template>

        <template #content>
          <Form :form-state="formState" @handle-cancel-modal="phModalOpen = false"/>
        </template>
      </PhModal>

    </template>

    <PhTreeDataTableLayout
        :table-columns="tableColumns"
        :table-data="tableData"
        @handle-table-column-delete-event="handleColumnDeleteEvent"
        @handle-table-column-edit-event ="handleColumnEditEvent"
    />

    <!--表单-->
  </PhViewLayout>

</template>

<style scoped>
</style>
