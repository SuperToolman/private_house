<script setup>

</script>

<template>
  <a-timeline>
    <a-timeline-item color="green">创建服务网站 2015-09-01</a-timeline-item>
    <a-timeline-item color="green">创建服务网站 2015-09-01</a-timeline-item>
    <a-timeline-item color="red">
      <p>解决初步网络问题 1</p>
      <p>解决初步网络问题 2</p>
      <p>解决初步网络问题 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item>
      <p>技术测试 1</p>
      <p>技术测试 2</p>
      <p>技术测试 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item color="gray">
      <p>技术测试 1</p>
      <p>技术测试 2</p>
      <p>技术测试 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item color="gray">
      <p>技术测试 1</p>
      <p>技术测试 2</p>
      <p>技术测试 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item color="#00CCFF">
      <template #dot>
        <SmileOutlined />
      </template>
      <p>自定义颜色测试</p>
    </a-timeline-item>
  </a-timeline>
</template>

<style scoped>

</style>