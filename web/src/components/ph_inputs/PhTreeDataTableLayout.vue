<script setup>
const props = defineProps({
  tableColumns:{type:Array,default:[]},
  tableData:{type:Array,default:[]},
  formComponent:{type:Object},
  formOpenStatus:{type:Boolean,default:false},
  formModalWidth:{type:Number,default:700},
  formTitle:{type:String,default:'title'}
})
const emits = defineEmits(['handleTableColumnDeleteEvent','handleFormSubmit'])
const formEntity = ref(null)
const formModalOpenStatus = ref(false)
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
});
const onFinish = (form)=>{
  emits('handleFormSubmit',form)
  formModalOpenStatus.value = false
}
</script>

<template>
  <PhCard>
    <a-button @click="formEntity = null;formModalOpenStatus = true" type="primary">添加</a-button>
  </PhCard>
  <PhCard>
    <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :row-selection="rowSelection"
        :expand-row-by-click="true"
        :indent-size="30"
        rowKey="key"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <!--编辑-->
          <a-tooltip>
            <template #title>编辑</template>
            <EditOutlined style="margin-right: 5px;color:#797878" type="primary" @click="formEntity=record;formModalOpenStatus = true"/>
          </a-tooltip>

          <!--删除-->
          <a-tooltip placement="bottom">
            <template #title>删除</template>
            <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="emits('handleTableColumnDeleteEvent',record.id)">
              <DeleteOutlined style="color: #d81e06" />
            </a-popconfirm>
          </a-tooltip>
          <a-divider type="vertical"/>

          <!--查看更多-->
          <a-tooltip>
            <template #title>查看更多</template>
            <MoreOutlined />
          </a-tooltip>
        </template>
      </template>
    </a-table>
  </PhCard>
  <component
      :is="formComponent.component"
      :menu-entity="formEntity"
      :formOpenStatus="formModalOpenStatus"
      @on-finish="onFinish"
      @on-cancel="formModalOpenStatus = false"
  />
</template>

<style scoped>

</style>