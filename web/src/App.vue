<template>
  <div class="content">
    <Menu></Menu>
    <div style="width:100%">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
  import Menu from './components/Menu.vue'
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  list-style: none;
}

.content{
  display: flex;
}
</style>
