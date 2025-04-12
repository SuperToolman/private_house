<template>
  <PhViewLayout :title="`用户信息-${userId}`">
    <div class="user-info-layout">
      <!-- 左侧作品区域 -->
      <section class="works-section">
        <!-- 作品类型菜单 -->
        <div class="works-menu">
          <a-menu v-model:selectedKeys="selectedWorkType" mode="horizontal" :items="workTypeMenuItems"
            @select="handleWorkTypeSelect" />
        </div>

        <!-- 作品内容区域 -->
        <div class="works-content">
          <template v-if="worksData.length">
            <div class="works-grid">
              <PhCard v-for="work in worksData" :key="work.id" class="work-card">
                <div class="work-cover">
                  <img :src="work.cover" :alt="work.title" />
                </div>
                <div class="work-content">
                  <h3 class="work-title">{{ work.title }}</h3>
                  <div class="work-info">
                    <span class="views">{{ work.views }}次观看</span>
                    <span class="date">{{ formatDate(work.createTime) }}</span>
                  </div>
                </div>
              </PhCard>
            </div>
          </template>
          <a-empty v-else :description="`暂无${getCurrentWorkTypeName()}作品`" />
        </div>
      </section>

      <!-- 右侧用户信息 -->
      <PhCard class="user-profile">
        <!-- 用户基本信息卡片 -->
        <section class="profile-header">
          <div class="header-main">
            <!-- 左侧头像 -->
            <div class="avatar-wrapper">
              <a-avatar 
                :size="80" 
                :src="userEntity.haveAvatar ? resourceByUserAvatarUrl + userEntity.uuid + '.webp' : null"
              >
                {{ userEntity.name?.[0]?.toUpperCase() }}
              </a-avatar>
            </div>

            <!-- 右侧用户信息 -->
            <div class="user-info">
              <!-- 用户名和等级 -->
              <div class="name-level-row">
                <h1>{{ userEntity.name }}</h1>
                <span class="level-tag">LV.{{ userEntity.level }}</span>
              </div>
              
              <!-- UUID -->
              <div class="uuid-row">
                UUID: {{ userEntity.uuid }}
              </div>

              <!-- 注册时间 -->
              <div class="register-time">
                <CalendarOutlined />
                注册于 {{ formatDate(userEntity.addTime) }}
              </div>

              <!-- 经验值进度条 -->
              <div class="exp-bar">
                <div class="exp-info">
                  <span>经验值：{{ userEntity.nowExp }}/{{ userEntity.nextExp }}</span>
                </div>
                <a-progress 
                  :percent="calculateExpPercent()" 
                  :show-info="false" 
                  :stroke-color="{
                    from: 'var(--primary-color)',
                    to: 'var(--success-color)'
                  }" 
                  :stroke-width="6"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 用户详细信息表单 -->
        <section class="profile-details">
          <div class="details-grid">
            <div v-for="(field, key) in editableFields" :key="key" class="detail-item"
              :class="{ 'span-2': field.span === 2 }" style="display: flex;align-items:center;">
              
              <div class="detail-label">
                {{ field.label }}
                <InfoCircleOutlined v-if="field.tooltip" class="tooltip-icon" :title="field.tooltip" />
              </div>
              <div class="detail-content" @click.stop="startEdit(key)">
                <!-- 编辑状态 -->
                <template v-if="editState[key]">
                  <div class="edit-wrapper">
                    <!-- 密码输入框 -->
                    <template v-if="field.component === 'a-input-password'">
                      <a-input-password v-model:value="tempValues[key]"
                        :placeholder="field.placeholder || field.default" :visibilityToggle="true" />
                    </template>

                    <!-- 只读文本 -->
                    <template v-else-if="field.component === 'text'">
                      <div class="readonly-text">
                        {{ field.format ? field.format(userEntity[key]) : (userEntity[key] || field.default) }}
                      </div>
                    </template>

                    <!-- 其他输入组件 -->
                    <template v-else>
                      <component :is="field.component" v-model:value="tempValues[key]" v-bind="field.props || {}"
                        :placeholder="field.placeholder || field.default" />
                    </template>

                    <!-- 操作按钮 -->
                    <div class="action-buttons" v-if="field.editable !== false">
                      <a-tooltip title="保存">
                        <a-button type="primary" size="small" @click.stop="handleSubmit(key)">
                          <template #icon>
                            <CheckOutlined />
                          </template>
                        </a-button>
                      </a-tooltip>
                      <a-tooltip title="取消">
                        <a-button danger size="small" @click.stop="handleCancel(key)">
                          <template #icon>
                            <CloseOutlined />
                          </template>
                        </a-button>
                      </a-tooltip>
                    </div>
                  </div>
                </template>

                <!-- 显示状态 -->
                <div v-else class="content-display">
                  <!-- 密码字段特殊处理 -->
                  <template v-if="key === 'password'">
                    <span>{{ passwordVisible ? userEntity[key] : '••••••••' }}</span>
                    <EyeOutlined v-if="!passwordVisible" class="password-toggle" @click.stop="passwordVisible = true" />
                    <EyeInvisibleOutlined v-else class="password-toggle" @click.stop="passwordVisible = false" />
                  </template>
                  <!-- 其他字段 -->
                  <template v-else>
                    <span class="field-value">
                      {{ field.format ? field.format(userEntity[key]) : (userEntity[key] || field.default) }}
                    </span>
                    <EditOutlined v-if="field.editable !== false" class="edit-icon" title="点击编辑" />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- 用户标签区域 -->
          <section class="tags-section">
            <div class="section-title">
              <TagsOutlined />
              <span>用户标签</span>
            </div>
            <div class="tags-content">
              <template v-if="userEntity.tags?.length">
                <a-tag v-for="tag in userEntity.tags" :key="tag" :color="getTagColor(tag)">
                  {{ tag }}
                </a-tag>
              </template>
              <span v-else class="no-tags">暂无标签</span>
            </div>
          </section>

          <!-- 新增关联平台区块 -->
          <section class="platform-links-section">
            <div class="section-header">
              <div class="section-title">
                <LinkOutlined />
                <span>关联平台</span>
              </div>
              <a-button type="primary" @click="showAddPlatformModal">
                <PlusOutlined />添加平台
              </a-button>
            </div>
            <div class="platform-links-content">
              <template v-if="userEntity.otherPlatformItems?.length">
                <PhCard v-for="platform in userEntity.otherPlatformItems" :key="platform.id" class="platform-card">
                  <div class="platform-content" @click="openPlatformLink(platform.link)">
                    <div class="platform-header">
                      <span class="platform-name">
                        <svg class="icon" aria-hidden="true">
                          <use :xlink:href="'#' + getPlatformIconClass(platform.name)"></use>
                        </svg>
                        {{ platform.name }}
                      </span>
                      <div class="card-actions">
                        <EditOutlined class="action-icon edit-icon" @click.stop="showEditPlatformModal(platform)" />
                        <DeleteOutlined class="action-icon delete-icon" @click.stop="confirmDelete(platform)" />
                      </div>
                    </div>
                    <div class="platform-info">
                      <span class="platform-link">{{ platform.link }}</span>
                      <span class="platform-time">添加于 {{ formatDateTime(platform.addTime) }}</span>
                    </div>
                  </div>
                </PhCard>
              </template>
              <a-empty v-else description="暂无关联平台" />
            </div>
          </section>
        </section>
      </PhCard>
    </div>

    <!-- 添加/编辑平台的模态框 -->
    <a-modal v-model:visible="platformModalVisible" :title="isEditing ? '编辑平台链接' : '添加平台链接'" @ok="handlePlatformSubmit"
      @cancel="handlePlatformCancel">
      <a-form :model="platformForm" layout="vertical">
        <a-form-item label="平台链接" required>
          <a-input v-model:value="platformForm.link" placeholder="请输入平台链接" :status="platformForm.link ? '' : 'error'" />
        </a-form-item>
      </a-form>
    </a-modal>
  </PhViewLayout>
</template>

<script setup>
import { ref, inject, onMounted, h } from 'vue';
import { useRoute } from 'vue-router';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  TagsOutlined,
  LinkOutlined,
  PlusOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons-vue';
import { getPlatformIconClass } from '@common/js/platformIcons';
import { message, Modal } from 'ant-design-vue';


// 路由参数
const route = useRoute();
const userId = route.params.userId;

// 注入的全局变量
const resourceByUserAvatarUrl = inject('resourceByUserAvatarUrl');
const api = inject('api');

// 用户数据
const userEntity = ref({});
const passwordVisible = ref(false);

/**
 * 获取用户信息
 */
const fetchUserData = async () => {
  try {
    const res = await api.userApi.GetById(userId);
    if (res.isSuccess) {
      userEntity.value = res.data;
      console.log("获取用户详细数据", userEntity.value);
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

// 初始化数据
fetchUserData();

/**
 * 日期时间格式化
 */
const formatDateTime = (datetime) => {
  if (!datetime) return '未知';
  return datetime.replace('T', ' ');
};

const formatDate = (date) => {
  if (!date) return '未知';
  return date.split('T')[0];
};

/**
 * 性别文本转换
 */
const getSexText = (sex) => {
  const sexMap = {
    0: '保密',
    1: '男',
    2: '女'
  };
  return sexMap[sex] || '未设置';
};

/**
 * 计算经验值百分比
 */
const calculateExpPercent = () => {
  if (!userEntity.value.nextExp) return 0;
  return (userEntity.value.nowExp / userEntity.value.nextExp) * 100;
};

/**
 * 获取标签颜色
 */
const getTagColor = (tag) => {
  // 这里可以根据标签内容返回不同的颜色
  const colors = ['blue', 'green', 'cyan', 'purple'];
  return colors[Math.abs(tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length];
};

// 编辑状态
const editState = ref({
  eMail: false,
  phone: false,
  sex: false,
  birthday: false,
  sign: false,
  password: false,
});

// 临时存储编辑值
const tempValues = ref({
  eMail: '',
  phone: '',
  sex: null,
  birthday: '',
  sign: '',
  password: '',
});

// 开始编辑
const startEdit = (field) => {
  // 如果有其他字段正在编辑，先保存它们的值
  Object.keys(editState.value).forEach(key => {
    if (editState.value[key] && key !== field) {
      handleSubmit(key);
    }
  });

  // 初始化临时值
  if (field === 'sex') {
    // 性别字段特殊处理，确保是数字类型
    tempValues.value[field] = userEntity.value[field] !== undefined
      ? Number(userEntity.value[field])
      : 0;
  } else {
    tempValues.value[field] = userEntity.value[field] || '';
  }

  // 设置编辑状态
  editState.value[field] = true;
};

// 提交更新
const handleSubmit = (field) => {
  console.log('更新字段:', field, '新值:', tempValues.value[field]);
  // TODO: 调用API更新数据
  // 更新本地数据
  userEntity.value[field] = tempValues.value[field];
  // 关闭编辑状态
  editState.value[field] = false;
};

// 取消编辑
const handleCancel = (field) => {
  editState.value[field] = false;
};

// 定义可编辑字段配置
const editableFields = {
  eMail: {
    label: '邮箱',
    component: 'a-input',
    default: '未设置'
  },
  phone: {
    label: '手机',
    component: 'a-input',
    default: '未设置'
  },
  sex: {
    label: '性别',
    component: 'a-select',
    props: {
      options: [
        { value: 0, label: '保密' },
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ]
    },
    format: getSexText,
    default: '未设置'
  },
  birthday: {
    label: '生日',
    component: 'a-date-picker',
    props: {
      valueFormat: 'YYYY-MM-DD'
    },
    format: formatDate,
    default: '未设置'
  },
  password: {
    label: '密码',
    component: 'a-input-password',
    default: '未设置',
    props: {
      visibilityToggle: true
    }
  },
  sign: {
    label: '简介',
    component: 'a-textarea',
    props: { rows: 2 },
    default: '这个人很懒，什么都没写~'
  },
};

const loadIconfont = () => {
  const script = document.createElement('script');
  script.src = '//at.alicdn.com/t/c/font_4881729_6gkjv92izl3.js';
  document.head.appendChild(script);
};

// 添加打开平台链接的方法
const openPlatformLink = (url) => {
  window.open(url, '_blank');
};

// 平台操作相关的状态
const platformModalVisible = ref(false);
const isEditing = ref(false);
const platformForm = ref({
  id: null,
  link: ''
});

// 显示添加平台模态框
const showAddPlatformModal = () => {
  isEditing.value = false;
  platformForm.value = { id: null, link: '' };
  platformModalVisible.value = true;
};

// 显示编辑平台模态框
const showEditPlatformModal = (platform) => {
  isEditing.value = true;
  platformForm.value = {
    id: platform.id,
    link: platform.link
  };
  platformModalVisible.value = true;
};

// 处理平台表单提交
const handlePlatformSubmit = async () => {
  if (!platformForm.value.link) {
    message.error('请输入平台链接');
    return;
  }

  try {
    if (isEditing.value) {
      // 编辑平台链接
      const res = await api.userApi.EditOtherPlatformLink(
        platformForm.value.id,
        platformForm.value.link
      );
      if (res.isSuccess) {
        message.success('平台链接修改成功');
      }
    } else {
      // 添加平台链接
      const res = await api.userApi.AddOtherPlatformLink(
        userId,
        platformForm.value.link
      );
      if (res.isSuccess) {
        message.success('平台链接添加成功');
      }
    }
    // 刷新数据
    await fetchUserData();
    platformModalVisible.value = false;
  } catch (error) {
    message.error('操作失败: ' + error.message);
  }
};

// 处理模态框取消
const handlePlatformCancel = () => {
  platformModalVisible.value = false;
  platformForm.value = { id: null, link: '' };
};

// 确认删除平台
const confirmDelete = (platform) => {
  const { id, name } = platform;
  const modal = Modal.confirm({
    title: '确认删除',
    content: `确定要删除 ${name} 平台链接吗？`,
    okText: '确认',
    cancelText: '取消',
    okType: 'danger',
    async onOk() {
      try {
        const res = await api.userApi.RemoveOtherPlatformLink(id);
        if (res.isSuccess) {
          message.success('平台链接删除成功');
          await fetchUserData();
        }
      } catch (error) {
        message.error('删除失败: ' + error.message);
      }
    }
  });
};

// 作品类型菜单配置
const workTypeMenuItems = [
  {
    key: 'video',
    label: '视频',
    icon: () => h(PlayCircleOutlined)
  },
  {
    key: 'comic',
    label: '漫画',
    icon: () => h(PictureOutlined)
  },
  {
    key: 'music',
    label: '音乐',
    icon: () => h(CustomerServiceOutlined)
  }
];

// 当前选中的作品类型
const selectedWorkType = ref(['video']);

// 测试数据
const worksData = ref([
  {
    id: 1,
    type: 'video',
    title: '测试视频1',
    cover: 'https://picsum.photos/300/169',
    views: 1234,
    createTime: '2024-04-01T12:00:00'
  },
  {
    id: 2,
    type: 'video',
    title: '测试视频2',
    cover: 'https://picsum.photos/300/169',
    views: 5678,
    createTime: '2024-04-02T14:30:00'
  },
  {
    id: 3,
    type: 'comic',
    title: '测试漫画1',
    cover: 'https://picsum.photos/300/400',
    views: 9012,
    createTime: '2024-04-03T09:15:00'
  },
  {
    id: 4,
    type: 'music',
    title: '测试音乐1',
    cover: 'https://picsum.photos/300/300',
    views: 3456,
    createTime: '2024-04-04T16:45:00'
  }
]);

// 处理作品类型选择
const handleWorkTypeSelect = ({ key }) => {
  // 这里可以根据类型筛选数据
  console.log('选择作品类型:', key);
};

// 获取当前作品类型名称
const getCurrentWorkTypeName = () => {
  const typeMap = {
    video: '视频',
    comic: '漫画',
    music: '音乐'
  };
  return typeMap[selectedWorkType.value[0]] || '未知';
};

onMounted(() => {
  loadIconfont();
  fetchUserData();
});
</script>

<style scoped lang="scss">
.stats-section {
  display: flex;
  gap: 24px;
  margin-top: 8px;

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .value {
      font-size: 18px;
      font-weight: bold;
      color: var(--text1);
    }

    .label {
      color: var(--text3);
      font-size: 14px;
    }
  }
}

.user-info-layout {
  display: flex;
  gap: 12px;
  min-height: calc(100vh - 180px); // 减去头部和其他间距

  .works-section {
    flex: 1;
    background: var(--bg1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    .works-menu {
      padding: 0 16px;
      border-bottom: 1px solid var(--border-color);
    }

    .works-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;

      .works-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;

        .work-card {
          background: var(--bg2);
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .work-cover {
            margin: -15px -15px 12px -15px;

            img {
              width: 100%;
              height: 169px; // 16:9 比例
              object-fit: cover;
              border-radius: 8px 8px 0 0;
            }
          }

          .work-content {
            .work-title {
              margin: 0 0 8px 0;
              font-size: 14px;
              color: var(--text1);
            }

            .work-info {
              display: flex;
              justify-content: space-between;
              color: var(--text3);
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .user-profile {
    width: 400px;
    flex-shrink: 0;
    // 添加卡片阴影和过渡效果
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .profile-header {
      margin: -15px -15px 16px -15px;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--bg2) 0%, var(--bg1) 100%);
      border-radius: 8px 8px 0 0;

      .header-main {
        display: flex;
        gap: 20px;
        align-items: flex-start;

        .avatar-wrapper {
          flex-shrink: 0;
          
          :deep(.ant-avatar) {
            border: 3px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
        }

        .user-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;

          .name-level-row {
            display: flex;
            align-items: center;
            gap: 12px;

            h1 {
              margin: 0;
              font-size: 20px;
              font-weight: 600;
              color: var(--text1);
            }

            .level-tag {
              background: var(--primary-color);
              color: white;
              padding: 2px 10px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
          }

          .uuid-row {
            font-size: 13px;
            color: var(--text3);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .register-time {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text3);

            .anticon {
              font-size: 14px;
              color: var(--text3);
            }
          }

          .exp-bar {
            margin-top: 4px;

            .exp-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              font-size: 12px;
              color: var(--text3);
            }

            :deep(.ant-progress) {
              margin-bottom: 0;
              line-height: 1;

              .ant-progress-outer {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
              }
            }
          }
        }
      }
    }

    .profile-details {
      padding: 0 24px;

      .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 24px;

        .detail-item {
          &.span-2 {
            grid-column: span 2;
          }

          .detail-label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text2);
            font-size: 14px;
            margin-bottom: 8px;
            margin-right: 10px;

            .tooltip-icon {
              color: var(--text3);
              cursor: help;
            }
          }

          .detail-content {
            flex: 1;
            position: relative;

            .content-display {
              padding: 8px 12px;
              background: var(--bg2);
              border-radius: 6px;
              min-height: 40px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              transition: all 0.3s;

              &:hover {
                background: var(--bg3);

                .edit-icon {
                  opacity: 1;
                }
              }

              .edit-icon {
                opacity: 0;
                color: var(--primary-color);
                transition: all 0.3s;
              }
            }

            .edit-wrapper {
              display: flex;
              gap: 8px;
              align-items: flex-start;
              width: 100%;
              background: var(--bg2);
              padding: 8px 12px;
              border-radius: 6px;

              :deep(.ant-input),
              :deep(.ant-select),
              :deep(.ant-picker),
              :deep(.ant-textarea) {
                flex: 1;
                width: 100%;
              }

              .action-buttons {
                display: flex;
                flex-direction: row;
                gap: 8px;
                flex-shrink: 0;
              }
            }
          }
        }
      }

      .tags-section {
        margin-top: 32px;

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 500;
          color: var(--text2);
          margin-bottom: 16px;

          .anticon {
            color: var(--primary-color);
          }
        }

        .tags-content {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          :deep(.ant-tag) {
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 13px;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-2px);
            }
          }

          .no-tags {
            color: var(--text3);
            font-style: italic;
          }
        }
      }

      .platform-links-section {
        margin-top: 32px;

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .platform-links-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;

          .platform-card {
            background: var(--bg2);
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .platform-content {
              .platform-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;

                .platform-name {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  font-size: 16px;
                  font-weight: 500;
                  color: var(--text1);

                  .icon {
                    font-size: 18px;
                    color: var(--primary-color);
                  }
                }

                .card-actions {
                  display: flex;
                  gap: 12px;

                  .action-icon {
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s;

                    &.edit-icon {
                      color: var(--text3);

                      &:hover {
                        color: var(--primary-color);
                        transform: scale(1.1);
                      }
                    }

                    &.delete-icon {
                      color: var(--text3);

                      &:hover {
                        color: var(--error-color);
                        transform: scale(1.1);
                      }
                    }
                  }
                }
              }

              .platform-info {
                display: flex;
                flex-direction: column;
                gap: 4px;

                .platform-link {
                  color: var(--text2);
                  font-size: 14px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                .platform-time {
                  color: var(--text3);
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.content-display {
  .password-toggle {
    cursor: pointer;
    color: var(--primary-color);
    font-size: 16px;

    &:hover {
      color: var(--primary-color-hover);
    }
  }
}

.readonly-text {
  color: var(--text3);
  padding: 4px 8px;
}

// 确保密码输入框样式正确
:deep(.ant-input-password) {
  width: 100%;
}

/* 添加 svg 图标样式 */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
