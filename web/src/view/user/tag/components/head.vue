<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title=title
      :sub-title=subTitle
      @back="() => null"
  />
</template>

<script setup>
const props = defineProps({
  title:{type:String},
  subTitle:{type:String}
})
</script>

<style scoped>

</style>