<script setup>
import {inject, onMounted, ref, watch} from "vue";

const api = inject('api')
const emits = defineEmits(['handleUpdateVideoArea'])
const preNodeId = ref([])
const areaSelected = ref([])

onMounted(async () => {
  areaSelected.value.push({label:'全部分区',value:''})
  const data = (await api.videoAreaApi.LoadSelectedData()).data
  areaSelected.value.push(...data)
})

watch(preNodeId,()=>{
  emits('handleUpdateVideoArea',preNodeId.value)
})

</script>

<template>
  <a-select
      v-model:value="preNodeId"
      placeholder="请选择分区"
      style="width: 200px"
      :options="areaSelected"
  ></a-select>
</template>

<style scoped>

</style>