<script setup>
const props = defineProps({
  title:{type:String,default:''}
})
</script>

<template>
  <div class="card-content-wrap">
    <div class="card-content-title" v-if="title !== ''">
      <span class="card-title-text">
        {{title}}
      </span>
    </div>
    <div class="card-content-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card-content-wrap{
  padding: 15px;

  background-color: var(--bg1);
  //padding: 5px 10px;
  border-radius: 8px;
  //margin-right: 12px;
  //margin: 6px;
  margin: 0 0 10px 0;
  box-shadow: 1px 2px 3px 1px rgba(116, 116, 116, 0.15);
  //overflow: hidden;

  .card-content-title{
    //padding-left: 24px;
    //padding-top: 15px;
    //margin: 0 0 0 32px;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #222;
    line-height: 22px;
  }

  .card-content-body{
    //padding: 24px;
  }
}
</style>