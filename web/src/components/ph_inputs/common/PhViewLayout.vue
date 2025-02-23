<script setup>
const router = useRouter()
const props = defineProps({
  title:{type:String,default:''},
  subTitle:{type:String,default:''},

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
  <div class="view-layout-wrap">
    <ph-page-header :title="title" :sub-title="subTitle">
      <slot name="view-tool"></slot>
    </ph-page-header>

    <div class="view-body">
      <slot class="view-body-content">
      </slot>
    </div>
  </div>

</template>

<style scoped>
.view-layout-wrap{
  height: 100%;
  display: flex;
  flex-direction: column;

  .view-body{
    flex: 1;
    min-height: 1vh;
    .view-body-content{
      min-height: 1vh;
    }
  }
}

</style>