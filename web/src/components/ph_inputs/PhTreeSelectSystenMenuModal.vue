<template>
  <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="请选择菜单"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
      tree-node-filter-prop="label"
  >
<!--    <template #title="{ value: val, label }">-->
<!--      <b v-if="val === '847018df-1d07-11ef-a1d1-0242ac120004'" style="color: #08c">sss</b>-->
<!--      <template v-else>{{ label }}</template>-->
<!--    </template>-->
  </a-tree-select>
</template>

<script setup>
import {inject, onMounted, ref, watch} from 'vue';

const api = inject('api')
const props = defineProps({
  initialValue:{type:String}
})
const emits = defineEmits(['handleSelect'])
const value = ref();
const treeData = ref([]);
const dataInit = async ()=>{
  treeData.value = (await api.systemMenuApi.LoadAntTreeSelected()).data
  if (props.initialValue !== undefined && props.initialValue!= null && props.initialValue !== ''){
    value.value = props.initialValue;
  }
}

onMounted( ()=>{
  dataInit()
})
watch(value, () => {
  emits('handleSelect',value.value)
});
</script>