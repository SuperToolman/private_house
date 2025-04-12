<script setup>
import { ref } from 'vue';
import PhFromLayout from "@components/ph_inputs/common/PhViewLayout.vue";
import PhCard from "@components/ph_inputs/common/PhCard.vue";
const activeKey = ref(0);
const handleClick = (index) => {activeKey.value = index;};
</script>

<template>
  <PhFromLayout title="系统设置" sub-title="管理系统">
    <div class="container">
      <ph-card>
        <div class="link-list-wrap">
          <div class="link-list">
            <div :class="{'link-item':true,'active-link':activeKey === 0}" @click="handleClick(0)">
              <router-link to="/system/config/app">系统设置</router-link>
            </div>
            <div :class="{'link-item':true,'active-link':activeKey === 1}" @click="handleClick(1)">
              <router-link to="/system/config/nginx">Nginx设置</router-link>
            </div>
            <div :class="{'link-item':true,'active-link':activeKey === 2}" @click="handleClick(2)">
              <router-link to="/system/config/db">数据库配置</router-link>
            </div>
          </div>
        </div>
      </ph-card>
      <router-view/>
    </div>
  </PhFromLayout>
</template>


<style scoped>
.link-list-wrap {
  .link-list {
    display: flex;
    align-items: center;
    overflow: hidden;

    .link-item {
      padding: 8px;
    }

    .active-link a{
      color: #69B1FF !important; /* 确保样式应用 */
    }
  }

  .container {
    padding: 20px;
  }
}
</style>
