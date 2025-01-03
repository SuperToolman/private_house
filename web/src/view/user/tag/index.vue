<template>
  <PhViewLayout title="用户标签" sub-title="管理用户相关标签信息">
    <PhCard>
      <div class="tags-container-wrap">
        <div class="tags-container">
          <PhTag :tag-entity="tag" v-for="tag in data" :key="tag.id"/>
        </div>
      </div>
    </PhCard>
  </PhViewLayout>
</template>

<script setup>
import PhTag from "../../../components/ph_inputs/PhTag.vue";

const api = inject('api');
const _gutter = ref(16)
const _span = ref(4)
const rowSize = 24 / _span.value;
const data= ref([])


const dataInit = ()=>{
  api.userTagApi.Get().then(res=>{
    if (res.isSuccess){
      data.value = res.data
    }
  })
}

onMounted( async ()=>{
  dataInit();
})

</script>

<style scoped>
.tags-container-wrap{
  .tags-container{
    display: grid;
    //padding: 20px;
    grid-gap: 20px;
    grid-column: span 7;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }
}
</style>