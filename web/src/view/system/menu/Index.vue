<script setup>
import PhViewLayout from "@components/ph_inputs/PhViewLayout.vue";
import {inject, onMounted, ref} from "vue";
import PhTreeTableView from "@components/ph_inputs/Ph-TreeTableView.vue";
import Form from "./components/Form.vue";

const api = inject('api');
const columns = [
  {title: 'ID', dataIndex: 'id', key: 'id'},
  {title: '上级ID', dataIndex: 'parentID', key: 'parentID'},
  {title: '菜单名称', dataIndex: 'name', key: 'name'},
  {title: '路由', dataIndex: 'routerPath', key: 'routerPath'},
  {title: '路由组件路径', dataIndex: 'routerComponentPath', key: 'routerComponentPath'},
  {title: '图标名称', dataIndex: 'iconName', key: 'iconName'},
  {title: '说明', dataIndex: 'description', key: 'description'},
  {title: '操作', key: 'action',},
];
const data = ref([]);
const formOpenStatus = ref(false)
const formTitle = ref('Title')

const initData = () => {
  api.systemMenuApi.GetTree().then(res => {
    if (res.isSuccess) {
      const addKey = (nodes) => {
        return nodes.map(node => {
          node.key = node.id; // Assuming `id` is unique
          if (node.children) {
            node.children = addKey(node.children);
          }
          return node;
        });
      };

      data.value = addKey(res.data);
    }
  });
};

onMounted(() => {
  initData();
});
</script>

<template>
  <PhTreeTableView
      :title="'菜单管理'"
      :sub-title="'管理系统的菜单、路由配置'"
      :table-columns="columns"
      :table-data="data"
      :is-add="true"
      :is-delete="true"
      :is-edit="true"
      :formComponent="{ component: Form }"
      :form-width="'600px'"
  />
</template>

<style scoped>
</style>
