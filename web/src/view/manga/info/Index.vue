<script setup>

const route = useRoute()
const mangaId = ref('')
const mangaEntity = ref([])
onMounted(()=>{
  mangaId.value = route.params.mangaId

})
</script>

<template>
  <PhCard :title="'漫画信息'">
    <PhImage :src="'/src/assets/test.jpg'"/>
  </PhCard>

  <PhCard :title="'章节'">

  </PhCard>
<!--  测试信息{{mangaId}}-->
</template>

<style scoped>

</style>