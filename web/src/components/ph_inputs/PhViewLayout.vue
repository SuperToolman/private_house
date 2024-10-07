<script setup>
import {useRouter} from "vue-router";
import PhPageHeader from "@components/ph_inputs/PhPageHeader.vue";

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
<!--  <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="title" :sub-title="subTitle" @back="handleBack">-->
<!--    <template #extra>-->
<!--      <slot name="form-tools">-->

<!--      </slot>-->
<!--&lt;!&ndash;      <a-button v-if="isAdd" type="primary" @click="addEvent">添加</a-button>&ndash;&gt;-->
<!--    </template>-->
<!--  </a-page-header>-->
  <slot>

  </slot>
</template>

<style scoped>

</style>