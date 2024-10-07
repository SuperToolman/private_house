<script setup>
import PhViewLayout from "@components/ph_inputs/PhViewLayout.vue";
import {inject, onMounted, ref} from "vue";
import {DeleteOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons-vue";
import Form from "@view/video/area/components/form.vue";
import {api} from "@request/mangement";

const props = defineProps({
  title:{type:String},
  subTitle:{type:String},

  isAdd:{type:Boolean,default:false},
  isDelete:{type:Boolean,default:false},
  isEdit:{type:Boolean,default:false},

  tableColumns:{type:Array},
  tableData:{type:Array},
  formComponent:{type:Object},
  formWidth:{type:String}


})

const formEntity = ref(null)
const formOpenStatus = ref(false)
const formTitle = ref('Title')

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


// 定义处理事件的方法
// #regin test
const handleEventAdd = () => {
  // 同时修改formOpenStatus和formTitle
  formOpenStatus.value = true;
  formTitle.value = '添加';
  formEntity.value = null
};
const handleEventEdit = (entity) =>{
  // 同时修改formOpenStatus和formTitle
  formOpenStatus.value = true;
  formTitle.value = '修改';
  formEntity.value = entity
}
const handleEventDelete = id =>{
  api.systemMenuApi.DeleteById(id).then(res=>{
    if (res.isSuccess){
      console.log(res)
    }
  }).catch(error=>{
    console.error(error);
  })
}
// #endregin
</script>

<template>

    <PhViewLayout
        :title="title"
        :sub-title="subTitle"
        :is-add="isAdd"
        :add-event="handleEventAdd">

      <!--表格-->
      <a-card :bordered="false" style="margin: 20px">
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
          <span>
          <!--编辑-->
          <a-tooltip v-if="isEdit">
            <template #title>编辑</template>
            <EditOutlined style="margin-right: 5px;color:#797878" type="primary" @click="handleEventEdit(record)"/>
          </a-tooltip>

            <!--删除-->
          <a-tooltip v-if="isDelete" placement="bottom">
            <template #title>删除</template>
            <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="handleEventDelete(record.id)">
            <DeleteOutlined style="color: #d81e06" />
          </a-popconfirm>
          </a-tooltip>
          <a-divider type="vertical"/>

            <!--查看更多-->
          <a-tooltip>
            <template #title>查看更多</template>
            <MoreOutlined />
          </a-tooltip>
        </span>
          </template>
        </template>
      </a-table>
      </a-card>


      <!--form表单-->
      <a-modal v-if="formComponent" v-model:open="formOpenStatus" :width="formWidth" :title="formTitle">
        <template #footer>
        </template>
        <component :is="formComponent.component" :menu-entity="formEntity"/>
      </a-modal>

    </PhViewLayout>


</template>

<style scoped>
</style>
