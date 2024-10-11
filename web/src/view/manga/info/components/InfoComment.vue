<script setup>
const props = defineProps({
  mangaId:{type:String,default:''}
})
</script>

<template>
  <PhCard :title="'评论'">
    测试
    {{mangaId}}
  </PhCard>
</template>

<style scoped>

</style>