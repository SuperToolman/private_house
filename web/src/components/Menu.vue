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
import {MailOutlined, AppstoreOutlined, SettingOutlined,FileOutlined,ReadOutlined} from '@ant-design/icons-vue';
const emits = defineEmits(['handleClick'])
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);
const api = inject('api')

// 定义一个测试数据数组
const menuData = ref([])

function getItem(label, key, icon, children, type) {
  return {key, icon, children, label, type};
}

// 定义一个映射字符串到图标组件的函数
function getIcon(iconName) {
  const icons = {
    FileOutlined,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    ReadOutlined,
    // 如果有更多的图标，可以继续添加
  };
  return icons[iconName];
}


// 使用数据数组生成菜单项
const items = ref([])

const initData = ()=>{
  api.systemMenuApi.GetAntMenuData().then(res=>{
    if(res.isSuccess){
      menuData.value = res.data
      items.value = reactive(
          menuData.value.map(data =>
              getItem(
                  data.label,
                  data.key,
                  () => h(getIcon(data.icon)),
                  data.children?.map(child =>
                      getItem(child.label, child.key, child.icon ? () => h(getIcon(child.icon)) : null, child.children, child.type)
                  ),
                  data.type
              )
          )
      );
    }
  })
}

onMounted(()=>{
  initData();
})


const handleClick = e => {
  // router.push(e.key)
  emits('handleClick',e)
};
watch(openKeys, val => {
});
</script>