<script setup>
import {message} from "ant-design-vue";
const api = inject('api')
const props = defineProps({
  videoEntity:{type:Object},
})
const emits = defineEmits(['handleDeleteVideoDone'])
const resourceUrl = inject('resourceUrl')

const Delete=(keyValue)=>{
  console.log('删除视频：',keyValue)
  api.videoApi.DeleteById(keyValue).then(res=>{
    if (res.isSuccess){
      message.success(res.message)
      emits('handleDeleteVideoDone',keyValue)
    }else{
      message.warning(res.message)
    }
  })
}
</script>

<template>
  <div class="video-container">
    <div class="action-wrap">
      <div class="action">
        <a-dropdown>
          <MenuOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <div class="menu-item-wrap">
                  <router-link :to="'/video/'+videoEntity.id">
                    <PlayCircleOutlined style="margin-right: 5px;color:#4a9cfa" type="primary"/>
                    <span>播放</span>
                  </router-link>
                </div>
              </a-menu-item>
              <a-menu-item>
                <div class="menu-item-wrap">
                  <EditOutlined style="margin-right: 5px;color:#797878" type="primary"/>
                  <span>编辑</span>
                </div>
              </a-menu-item>
              <a-menu-item>
                <div class="menu-item-wrap">
                  <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="Delete(videoEntity.id)">
                    <DeleteOutlined style="color: #d81e06;margin-right: 5px" />
                    <span>删除</span>
                  </a-popconfirm>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="video-cover-wrap">
      <a-image width="100%"
               :src="resourceUrl+videoEntity.coverUrl"
               fallback="data:image/png;base64,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"/>
</div>
    <div class="video-info">
      <div class="title">
        <router-link :to="'/video/'+videoEntity.id">
          <span class="title-content" v-if="videoEntity.title">{{videoEntity.title}}</span>
          <span class="title-content" v-else>（暂无标题）</span>
        </router-link>
      </div>
      <div class="info">
        <div class="user-cover-wrap">
          <a-image src="/src/assets/logo.png"/>
        </div>
        <div class="user-info-wrap">
          <p class="name">测试用户</p>
          <p v-if="videoEntity.releaseTime" class="release-time">{{videoEntity.releaseTime}}</p>
          <p v-else class="release-time">{{videoEntity.addTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.video-container{
  box-shadow: 1px 1px 7px 1px #00000059;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;

  .video-cover-wrap{
    width: 100%;
    height: 145px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: #b7b7b7;

  }

  .action-wrap{
    position: absolute;
    margin: 5px 0 0 5px;
    //width: 100%;
    .action{
      position: relative;
      z-index: 999;
      //background-color: rgba(0, 0, 0, 0.21);
      padding: 2px 2px;
      border-radius: 30%;
      color: #ffffff;
    }
  }

  .video-info{
    padding: 0 7px 10px 7px;
    .title{
      color: var(--text1);
      font-size: 14px;
      line-height: 22px;
      height: calc(2* 22px);
      display: -webkit-flex;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      //word-break: break-word !important;
      word-break: break-all;
      line-break: anywhere;
      -webkit-line-clamp: 2;
      border: 0;
      font-family: inherit;
      font-weight: 400;
      font-style: normal;

      .title-content{
        transition: 0.3s;
        &:hover{
          transition: 0.3s;
          color: var(--text_link);
        }
      }

    }
    .info{
      display: flex;
      align-items: center;
      margin-top: 0.3em;
      .user-cover-wrap{
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 5px;
      }
      .user-info-wrap{
        //display: flex;
        font-size: 13px;
        color: #9a99a0;
        .name{
          font-weight: 600;
        }
        .release-time{
          font-size: 12px;
        }
      }
    }
  }
}

.menu-item-wrap{
  display: flex;
  align-items: center;
}
</style>