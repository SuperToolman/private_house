<template>
  <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :items="items"
      @click="handleClick"
  ></a-menu>
</template>


<script setup>
import {reactive, ref, watch, h} from 'vue';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons-vue';
import router from "@/router";

const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = reactive([
  getItem('用户模块', 'sub1', () => h(MailOutlined), [
    getItem('用户信息管理', '/user/info', null, ),
    getItem('Item 2', 'g2', null,
        [
            getItem('用户标签', '/user/tag'),
          getItem('Option 4', '4')
        ], 'group'),
  ]),
  getItem('投稿管理', 'sub2', () => h(AppstoreOutlined), [
    getItem('投稿审核', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  {
    type: 'divider',
  },
  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]);
const handleClick = e => {
  console.log('click', e);
  router.push(e.key)
};
watch(openKeys, val => {
  console.log('openKeys', val);
});
</script>