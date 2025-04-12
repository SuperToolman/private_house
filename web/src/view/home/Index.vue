<template>
  <PhViewLayout title="控制台">
    <!-- 顶部数据概览卡片组 -->
    <div class="dashboard-overview">
      <div class="stat-card total-videos">
        <div class="icon-wrapper">
          <PlaySquareOutlined />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ statisticalData.totalCount }}</div>
          <div class="stat-label">视频总数</div>
        </div>
        <div class="stat-chart">
          <small>较前日</small>
          <span class="trend-up">+2.6%</span>
        </div>
      </div>

      <div class="stat-card storage-usage">
        <div class="icon-wrapper">
          <CloudOutlined />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ formatFileSize(statisticalData.totalSize) }}</div>
          <div class="stat-label">存储容量</div>
        </div>
        <div class="stat-chart">
          <a-progress 
            :percent="(statisticalData.totalSize / (1024 * 1024 * 1024 * 100)) * 100" 
            :stroke-color="{'0%': '#108ee9','100%': '#87d068'}"
            :show-info="false"
          />
        </div>
      </div>

      <div class="stat-card pending-reviews">
        <div class="icon-wrapper">
          <ClockCircleOutlined />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ statisticalData.approvedHaveCount }}</div>
          <div class="stat-label">待审核</div>
        </div>
        <div class="stat-chart">
          <small>预计完成时间</small>
          <span>2小时</span>
        </div>
      </div>

      <div class="stat-card approval-rate">
        <div class="icon-wrapper">
          <CheckCircleOutlined />
        </div>
        <div class="stat-content">
          <div class="stat-value">
            {{ ((statisticalData.approvedAdoptCount / (statisticalData.approvedAdoptCount + statisticalData.approvedRejectCount)) * 100).toFixed(1) }}%
          </div>
          <div class="stat-label">通过率</div>
        </div>
        <div class="stat-chart">
          <small>本周平均</small>
          <span>82.5%</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="dashboard-main">
      <!-- 左侧内容区 -->
      <div class="main-content">
        <!-- 待审核视频卡片 -->
        <PhCard class="pending-videos-card" :bordered="false">
          <template #title>
            <div class="card-title">
              <div class="title-left">
                <VideoCameraOutlined />
                <span>待审核视频</span>
                <a-tag color="warning" v-if="pendingVideos.length">
                  待处理 {{ pendingVideos.length }} 个
                </a-tag>
              </div>
              <div class="title-right">
                <a-button 
                  type="primary" 
                  size="small" 
                  :loading="approveAllLoading"
                  @click="handleApproveAll"
                  v-if="pendingVideos.length"
                >
                  <template #icon><CheckOutlined /></template>
                  一键通过
                </a-button>
                <a-button type="link" size="small" @click="toggleViewMode">
                  <template #icon>
                    <EyeOutlined v-if="viewMode === 'paged'" />
                    <UnorderedListOutlined v-else />
                  </template>
                  {{ viewMode === 'paged' ? '查看全部' : '分页查看' }}
                </a-button>
              </div>
            </div>
          </template>
          
          <div v-if="pendingVideos.length" class="video-content">
            <div class="list-header">
              <div class="header-left">
                <div class="total-info">
                  共 {{ pageData.total }} 个视频待审核
                  <span class="estimate-time">预计需要 {{ Math.ceil(pageData.total * 2) }} 分钟</span>
                </div>
                <div class="header-actions">
                  <a-button 
                    type="primary"
                    :loading="approveAllLoading"
                    @click="handleApproveAll"
                    class="approve-all-btn"
                  >
                    <template #icon><CheckOutlined /></template>
                    一键通过
                  </a-button>
                  <a-button @click="toggleViewMode">
                    <template #icon>
                      <EyeOutlined v-if="viewMode === 'paged'" />
                      <UnorderedListOutlined v-else />
                    </template>
                    {{ viewMode === 'paged' ? '查看全部' : '分页查看' }}
                  </a-button>
                </div>
              </div>
              <div class="header-right">
                <a-radio-group v-model:value="sortType" size="small">
                  <a-radio-button value="time">时间排序</a-radio-button>
                  <a-radio-button value="priority">优先级</a-radio-button>
                </a-radio-group>
              </div>
            </div>
            
            <div :class="['videos-container', { 'all-mode': viewMode === 'all' }]">
              <div class="videos-grid">
                <div 
                  v-for="video in pageData.data" 
                  :key="video.id" 
                  class="video-item"
                >
                  <VideoCard 
                    :videoEntity="video"
                    @handleDeleteVideoDone="handleVideoDelete"
                  />
                </div>
              </div>
            </div>

            <!-- 添加分页组件 -->
            <div class="pagination-wrap" v-if="viewMode === 'paged'">
              <a-pagination
                v-model:current="pageIndex"
                v-model:pageSize="pageSize"
                :total="pageData.total"
                :show-total="total => `共有 ${total} 条数据`"
                show-quick-jumper
                :page-size-options="pageSizeOptions"
                @change="handlePageChange"
                @showSizeChange="handleSizeChange"
              >
                <!-- 上下页按钮自定义 -->
                <template #itemRender="{ type, originalElement }">
                  <a-button v-if="type === 'prev'">
                    <LeftOutlined />
                  </a-button>
                  <a-button v-else-if="type === 'next'">
                    <RightOutlined />
                  </a-button>
                  <component :is="originalElement" v-else></component>
                </template>
                <!-- 每页条数选择器自定义文本 -->
                <template #buildOptionText="props">
                  <span>{{ props.value }}条/页</span>
                </template>
              </a-pagination>
            </div>
          </div>
          
          <a-empty v-else description="暂无待审核视频" />
            </PhCard>

        <!-- 审核数据统计图表 -->
        <PhCard class="analytics-card" :bordered="false">
          <template #title>
            <div class="card-title">
              <BarChartOutlined />
              <span>审核数据分析</span>
              <a-radio-group v-model:value="chartTimeRange" size="small">
                <a-radio-button value="day">今日</a-radio-button>
                <a-radio-button value="week">本周</a-radio-button>
                <a-radio-button value="month">本月</a-radio-button>
              </a-radio-group>
            </div>
          </template>
          
          <div class="chart-container">
            <div id="echarts-chart"></div>
      </div>
        </PhCard>
      </div>

      <!-- 右侧信息栏 -->
      <div class="sidebar">
        <!-- 管理员信息卡片 -->
        <PhCard class="admin-card" :bordered="false">
          <div class="admin-profile">
            <div class="admin-header">
              <a-avatar :size="64" class="admin-avatar">
                {{ adminInfo.name[0]?.toUpperCase() }}
              </a-avatar>
              <div class="admin-info">
                <h3>{{ adminInfo.name }}</h3>
                <a-tag color="blue">{{ adminInfo.role }}</a-tag>
              </div>
            </div>
            <div class="admin-stats">
              <div class="stat-item">
                <p class="value">138</p>
                <p class="label">今日审核</p>
              </div>
              <div class="stat-item">
                <p class="value">96.5%</p>
                <p class="label">准确率</p>
              </div>
              <div class="stat-item">
                <p class="value">12min</p>
                <p class="label">平均耗时</p>
              </div>
            </div>
            <div class="admin-contact">
              <a-button type="primary" block>
                <MailOutlined />
                发送消息
              </a-button>
            </div>
          </div>
        </PhCard>

        <!-- 系统信息卡片 -->
        <PhCard class="system-card" :bordered="false">
          <template #title>
            <div class="card-title">
              <AppstoreOutlined />
              <span>系统信息</span>
            </div>
          </template>
          
          <div class="system-info">
            <div class="info-item">
              <TagOutlined />
              <span class="label">版本号</span>
              <span class="value">v0.65</span>
            </div>
            <div class="info-item">
              <CodeOutlined />
              <span class="label">技术栈</span>
              <span class="value">Vue 3</span>
            </div>
            <div class="info-item features">
              <RocketOutlined />
              <span class="label">特性</span>
              <div class="feature-tags">
                <a-tag color="success">零门槛</a-tag>
                <a-tag color="processing">响应式</a-tag>
                <a-tag color="warning">简约风</a-tag>
              </div>
            </div>
          </div>
        </PhCard>

        <!-- 快捷操作卡片 -->
        <PhCard class="quick-actions" :bordered="false">
          <template #title>
            <div class="card-title">
              <ThunderboltOutlined />
              <span>快捷操作</span>
            </div>
          </template>
          
          <div class="action-grid">
            <a-button>
              <template #icon><FileAddOutlined /></template>
              添加视频
            </a-button>
            <a-button>
              <template #icon><UserAddOutlined /></template>
              新增用户
            </a-button>
            <a-button>
              <template #icon><SettingOutlined /></template>
              系统设置
            </a-button>
            <a-button>
              <template #icon><QuestionCircleOutlined /></template>
              帮助文档
            </a-button>
          </div>
        </PhCard>
      </div>
    </div>
  </PhViewLayout>
</template>

<style scoped lang="scss">
.dashboard-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;

  .stat-card {
    background: var(--bg1);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;

      .anticon {
        color: white;
      }
    }

    .stat-content {
      flex: 1;

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: var(--text1);
        line-height: 1.2;
      }

      .stat-label {
        color: var(--text3);
        font-size: 14px;
        margin-top: 4px;
      }
    }

    .stat-chart {
      position: absolute;
      right: 20px;
      bottom: 20px;
      text-align: right;

      small {
        display: block;
        color: var(--text3);
          font-size: 12px;
        margin-bottom: 4px;
      }

      .trend-up {
        color: var(--success-color);
      }
    }

    &.total-videos .icon-wrapper {
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    }

    &.storage-usage .icon-wrapper {
      background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%);
    }

    &.pending-reviews .icon-wrapper {
      background: linear-gradient(135deg, #faad14 0%, #d48806 100%);
    }

    &.approval-rate .icon-wrapper {
      background: linear-gradient(135deg, #722ed1 0%, #531dab 100%);
    }
  }
}

.dashboard-main {
  display: flex;
  gap: 10px;

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .pending-videos-card {
      .card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-left {
          display: flex;
          align-items: center;
          gap: 8px;

          .anticon {
            color: var(--primary-color);
          }

          .ant-tag {
            margin: 0 0 0 8px;
          }
        }

        .title-right {
          display: flex;
          align-items: center;
          gap: 8px;

          .ant-btn-primary {
            // background: var(--success-color);
            border-color: var(--success-color);
            color: white;

            &:hover {
              background: var(--success-color-hover);
              border-color: var(--success-color-hover);
            }

            &:active {
              background: var(--success-color-active);
              border-color: var(--success-color-active);
            }

            &.ant-btn-loading {
              opacity: 0.8;
              cursor: not-allowed;
            }
          }
        }
      }

      .video-content {
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 16px;
          background: var(--bg2);
          border-radius: 8px;

          .header-left {
            display: flex;
            align-items: center;
            gap: 24px;

            .total-info {
              color: var(--text1);
              font-weight: 500;

              .estimate-time {
                margin-left: 12px;
                color: var(--text3);
                font-size: 13px;
                font-weight: normal;
              }
            }

            .header-actions {
              display: flex;
              gap: 8px;

              .approve-all-btn {
                // background: var(--success-color);
                border:1px solid var(--success-color);
                border-color: var(--success-color);
                color: white;

                &:hover {
                  background: var(--success-color-hover);
                  border-color: var(--success-color-hover);
                }

                &:active {
                  background: var(--success-color-active);
                  border-color: var(--success-color-active);
                }

                &.ant-btn-loading {
                  opacity: 0.8;
                  cursor: not-allowed;
                }
              }
            }
          }
        }

        .videos-container {
          padding: 10px;

          &.all-mode {
            // 计算容器高度：视频卡片宽高比16:9，加上内容区域高度约50px，再乘以4行
            // 假设容器宽度为1200px，6列布局，每列宽度200px
            // 则单个卡片高度 = (200 * 9/16 + 50) ≈ 162px
            // 4行总高度 = 162px * 4 = 648px
            height: 648px; // 4行视频的固定高度
            overflow-y: auto;
            background: var(--bg2);
            border-radius: 8px;
            
            // 自定义滚动条样式
            &::-webkit-scrollbar {
              width: 6px;
            }
            
            &::-webkit-scrollbar-thumb {
              background-color: var(--scrollbar);
              border-radius: 3px;
            }
            
            &::-webkit-scrollbar-track {
              background-color: var(--bg1);
            }

            .videos-grid {
              grid-template-columns: repeat(6, 1fr) !important; // 强制6列布局
              gap: 16px;
              padding: 16px;
              
              .video-item {
                // 确保视频卡片保持16:9的比例
                :deep(.ant-card) {
                  .ant-card-cover {
                    padding-top: 56.25%; // 16:9 比例
                  }
                  
                  .ant-card-body {
                    padding: 8px;
                    height: 50px; // 固定内容区域高度
                  }
                }
              }
            }
          }

          .videos-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 10px;
            
            @media screen and (max-width: 1920px) {
              grid-template-columns: repeat(6, 1fr);
            }
            
            @media screen and (max-width: 1600px) {
              grid-template-columns: repeat(5, 1fr);
            }
            
            @media screen and (max-width: 1366px) {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        }
      }
    }

    .analytics-card {
      .chart-container {
        height: 400px;
      }
    }
  }

  .sidebar {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .admin-card {
      .admin-profile {
        .admin-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;

          .admin-avatar {
            background: var(--primary-color);
          }

          .admin-info {
            h3 {
              margin: 0 0 8px;
              font-size: 18px;
              color: var(--text1);
            }
          }
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;

          .stat-item {
            text-align: center;

            .value {
              margin: 0;
              font-size: 20px;
          font-weight: bold;
              color: var(--text1);
            }

            .label {
              margin: 4px 0 0;
              font-size: 13px;
              color: var(--text3);
            }
          }
        }
      }
    }

    .system-card {
      .system-info {
        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);

          &:last-child {
            border-bottom: none;
          }

          .anticon {
            color: var(--primary-color);
          font-size: 16px;
          }

          .label {
            color: var(--text2);
            min-width: 60px;
          }

          .value {
            color: var(--text1);
            margin-left: auto;
          }

          &.features {
            align-items: flex-start;

            .feature-tags {
              margin-left: auto;
              display: flex;
              gap: 8px;
            }
          }
        }
      }
    }

    .quick-actions {
      .action-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;

        .ant-btn {
          height: 40px;
          border-radius: 8px;
        }
      }
    }
  }
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .anticon {
    color: var(--primary-color);
  }

  .ant-radio-group {
    margin-left: auto;
  }
}

.pagination-wrap {
  margin-top: 16px;
  padding: 16px;
  background: var(--bg2);
  border-radius: 8px;
  
  :deep(.ant-pagination) {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .ant-pagination-item {
      background: var(--bg1);
      border-color: var(--border);
      
      a {
        color: var(--text1) !important;
      }
      
      &.ant-pagination-item-active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        
        a {
          // color: white !important;
        }
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      .ant-btn {
        background: var(--bg1);
        border-color: var(--border);
        color: var(--text1);
      }
    }

    .ant-pagination-options {
      .ant-select {
        .ant-select-selector {
          background: var(--bg1);
          border-color: var(--border);
          color: var(--text1);
        }
      }
    }
  }
}

.video-content {
  .video-item {
    margin-bottom: 0;
  }
}

.filter-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  
  :deep(.ant-select) {
    .ant-select-selector {
      background: var(--bg1);
      border-color: var(--border);
      color: var(--text1);
    }
  }
}

:deep(.ant-btn) {
  &.ant-btn-primary {
    // color: white !important;
  }
  
  &:not(.ant-btn-primary) {
    color: var(--text1) !important;
    background: var(--bg1);
    border-color: var(--border);
    
    &:hover {
      color: var(--primary-color) !important;
      border-color: var(--primary-color);
    }
  }
}

.videos-container {
  padding: 10px;

  &.all-mode {
    // 计算容器高度：视频卡片宽高比16:9，加上内容区域高度约50px，再乘以4行
    // 假设容器宽度为1200px，6列布局，每列宽度200px
    // 则单个卡片高度 = (200 * 9/16 + 50) ≈ 162px
    // 4行总高度 = 162px * 4 = 648px
    height: 648px; // 4行视频的固定高度
    overflow-y: auto;
    background: var(--bg2);
    border-radius: 8px;
    
    // 自定义滚动条样式
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-track {
      background-color: var(--bg1);
    }

    .videos-grid {
      grid-template-columns: repeat(6, 1fr) !important; // 强制6列布局
      gap: 16px;
      padding: 16px;
      
      .video-item {
        // 确保视频卡片保持16:9的比例
        :deep(.ant-card) {
          .ant-card-cover {
            padding-top: 56.25%; // 16:9 比例
          }
          
          .ant-card-body {
            padding: 8px;
            height: 50px; // 固定内容区域高度
          }
        }
      }
    }
  }

  .videos-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
    
    @media screen and (max-width: 1920px) {
      grid-template-columns: repeat(6, 1fr);
    }
    
    @media screen and (max-width: 1600px) {
      grid-template-columns: repeat(5, 1fr);
    }
    
    @media screen and (max-width: 1366px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

// 优化滚动效果
.videos-container.all-mode {
  scroll-behavior: smooth;
  
  // 添加阴影效果，提示可滚动
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, var(--bg2) 0%, transparent 100%);
    pointer-events: none;
  }
}

// 优化全部查看模式下的视频卡片样式
.all-mode {
  .video-item {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
}
</style>

<script setup>
import { ref, onMounted, inject, watch, onUnmounted } from 'vue';
import { formatFileSize } from "@common/js/utils";
import * as echarts from 'echarts';
import { message, Modal } from 'ant-design-vue';
import {
  PlaySquareOutlined,
  CloudOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  MailOutlined,
  AppstoreOutlined,
  TagOutlined,
  CodeOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  FileAddOutlined,
  UserAddOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  CheckOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined
} from '@ant-design/icons-vue';

// API 注入
const api = inject('api');

/**
 * 统计数据状态
 */
const statisticalData = ref({
  totalCount: 0,
  totalSize: 0,
  approvedDraftCount: 0,
  approvedHaveCount: 0,
  approvedAdoptCount: 0,
  approvedRejectCount: 0,
});

/**
 * 管理员信息状态
 */
const adminInfo = ref({
  name: '测试管理员',
  email: 'admin@example.com',
  role: '审核员',
});

/**
 * 待审核视频列表状态
 */
const pendingVideos = ref([]);

/**
 * 图表时间范围选择
 */
const chartTimeRange = ref('week');

/**
 * 排序类型
 */
const sortType = ref('time');

/**
 * 一键通过加载状态
 */
const approveAllLoading = ref(false);

/**
 * 分页相关的状态
 */
const pageIndex = ref(1);
const pageSize = ref(18);
const pageSizeOptions = [18, 36];
const pageData = ref({
  data: [],
  total: 0,
  pageSize: 18
});

// 添加查看模式状态
const viewMode = ref('paged'); // 'paged' 或 'all'

/**
 * 初始化页面数据
 */
onMounted(async () => {
  await Promise.all([
    fetchStatisticalData(),
    fetchPendingVideos()
  ]);
  initChart();
});

/**
 * 获取统计数据
 */
const fetchStatisticalData = async () => {
  try {
    const response = await api.videoApi.GetStatisticalData();
    if (response?.data) {
      statisticalData.value = {
        totalCount: response.data.totalCount || 0,
        totalSize: response.data.totalSize || 0,
        approvedDraftCount: response.data.approvedDraftCount || 0,
        approvedHaveCount: response.data.approvedHaveCount || 0,
        approvedAdoptCount: response.data.approvedAdoptCount || 0,
        approvedRejectCount: response.data.approvedRejectCount || 0,
      };
    }
  } catch (error) {
    console.error('获取统计数据失败:', error);
    // 设置默认值，确保页面可以正常显示
    statisticalData.value = {
      totalCount: 0,
      totalSize: 0,
      approvedDraftCount: 0,
      approvedHaveCount: 0,
      approvedAdoptCount: 0,
      approvedRejectCount: 0,
    };
  }
};

/**
 * 获取待审核视频（修改为分页获取）
 */
const fetchPendingVideos = async () => {
  try {
    const sortOption = sortType.value === 'time' ? 5 : -0;
    const response = await api.videoApi.CombinationQueryPaged(
      pageIndex.value,
      viewMode.value === 'all' ? 999 : pageSize.value, // 全部模式下获取所有数据
      -1,
      1,
      sortOption
    );
    
    if (response?.data) {
      pageData.value = response.data;
      pendingVideos.value = response.data.data;
    }
  } catch (error) {
    console.error('获取待审核视频失败:', error);
    pageData.value = { data: [], total: 0, pageSize: pageSize.value };
    pendingVideos.value = [];
    message.error('获取待审核视频失败，请稍后重试');
  }
};

/**
 * 处理视频删除
 */
const handleVideoDelete = (id) => {
  pendingVideos.value = pendingVideos.value.filter(v => v.id !== id);
};

/**
 * 监听时间范围变化
 */
watch(chartTimeRange, () => {
  initChart();
});

/**
 * 监听排序方式变化
 */
watch(sortType, () => {
  pageIndex.value = 1; // 重置到第一页
  fetchPendingVideos();
});

/**
 * 优化图表初始化
 */
const initChart = () => {
  try {
    const chartDom = document.getElementById('echarts-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center'
      },
      series: [
        {
          name: '审核状态',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          data: [
            { 
              value: statisticalData.value.approvedDraftCount, 
              name: '草稿',
              itemStyle: { color: '#909399' }
            },
            { 
              value: statisticalData.value.approvedHaveCount, 
              name: '待审核',
              itemStyle: { color: '#409EFF' }
            },
            { 
              value: statisticalData.value.approvedAdoptCount, 
              name: '已通过',
              itemStyle: { color: '#67C23A' }
            },
            { 
              value: statisticalData.value.approvedRejectCount, 
              name: '已驳回',
              itemStyle: { color: '#F56C6C' }
            }
          ]
        }
      ]
    };

    myChart.setOption(option);
    
    // 使用防抖处理resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        myChart.resize();
      }, 100);
    });

    // 组件卸载时清理
    onUnmounted(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      myChart.dispose();
    });
  } catch (error) {
    console.error('初始化图表失败:', error);
  }
};

/**
 * 处理一键通过
 */
const handleApproveAll = async () => {
  if (!pendingVideos.value.length) {
    message.warning('没有待审核的视频');
    return;
  }

  try {
    approveAllLoading.value = true;
    
    // 确认对话框
    const confirmed = await new Promise(resolve => {
      Modal.confirm({
        title: '批量审核确认',
        content: `确定要通过全部 ${pendingVideos.value.length} 个视频吗？`,
        okText: '确定通过',
        cancelText: '取消',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });

    if (!confirmed) {
      approveAllLoading.value = false;
      return;
    }

    // 批量审核API调用
    const videoIds = pendingVideos.value.map(video => video.id);
    const response = await api.videoApi.ApproveAll(videoIds);
    
    if (response.isSuccess) {
      message.success(`成功通过 ${pendingVideos.value.length} 个视频`);
      // 刷新数据
      await Promise.all([
        fetchStatisticalData(),
        fetchPendingVideos()
      ]);
    } else {
      throw new Error(response.message || '批量审核失败');
    }
  } catch (error) {
    console.error('批量审核失败:', error);
    message.error('批量审核失败: ' + error.message);
  } finally {
    approveAllLoading.value = false;
  }
};

/**
 * 处理页码变化
 */
const handlePageChange = (page) => {
  pageIndex.value = page;
  fetchPendingVideos();
};

/**
 * 处理每页条数变化
 */
const handleSizeChange = (current, size) => {
  pageSize.value = size;
  pageIndex.value = 1; // 重置到第一页
  fetchPendingVideos();
};

// 修改查看全部/分页查看按钮的点击处理
const toggleViewMode = async () => {
  viewMode.value = viewMode.value === 'paged' ? 'all' : 'paged';
  pageIndex.value = 1;
  await fetchPendingVideos();
  
  // 切换到全部模式时，滚动到顶部
  if (viewMode.value === 'all') {
    const container = document.querySelector('.videos-container');
    if (container) {
      container.scrollTop = 0;
    }
  }
};
</script>