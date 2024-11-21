<script setup>

const props = defineProps({
  tableData:{type:Array,default:[]},
  columnDelete:{type:Boolean,default:true},
  columnEdit:{type:Boolean,default:true}
})
const api = inject('api')
const handleColumnDelete = (id)=>{

}

const handleColumnEdit = (entity) =>{

}
</script>

<template>

</template>

<style scoped>

</style>