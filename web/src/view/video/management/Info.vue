<script setup>
import {extractNumber, formatFileSize} from "@common/js/utils";
import {message} from "ant-design-vue";
import InfoTrendOfViews from "@view/video/management/components/InfoTrendOfViews.vue";

const resourceUrl = inject('resourceUrl')
const route = useRoute()
const api = inject('api')

const videoFullId = ref(null)
const videoId = ref('')
const videoEntity = ref({})
const videoReviewList = ref([])
const videoTagList = ref([])
const videoAreaName = ref('')

const videoSrc = ref('')
const lastPlaybackTime = ref(0); // 用于记录上次播放时间
const videoElement = ref(null); // 用于引用 <video> 元素
const videoDifferenceItemEntity = ref({})

const segmentedData = reactive(['Index排序','标题排序'])
const segmentedValue = ref(segmentedData[0])

const pushTagInputSwitch = ref(false)
const pushTagInput = ref('')

/**
 * 初始化视频数据
 * 包括基本信息、标签、差分视频等
 */
const initVideoData = async () => {
  try {
    const response = await api.videoApi.GetByIdWithType(
      videoId.value,
      videoFullId.value.includes('Std') ? 0 : 1
    )
    
    if (response?.data) {
      videoEntity.value = response.data
      videoSrc.value = resourceUrl + response.data.videoUrl
      
      // 设置视频区域名称
      videoAreaName.value = getVideoAreaName(response.data.videoUrl)
      
      // 初始化视频标签
      initVideoTags(response.data.tagString)
      
      // 初始化差分视频信息
      initDifferenceVideo(response.data)
    }
  } catch (error) {
    console.error('获取视频数据失败:', error)
    message.error('获取视频数据失败，请稍后重试')
  }
}

/**
 * 获取视频所属区域名称
 */
const getVideoAreaName = (videoUrl) => {
  if (videoUrl.includes("Temp")) return "审核池"
  return videoUrl.split('/').slice(1, 3).join(' → ')
}

/**
 * 初始化视频标签
 */
const initVideoTags = (tagString) => {
  if (tagString) {
    videoTagList.value = tagString.split(',')
  }
}

/**
 * 初始化差分视频信息
 */
const initDifferenceVideo = (videoData) => {
  if (videoData.videoType === 1 && videoData.videos?.length > 0) {
    videoDifferenceItemEntity.value = videoData.videos[0]
  }
}

/**
 * 处理标签提交
 * 清理和格式化标签字符串，并调用API更新
 */
const handleSubmitByPushTag = async () => {
  const tagString = formatTagString(pushTagInput.value)
  if (!tagString) return
  
  try {
    const response = await api.videoApi.PushTagByString(tagString, videoEntity.value.id)
    if (response.isSuccess) {
      const newTagList = tagString.split(',')
      videoTagList.value.push(...newTagList)
      resetTagInput()
    }
  } catch (error) {
    console.error('添加标签失败:', error)
    message.error('添加标签失败，请稍后重试')
  }
}

/**
 * 格式化标签字符串
 */
const formatTagString = (input) => {
  return input
    .replace(/^,+|,+$/g, '') // 去除开头和结尾的逗号
    .replace(/,+/g, ',')     // 替换连续的逗号为单个逗号
    .trim()
}

/**
 * 重置标签输入状态
 */
const resetTagInput = () => {
  pushTagInput.value = ''
  pushTagInputSwitch.value = false
}

/**
 * 处理标签移除
 */
const handleRemoveTag = async (tag) => {
  videoTagList.value = videoTagList.value.filter(x => x !== tag)
  videoEntity.value.tagString = videoTagList.value.join(',')
  
  try {
    await api.videoApi.Update(videoEntity.value)
  } catch (error) {
    console.error('移除标签失败:', error)
    message.error('移除标签失败，请稍后重试')
  }
}

/**
 * 处理差分视频切换
 * 保持播放进度的视频源切换
 */
const handleChoseDifference = (videoItem) => {
  videoDifferenceItemEntity.value = videoItem
  const newVideoSrc = `${resourceUrl}${videoItem.videoUrl}`
  
  if (newVideoSrc !== videoSrc.value) {
    switchVideoSource(newVideoSrc)
  }
}

/**
 * 切换视频源并保持播放进度
 */
const switchVideoSource = (newSrc) => {
  const savedPlaybackTime = videoElement.value?.currentTime || 0
  videoSrc.value = newSrc

  if (videoElement.value) {
    videoElement.value.onloadedmetadata = () => {
      if (savedPlaybackTime > 0) {
        videoElement.value.currentTime = savedPlaybackTime
      }
      videoElement.value.play()
    }
  }
}

/**
 * 处理视频所有者变更
 */
const handleChangeTheVideoOwner = async (userEntity) => {
  // 检查是否选择了相同用户
  if (videoEntity.value.userItem?.id === userEntity.id) {
    console.log('选择的用户为相同用户，不执行操作')
    return
  }

  try {
    videoEntity.value.userId = userEntity.id
    const response = await api.videoApi.Update(videoEntity.value)
    
    if (response.isSuccess) {
      videoEntity.value.userItem = userEntity
      message.success('更新视频归属者成功')
    }
  } catch (error) {
    console.error('更新视频归属者失败:', error)
    message.error('更新视频归属者失败，请稍后重试')
  }
}

/**
 * 移除视频所有者
 */
const handleRemoveTheVideoOwner = async () => {
  try {
    videoEntity.value.userId = null
    videoEntity.value.userItem = null
    await api.videoApi.Update(videoEntity.value)
    message.success('移除视频归属者成功')
  } catch (error) {
    console.error('移除视频归属者失败:', error)
    message.error('移除视频归属者失败，请稍后重试')
  }
}

/**
 * 处理排序方式变更
 */
const handleSegmentedChange = async () => {
  try {
    const sortType = segmentedValue.value === '标题排序' ? 1 : 0
    const response = await api.videoApi.GetByDifferenceId(videoEntity.value.id, sortType)
    
    if (response.isSuccess) {
      videoEntity.value.videos = response.data
    }
  } catch (error) {
    console.error('获取排序数据失败:', error)
    message.error('获取排序数据失败，请稍后重试')
  }
}

const getRandomColor = () => {return getRandomColorCode();}
const getConversionTime = (timeBySecond) => {return conversionTime(timeBySecond)}
// const formatFileSize = (size) =>{return formatFileSize(size)}

/**
 * 初始化视频审核历史
 * 获取视频的历史审核记录
 */
const initHistoryAudit = async () => {
  try {
    const response = await api.videoApi.GetReviewHistory(videoId.value)
    if (response?.data) {
      videoReviewList.value = response.data.map(item => ({
        ...item,
        // 根据审核状态设置时间轴的颜色
        color: getAuditStatusColor(item.auditStatus),
        // 格式化时间显示
        time: item.addTime.replace('T', ' '),
        // 设置审核状态文本
        content: getAuditStatusText(item.auditStatus)
      }))
    }
  } catch (error) {
    console.error('获取审核历史失败:', error)
    message.error('获取审核历史失败，请稍后重试')
  }
}

/**
 * 获取审核状态对应的颜色
 */
const getAuditStatusColor = (status) => {
  const statusColors = {
    0: '#909399', // 草稿
    1: '#E6A23C', // 审核中
    2: '#67C23A', // 通过
    3: '#F56C6C'  // 驳回
  }
  return statusColors[status] || '#909399'
}

/**
 * 获取审核状态对应的文本
 */
const getAuditStatusText = (status) => {
  const statusText = {
    0: '草稿',
    1: '审核中',
    2: '审核通过',
    3: '驳回'
  }
  return statusText[status] || '未知状态'
}

/**
 * 处理审核状态变更
 */
const handleAuditChange = async (auditCode) => {
  try {
    const response = await api.videoApi.UpdateAuditStatus(videoId.value, auditCode)
    if (response.isSuccess) {
      videoEntity.value.auditStatus = auditCode
      message.success(`修改视频状态为：${getAuditStatusText(auditCode)}`)
      // 重新获取审核历史
      await initHistoryAudit()
    }
  } catch (error) {
    console.error('修改审核状态失败:', error)
    message.error('修改审核状态失败，请稍后重试')
  }
}

/**
 * 处理视频驳回
 */
const handleAuditReject = async () => {
  try {
    const response = await api.videoApi.UpdateAuditStatus(videoId.value, 3) // 3 表示驳回状态
    if (response.isSuccess) {
      videoEntity.value.auditStatus = 3
      message.success('驳回视频成功')
      // 重新获取审核历史
      await initHistoryAudit()
    }
  } catch (error) {
    console.error('驳回视频失败:', error)
    message.error('驳回视频失败，请稍后重试')
  }
}

onMounted(async () => {
  videoFullId.value = route.params.videoId
  videoId.value = extractNumber(videoFullId.value)
  // 使用 Promise.all 并行加载数据
  await Promise.all([
    initVideoData(),
    initHistoryAudit()
  ])
})
</script>

<template>
  <PhViewLayout :title="videoEntity.title">
    <PhSpace flex-count="1" class="content" v-if="videoEntity">
      <div class="left">
        <ph-card style="padding: 10px">
          <video
              ref="videoElement"
              controls="controls"
              id="videoPreview"
              :src="videoSrc"
              @timeupdate="lastPlaybackTime = $event.target.currentTime"
          />
        </ph-card>
        <PhCard
            title="差分视频列表"
            v-if="videoEntity.videos">
          <template #actions>
            <div>
              <a-segmented
                v-model:value="segmentedValue"
                :options="segmentedData"
                @change="handleSegmentedChange"
              /></div>
          </template>
          <a-row :gutter="[16, 16]"> <!-- 设置行列间距 -->
            <a-col
                v-for="(videoItem, index) in videoEntity.videos"
                :key="videoItem.id"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="4"
                :xl="4.8"
            >
            <div
                class="difference-item"
                @click="handleChoseDifference(videoItem)"
            >
              <div v-if="segmentedValue === 'Index排序'" class="difference-item__index">
                {{ index + 1 }}
              </div>
              <PhImage :src="resourceUrl + videoItem.coverUrl"/>
              <div class="difference-item__title">{{ videoItem.title }}</div>
            </div>
            </a-col>
          </a-row>
        </PhCard>
        <PhSpace>
          <ph-card>
            <a-statistic title="播放量" valueStyle="color:'#fff'" :value="videoEntity.playCount"/>
          </ph-card>
          <ph-card>
            <a-statistic title="点赞数" :value="videoEntity.likeCount"/>
          </ph-card>
          <ph-card>
            <a-statistic title="收藏数" :value="videoEntity.collectCount"/>
          </ph-card>
          <ph-card>
            <a-statistic title="评论数" :value="videoEntity.collectCount"/>
          </ph-card>
        </PhSpace>
        <PhSpace>
          <ph-card>
            <a-statistic title="投币数" :value="videoEntity.coinCount" style="margin-right: 50px"/>
          </ph-card>
          <ph-card>
            <a-statistic title="转发数" :value="videoEntity.shareCount"/>
          </ph-card>
          <ph-card>
            <a-statistic title="弹幕数" :value="videoEntity.collectCount"/>
          </ph-card>
          <ph-card>
            <a-statistic title="热度量" :value="123"/>
          </ph-card>
        </PhSpace>

        <!--播放量趋势折线图-->
        <ph-card :title="'近期7日播放量趋势'">
          <!-- 异步加载 InfoTrendOfViews 组件 -->
          <Suspense>
            <template #default>
              <InfoTrendOfViews />
            </template>
            <template #fallback>
              <!-- 在异步加载过程中显示的内容 -->
              <div>加载中...</div>
            </template>
          </Suspense>
        </ph-card>
      </div>
      <div class="right">
        <!--作者信息-->
        <PhUserCard :user-entity="videoEntity.userItem" float>
          <template #actions>
            <PhSelectUserModal @handle-select-user="handleChangeTheVideoOwner">
              <template #trigger>
                <a-button>修改视频归属者</a-button>
              </template>
            </PhSelectUserModal>
            <a-popconfirm
                title="你确定要移除此视频归属者吗？?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleRemoveTheVideoOwner"
            >
              <a-button danger>移除该视频的归属者</a-button>
            </a-popconfirm>

          </template>
          <!--不存在用户的actions-->
          <template #userDontExist-actions>
            <PhSelectUserModal @handle-select-user="handleChangeTheVideoOwner">
              <template #trigger>
                <a-button type="primary">选择视频归属者</a-button>
              </template>
            </PhSelectUserModal>
          </template>
        </PhUserCard>
        <!--视频信息-->
        <ph-card>
          <a-descriptions title="视频信息" :bordered="true">
            <a-descriptions-item label="ID" :span="3">{{videoEntity.id}}</a-descriptions-item>
            <a-descriptions-item label="UUID" :span="3">{{videoEntity.uuid}}</a-descriptions-item>
            <a-descriptions-item label="标题" :span="3">{{videoEntity.title}}</a-descriptions-item>
            <a-descriptions-item label="时长" :span="3">{{ getConversionTime(videoEntity.durationBySecond) }}</a-descriptions-item>
            <a-descriptions-item label="大小" :span="3" v-if="videoEntity.videoType === 0">{{ formatFileSize(videoEntity.size)  }}</a-descriptions-item>
            <a-descriptions-item label="分辨率" :span="3" v-if="videoEntity.videoType === 0">{{ videoEntity.resolution }}</a-descriptions-item>

            <a-descriptions-item label="总大小" v-if="videoEntity.videoType === 1">{{ formatFileSize(videoEntity.size)  }}</a-descriptions-item>
            <a-descriptions-item label="大小" :span="2" v-if="videoEntity.videoType === 1">{{ formatFileSize(videoDifferenceItemEntity.size)  }}</a-descriptions-item>
            <a-descriptions-item label="分辨率" :span="3" v-if="videoEntity.videoType === 1">{{ videoDifferenceItemEntity.resolution }}</a-descriptions-item>

            <a-descriptions-item label="类型">{{videoEntity.videoType===0?"标准视频":"差分视频"}}</a-descriptions-item>
            <a-descriptions-item label="发布时间" :span="3">
            <span v-if="videoEntity.releaseTime">
              {{videoEntity.releaseTime.toString().replace('T',' — ')}}
            </span></a-descriptions-item>
            <a-descriptions-item label="分区" :span="3">{{videoAreaName}}</a-descriptions-item>
            <a-descriptions-item label="标签" :span="3">
              <a-space :wrap="true">
                <a-tag
                    v-for="tag in videoTagList"
                    :key="tag"
                    :color="getRandomColor()">{{tag}}
                  <CloseOutlined @click="handleRemoveTag(tag)"/>
                </a-tag>

                <a-tag v-if="!pushTagInputSwitch" @click="pushTagInputSwitch = true" style="cursor: pointer"><PlusOutlined /> 补充标签</a-tag>
                <div class="pushTagInput-box" v-else>
                  <div class="tips">
                    <a-alert message="多个标签请以英文逗号间隔，例如：标签1,标签2,标签3" type="info" show-icon closable></a-alert>
                  </div>
                  <div class="pushTagInput-wrap">
                    <a-input class="pushTagInput" v-model:value="pushTagInput"/>
                    <a-button type="primary" class="submit" style="margin: 0 5px" @click="handleSubmitByPushTag"><CheckOutlined /></a-button>
                    <a-button class="cancel" @click="pushTagInputSwitch = false"><CloseOutlined/></a-button>
                  </div>
                </div>
              </a-space>

            </a-descriptions-item>
            <a-descriptions-item label="简介" :span="3">{{videoEntity.desc}}</a-descriptions-item>
          </a-descriptions>
        </ph-card>




        <ph-card :title="'视频历史状态'">
          <div class="audit-status-wrap">
            <div class="audit-status-content">
              <span>当前审核状态：</span>
              <span v-if="videoEntity.auditStatus === 0"><QuestionOutlined/>草稿</span>
              <span v-else-if="videoEntity.auditStatus === 1"><ExclamationOutlined />审核中</span>
              <span v-else-if="videoEntity.auditStatus === 2"><CheckOutlined style="margin-right: 6px;color: #2AC864"/>审核通过</span>
              <span v-else-if="videoEntity.auditStatus === 3"><CloseOutlined style="margin-right: 6px;color: #c82a2a"/>驳回中</span>
            </div>
            <div class="audit-status-change-wrap">
              <a-dropdown :trigger="['click']" :placement="'bottom'">
                <a class="ant-dropdown-link" @click.prevent>
                  修改状态
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0" @click="handleAuditChange(0)">
                      <span>草稿</span>
                    </a-menu-item>
                    <a-menu-item key="1" @click="handleAuditChange(1)">
                      <span>审核中</span>
                    </a-menu-item>
                    <a-menu-item key="2" @click="handleAuditChange(2)">
                      <span>审核通过</span>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item 
                      key="3" 
                      :disabled="videoEntity.auditStatus !== 2" 
                      @click="handleAuditReject"
                    >
                      <span>驳回此视频</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>

          <PhTimeline
              style="margin-top: 20px"
              v-if="videoReviewList && videoReviewList.length >0"
              :data="videoReviewList">
          </PhTimeline>

        </ph-card>
      </div>
    </PhSpace>
  </PhViewLayout>
</template>

<style scoped>
#videoPreview {
  width: 100%; /* 或者根据需要设置宽度 */
  aspect-ratio: 1155 / 650; /* 等比宽高比 */
  background-color: #000000; /* 用于可视化 */
}


.difference-item {
  position: relative;
  width: 100%;
  border-radius: 7px;
  overflow: hidden;

  .difference-item__index {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    z-index: 2;
  }

  .difference-item__title {
    position: absolute;
    bottom: 0;
    left: 3px;
    right: 3px;
    font-weight: bold;
    color: #FFFFFF;
    z-index: 2;

    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.3;

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      left: 0;
      width: 100%;
      height: calc(200% + 20px);
      background: linear-gradient(
        to top,
        rgba(0,0,0,0.8) 0%,
        rgba(0,0,0,0) 100%
      );
      z-index: -1;
    }
  }

  &:hover {
    .difference-item__index {
      background: rgba(0, 0, 0, 0.8);
    }
  }
}
.content{

}
.right{
  min-width: 500px;

  .audit-status-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.pushTagInput-box{
  .tips{
    margin: 10px 0;
  }
  .pushTagInput-wrap{
    display: flex;
    .pushTagInput{
      .submit{
      }
    }
  }
}

</style>