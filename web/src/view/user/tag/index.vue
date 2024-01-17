<template>
  <Head :title="'用户标签管理'" :subTitle="'管理和查看用户们的标签信息'"/>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="_gutter" v-for="(row,index) in data" :key="index">
      <a-col :span="_span" v-for="(col,cIndex) in data[index]" :key="cIndex">
        <a-card :bordered="false">
          <a-tag style="font-weight: bold; font-size: 16px" :color="getRandomColor()">{{col.tagName}}</a-tag>

          <div style="display: flex;align-content: center;margin-top: 10px;margin-bottom: 10px">
            <a-avatar src="https://joeschmoe.io/api/v1/random">测试</a-avatar>
            <span style="line-height: 32px;margin-left: 5px">创建人</span>
          </div>

          <p>更新时间：{{formatDate(col.registerTime)}}</p>
          <template #actions>
            <edit-outlined key="edit" />
            <DeleteOutlined key="delete"/>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import Head from './components/head.vue'
import Form from './components/form.vue'
import {inject, onMounted, ref} from "vue";
import {notification} from "ant-design-vue";
import { EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';

const api = inject('api');
// mxa = 24
const _gutter = ref(16)
const _span = ref(4)
const rowSize = 24 / _span.value;
const data = ref([])

const getRandomColor = ()=> {
  // 生成一个随机的RGB颜色
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  return randomColor;
}//获取随机颜色代码
const formatDate = (dateStr)=>{
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return `${year}-${month}-${day}`
}
const dataInit = ()=>{
  api.userTagApi.Get().then(res=>{
    if (res.data.isSuccess){
      let resultData = res.data.data
      for (let i=0;i<resultData.length;i+= rowSize){
        const chunk = resultData.slice(i,i+rowSize)
        data.value.push(chunk);
      }
    }
  }).catch(error=>{
    notification['error']({message: '错误', description: `${error}`,});
  })
}




onMounted(()=>{
  dataInit();
  console.log(data.value)
})

</script>

<style scoped>

</style>