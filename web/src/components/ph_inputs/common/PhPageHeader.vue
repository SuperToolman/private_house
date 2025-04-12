<script setup>
import {message} from "ant-design-vue";
import {useAuthStore} from "@stores/authStore";
import {useRouter} from "vue-router";

const props = defineProps({
  title:{type:String,default:'Title'},
  subTitle:{type:String,default:''},
})

const router = useRouter()
</script>

<template>
  <PhSpace flex-count="1">
    <ph-card>
      <div class="page-header">
        <div class="left">
          <img class="back-icon" src="/src/assets/HarmonyOS_Icons/ic_public_back.svg" @click="router.back()">
          <div class="title">{{title}}</div>
          <div class="sub-title">{{subTitle}}</div>
        </div>
        <div class="right">
          <slot>

          </slot>
        </div>
      </div>
    </ph-card>

  </PhSpace>
</template>

<style scoped>
.page-header{
  display: flex;
  justify-content: space-between;
  .left{
    align-items: center;
    display: flex;
    .back-icon{
      width: 16px;
      height: 16px;
      margin-right: 20px;
      cursor: pointer;
    }
    .title{
      margin-right: 12px;
      margin-bottom: 0;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sub-title{
      //margin-right: 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 1.5714285714285714;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.anime-info-wrap{
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  .anime-info{
    display: flex;
    align-items: center;

    .admin-avatar-wrap{
      margin-right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      &>*{
        width: 100%;
        height: 100%;
      }
    }

    .admin-name{
      font-size: 14px;
      color: var(--text2);
    }
  }
}

.menu-item-wrap{
  padding: 5px 12px;
}
</style>