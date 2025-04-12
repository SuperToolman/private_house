<script setup>
import { QuestionOutlined, ExclamationOutlined, CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { inject, ref, defineProps } from 'vue';

const props = defineProps({
  auditStatus: {
    type: Number,
    default: 0
  },
  mangaEntity: {
    type: Object,
    required: true
  },
});

const emit = defineEmits(['audit-change', 'audit-reject']);
const api = inject('api');

const handleAuditChange = (status) => {
  // 更新 mangaEntity 的审核状态
  const updatedMangaEntity = { ...props.mangaEntity, auditStatus: status };

  // 如果将状态改为审核通过则，调用审核接口
  if (status === 2) {
    api.mangaApi.ReviewManga(updatedMangaEntity).then(res => {
      if (res.isSuccess) {
        message.success('审核成功');
      } else {
        message.error('审核失败');
      }
    });
  }

  // 调用 Update 方法更新审核状态
  api.mangaApi.Update(updatedMangaEntity).then(res => {
    if (res.isSuccess) {
      emit('audit-change', status);
      message.success(`修改状态为：${getAuditStatusText(status)}`);
    } else {
      message.error('修改状态失败');
    }
  });
};

const handleAuditReject = () => {
  api.mangaApi.RejectManga(props.mangaEntity).then(res => {
    if (res.isSuccess) {
      message.success('已驳回此漫画');
    } else {
      message.error('驳回失败');
    }
  });
};

const getAuditStatusText = (status) => {
  switch (status) {
    case 0: return '草稿';
    case 1: return '审核中';
    case 2: return '审核通过';
    case 3: return '驳回中';
    default: return '未知状态';
  }
};
</script>

<template>
  <PhCard :title="'漫画历史状态'">
    <div class="audit-status-wrap">
      <div class="audit-status-content">
        <span>当前审核状态：</span>
        <span v-if="auditStatus === 0"><QuestionOutlined />草稿</span>
        <span v-else-if="auditStatus === 1"><ExclamationOutlined />审核中</span>
        <span v-else-if="auditStatus === 2"><CheckOutlined style="margin-right: 6px; color: #2AC864" />审核通过</span>
        <span v-else-if="auditStatus === 3"><CloseOutlined style="margin-right: 6px; color: #c82a2a" />驳回中</span>
      </div>
      <div class="audit-status-change-wrap">
        <a-dropdown :trigger="['click']" :placement="'bottom'">
          <a class="ant-dropdown-link" @click.prevent>
            修改状态
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="handleAuditChange(0)" :disabled="auditStatus === 2">
                <span>草稿</span>
              </a-menu-item>
              <a-menu-item key="1" @click="handleAuditChange(1)" :disabled="auditStatus === 2">
                <span>审核中</span>
              </a-menu-item>
              <a-menu-item key="2" @click="handleAuditChange(2)">
                <span>审核通过</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" :disabled="auditStatus !== 2" @click="handleAuditReject">
                <span>驳回此漫画</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </PhCard>
</template>

<style scoped>
.audit-status-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.audit-status-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.audit-status-change-wrap {
  display: flex;
  align-items: center;
}
</style> 