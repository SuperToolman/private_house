<script setup>
const api = inject('api')
const props = defineProps({
  videoEntity:{type:Object},
})
const emits = defineEmits(['handleDeleteVideoDone'])
const resourceUrl = inject('resourceUrl')
const resourceByUserAvatarUrl = inject('resourceByUserAvatarUrl')

const Delete=(keyValue)=>{
  api.videoApi.DeleteById(keyValue).then(res=>{
    if (res.isSuccess){
      emits('handleDeleteVideoDone',keyValue)
    }
  })
}

onMounted(()=>{
})
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
                  <router-link :to="'/video/' + (videoEntity.videoType === 0 ? 'Std' : 'Diff') + videoEntity.id">
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
      <PhImage :src="resourceUrl+videoEntity.coverUrl"/>
</div>
    <div class="video-info">
      <div class="title">
        <router-link :to="'/video/' + (videoEntity.videoType === 0 ? 'Std' : 'Diff') + videoEntity.id">
        <span class="title-content" v-if="videoEntity.title">{{videoEntity.title}}</span>
          <span class="title-content" v-else>（暂无标题）</span>
        </router-link>
      </div>
      <div class="info">
        <div class="user-cover-wrap">
          <PhImage
              v-if="videoEntity.userItem && videoEntity.userItem.haveAvatar"
              :src="resourceByUserAvatarUrl + videoEntity.userItem.uuid + '.webp'"/>
          <a-avatar v-else>未选择用户</a-avatar>
        </div>
        <div class="user-info-wrap">
          <div v-if="videoEntity.userItem" class="name">{{ videoEntity.userItem.name }}</div>
          <div v-else class="name">未选择用户</div>
          <div v-if="videoEntity.releaseTime" class="release-time">{{videoEntity.releaseTime}}</div>
          <div v-else class="release-time">{{videoEntity.addTime}}</div>
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
      //text-overflow: -o-ellipsis-lastline;
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
        height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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