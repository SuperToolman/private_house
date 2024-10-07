<script setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  promptText:{type:String,default:''}
})
</script>

<template>
  <div class="question-wrap">
    <a-tooltip placement="top">
      <template #title>
        <span>{{ promptText }}</span>
      </template>
      <QuestionCircleOutlined/>
    </a-tooltip>
  </div>

</template>

<style scoped>
.question-wrap{
  margin:0 20px;
}
</style>