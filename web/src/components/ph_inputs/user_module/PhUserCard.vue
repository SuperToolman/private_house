<script setup>
const props = defineProps({
  userEntity:{type:Object,default:{}},
  title:{type:String,default:'作者信息'},
  float:{type:Boolean,default:false}
})
const resourceByUserAvatarUrl = inject('resourceByUserAvatarUrl')
</script>

<template>
  <PhCard :title="title" :style="{'margin-top':float&&userEntity?'60px':'0px'}">
    <div class="user-container-wrap"
        v-if="userEntity">
      <!--用户头像-->
      <div :class="{
        'user-avatar-container-warp':true,
        'float':float
      }">
        <div v-if="userEntity.haveAvatar" class="haveAvatar">
          <PhImage
              :container-style="{width:'100%',height:'100%'}"
              :preview="true"
              :src="resourceByUserAvatarUrl + userEntity.uuid + '.webp'"/>
        </div>

        <a-avatar class="noHaveAvatar" v-else>{{ userEntity.name}}</a-avatar>
      </div>
      <div class="user-name">
        {{ userEntity.name }}
      </div>

      <div class="user-desc">
        <span v-if="userEntity.sign">
          {{userEntity.sign}}
        </span>
        <span v-else>该用户比较害羞，并没有留下任何简介〆(´Д｀ )</span>
      </div>

      <div class="user-data">
        <PhSpace>
          <div class="user-data-item">
            <div class="data__title">关注</div>
            <div class="data__content">12</div>
          </div>

          <div class="user-data-item">
            <div class="data__title">粉丝</div>
            <div class="data__content">12</div>
          </div>

          <div class="user-data-item">
            <div class="data__title">作品</div>
            <div class="data__content">12</div>
          </div>
        </PhSpace>
      </div>

      <div class="user-action">
        <a-button type="primary">查看用户</a-button>
        <slot name="actions"></slot>
      </div>
    </div>

    <!--用户不存在-->
    <div v-else>
      <span class="userDontExist">
        <span>未选择用户或用户不存在(＠_＠;)</span>
      </span>
      <slot name="userDontExist-actions"></slot>
    </div>
  </PhCard>
</template>

<style scoped>
/* 定义 RGB 呼吸灯的边框颜色变化动画 */
@keyframes rgbBreathingBorder {
  0% {
    border-color: rgb(255, 0, 127); /* 粉色 */
  }
  25% {
    border-color: rgb(0, 255, 127); /* 霓虹绿 */
  }
  50% {
    border-color: rgb(0, 188, 212); /* 青色 */
  }
  75% {
    border-color: rgb(155, 89, 182); /* 紫色 */
  }
  100% {
    border-color: rgb(255, 0, 127); /* 粉色 */
  }
}
.userDontExist{
  display: flex;
  color: var(--text2);
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.user-container-wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .user-avatar-container-warp{
    .haveAvatar{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;

      //box-shadow: 0 0 10px 5px rgba(152, 96, 96, 0.63), /* 紫色 */
      //0 0 15px 5px rgba(142, 197, 206, 0.4), /* 青色 */
      //0 0 20px 10px rgba(241, 8, 8, 0.26); /* 粉色 */
      /* 应用RGB呼吸灯动画 */
      border: 3px solid rgb(255, 0, 127);
      animation: rgbBreathingBorder 3s ease-in-out infinite; /* 边框颜色的循环变化动画 */
    }
    .noHaveAvatar{
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center
    }
  }.float{
  position: absolute;
  top: -90px;

     }

  .user-name{
    font-size: 16px;
    font-weight: bold;
    color:var(--text1);
    margin: 20px 0 10px 0;
  }

  .user-desc{
    font-size: 12px;
    color: var(--text3);
    margin-bottom: 20px;
    text-align: center;
    max-width: 300px; /* 限制最大高度为 300px */
    overflow: auto;    /* 超出内容显示滚动条，防止溢出 */
    word-wrap: break-word; /* 允许文字在需要时换行 */
    white-space: normal;  /* 确保文字能够换行 */
  }

  .user-data{
    margin-bottom: 15px;
    .user-data-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
      .data__title{
        font-size: 14px;
        font-weight:bold;
        color: var(--text2);
        margin-bottom: 5px;
      }
      .data__content{
        font-size: 12px;
        color: var(--text3);
      }
    }
  }

  .user-action{
    display: flex;
    &>*{
      margin: 0 6px;
    }
  }
}
</style>