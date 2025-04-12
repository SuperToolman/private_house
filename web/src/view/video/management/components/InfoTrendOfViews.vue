<template>
  <!-- 绑定ECharts实例的容器 -->
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import {ref, onMounted, nextTick} from 'vue'
import * as echarts from 'echarts'

// 用来绑定ECharts实例的引用
const chartRef = ref(null)

// 最近七天的播放量数据
const recentData = [120, 132, 101, 134, 90, 230, 210] // 播放量
const recentDates = ['2023-02-12', '2023-02-13', '2023-02-14', '2023-02-15', '2023-02-16', '2023-02-17', '2023-02-18'] // 日期

// 初始化并渲染 ECharts 图表
onMounted(() => {
  // 等待下一次 DOM 更新确保 chartRef 已经正确渲染
  nextTick(() => {
    // 确保 chartRef 已经挂载
    if (chartRef.value) {
      const chartInstance = echarts.init(chartRef.value)

      // 配置 ECharts 图表
      const option = {
        title: {
          text: '最近七天播放量趋势',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: recentDates, // 横坐标为日期
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '播放量',
            type: 'line',
            stack: '总量',
            data: recentData, // 播放量数据
            areaStyle: {}, // 显示面积图样式
          },
        ],
      }

      // 设置图表的配置项
      chartInstance.setOption(option)

      // 窗口大小变化时，重新调整图表大小
      window.addEventListener('resize', () => {
        chartInstance.resize()
      })
    } else {
      console.error('Chart container not found!')
    }
  })
})
</script>

<style scoped>
/* 样式可根据需要调整 */
</style>
