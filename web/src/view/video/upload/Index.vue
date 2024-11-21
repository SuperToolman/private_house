<script setup>
const activeKey = ref(1)
</script>

<template>
  <PhCard>
    <router-link :class="{'link-item':true,'activate':activeKey===1}" @click="activeKey=1" to="/video/upload">视频上传</router-link>
    <router-link :class="{'link-item':true,'activate':activeKey===2}" @click="activeKey=2" to="/video/upload/difference">差分视频上传</router-link>
    <router-link :class="{'link-item':true,'activate':activeKey===3}" @click="activeKey=3" to="/video/upload/collection">视频合集上传</router-link>
  </PhCard>

  <!--content-->
  <router-view/>
</template>

<style scoped>
.link-item{
  font-size: 14px;
  margin-right: 20px;
  transition: 0.3s;
  &:hover{
    color: #00AEEC;
    transition: 0.3s;
  }
}.activate{
   color: #00AEEC;
 }
</style>