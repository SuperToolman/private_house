<script setup>
const router = useRouter()
const props = defineProps({
  title:{type:String,default:'Title'},
  subTitle:{type:String,default:'sub-title'},

  isAdd:{type:Boolean},
  isEntity:{type:Boolean},
  isDelete:{type:Boolean},

  addEvent:{type:Function}
})

const handleBack = ()=>{
  router.back()
}
</script>

<template>
  <!--头部-->
  <ph-page-header :title="title" :sub-title="subTitle">
    <slot name="view-tool"></slot>
  </ph-page-header>

  <div class="view-body">
    <slot class="view-body-content">

    </slot>
  </div>

</template>

<style scoped>
.view-body{
  min-height: 1vh;
  .view-body-content{
    min-height: 1vh;
  }
}
</style>