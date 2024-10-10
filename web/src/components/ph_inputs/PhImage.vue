<script setup>

const props = defineProps({
  src:{type:String,default:''},
  alt:{type:String,default:''},
  fit:{type:String,default:'fill'}
})
</script>

<template>
  <div :class="{
    'image-wrap':true,
    'image-fit-fill':fit==='fill'
  }">
    <img :src="src" :alt="alt">
  </div>
</template>

<style scoped>
.image-fit-fill{
  width: 240px;
  height: 314px;
  border-radius: 7px;
  position:relative;
  overflow: hidden;
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    min-width: 100%;
    min-height: 100%;
    transform:translate(-50%,-50%);
  }
}
</style>