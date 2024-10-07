<script setup>

const props = defineProps({
  title:{type:String}
})
</script>

<template>
  <div class="group-wrap">
    <div v-if="title" class="title">
      {{title}}
    </div>

    <div class="group">
      <slot>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.group-wrap{
  width: 100%;
  height: 100%;
}

.group-wrap .group{
  margin: 20px;
  padding: 20px;
  border: 1px solid rgba(182, 182, 182, 0.69);
  border-radius: 10px;
  //box-shadow:  0 0 5px 0 rgba(182, 182, 182, 0.69);
}
.group-wrap .title{
  float: left;
  position: absolute;
  top: 5px;
  left: 40px;
  background-color: #ffffff;
  padding: 0 15px;
}
</style>