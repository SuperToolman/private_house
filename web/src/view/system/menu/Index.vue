<script setup>
import Form from "./components/FormModal.vue";
import {message} from "ant-design-vue";

const api = inject('api');
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
const handleFormSubmit = (entity)=>{
  console.log('测试提交',entity)
  // && entity.id.length >0
  // 判断entity是否存在id属性
  if ('id' in entity){
    api.systemMenuApi.Update(entity).then(res=>{
      if(res.isSuccess) {
        dataInit()
        message.success(res.message);
      }else
        message.error(res.message)
    })
  }else {
    api.systemMenuApi.Add(entity).then(res=>{
      res.isSuccess?message.success(res.message):message.error(res.message)
    })
  }
}
const handleColumnDeleteEvent = (id)=>{
  api.systemMenuApi.DeleteById(id).then(res=>{
    if(res.isSuccess){
      dataInit()
      message.success(res.message)
    }else
      message.error(res.message)
  })
}
onMounted(() => {
  dataInit()
});

</script>

<template>
  <PhViewLayout title="菜单管理" sub-title="管理系统的菜单、路由配置">
    <PhTreeDataTableLayout
        :table-columns="tableColumns"
        :table-data="tableData"
        @handle-table-column-delete-event="handleColumnDeleteEvent"
        @handleFormSubmit="handleFormSubmit"
        :formComponent="{ component: Form }"
    >
    </PhTreeDataTableLayout>
  </PhViewLayout>

</template>

<style scoped>
</style>
