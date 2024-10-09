<script setup>
const props = defineProps({
  data:{type:Array,default:[]}
})

const conversionColor = (stepStatus)=>{
  let result = "";
  switch (stepStatus){
    case 0: result = "blue"; break
    case 1: result = "green"; break
    case 2: result = "red"; break
    case 3: result = "gray"; break
    case 4: result = "yellow"; break
  }
  return result
}
</script>

<template>
  <a-timeline>
    <a-timeline-item
        v-for="step in data"
        :key="step.addTime"
        :color="conversionColor(step.stepStatus)">
      {{ step.content }}
    </a-timeline-item>

  </a-timeline>
</template>

<style scoped>

</style>