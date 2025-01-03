<script setup>
import {DeleteOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons-vue";

const emits = defineEmits(['handelEdit','handelDelete'])
const props = defineProps({
  chides:{type:Array}
})

const Edit = (entity)=>{
  emits("handelEdit", entity)
}
const Delete = (id)=>{
  emits("handelDelete", id)
}
</script>

<template>
  <a-collapse v-for="(item,index) in chides" :key="index">
    <a-collapse-panel key="4">
      <template #header>
        <div>
          <div><span>{{item.name}}</span></div>
        </div>
      </template>
      <div class="content">
        <a-descriptions>
          <a-descriptions-item label="区名">{{item.name}}</a-descriptions-item>
          <a-descriptions-item label="ID">{{ item.id }}</a-descriptions-item>
          <a-descriptions-item label="添加时间">{{ item.addTime }}</a-descriptions-item>
          <a-descriptions-item label="更新时间">{{ item.updateTime }}</a-descriptions-item>
          <a-descriptions-item label="描述">{{ item.desc }}</a-descriptions-item>
        </a-descriptions>
        <span class="actions">
            <!--编辑-->
          <a-tooltip>
            <template #title>编辑</template>
            <EditOutlined style="margin-right: 5px;color:#797878" type="primary" @click="Edit(item)"/>
          </a-tooltip>

          <!--删除-->
          <a-tooltip placement="bottom">
            <template #title>删除</template>
            <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="Delete(item.id)">
            <DeleteOutlined style="color: #d81e06" />
          </a-popconfirm>
          </a-tooltip>
          <!--查看更多-->
          <a-tooltip>
            <template #title>查看更多</template>
            <MoreOutlined />
          </a-tooltip>
        </span>
      </div>
      <div class="chide-area" v-if="item.chides">
        <CollapsePanel @handelDelete="Delete" @handelEdit="Edit" :chides="item.chides"/>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped>

</style>