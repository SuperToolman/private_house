<template>
  <!--头部-->
  <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="'用户信息管理'"
                 :sub-title="'管理和查看用户们的信息'" @back="() => null">
    <template #extra>
      <a-button type="primary" @click="openDrawer('添加',true)">添加</a-button>
    </template>
  </a-page-header>

  <!--表格-->
  <a-table :columns="columns" :data-source="tableData">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">

        <!--        <Avatar src={<img :src="userAvatarResource+record.uid+'.webp'" alt="avatar" />} />-->
        <a-avatar :src="userAvatarResource+record.uid+'.webp'" style="margin-right: 7px">{{ record.name }}</a-avatar>
        <a>{{ record.name }}</a>
      </template>
      <template v-else-if="column.key === 'sex'">
        <ManOutlined v-if="record.sex === '男'" style="color:#6600ff"/>
        <WomanOutlined v-else-if="record.sex === '女'" style="color: #ff4dc3"/>
        <RobotOutlined v-else style="color: #a2a2a2"/>
      </template>
      <template v-else-if="column.key === 'birthday'">
        <span v-if="record.birthday != null">{{record.birthday+"，"+getAge(record.birthday)}}</span>
      </template>
      <template v-else-if="column.key==='level'">
        <span :class="`iconfont icon-user_level_${record.level}`"></span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <!--编辑-->
          <a-tooltip>
            <template #title>编辑</template>
            <EditOutlined style="margin-right: 5px;color:#797878" type="primary" @click="Edit(record.uid)"/>
          </a-tooltip>

          <!--删除-->
          <a-tooltip placement="bottom">
            <template #title>删除</template>
            <a-popconfirm ok-text="删除" cancel-text="算了" title="删除无法还原！确定删除？" @confirm="Delete(record.uid)">
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

  <!--form表单-->
  <a-drawer :width="500" :title="DrawerTitle" placement="right" :open="DrawerStatus" @close="onClose">
    <template v-if="DrawerShowTool" #extra>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="onSubmit">提交</a-button>
    </template>

    <!--头像上传按钮-->
    <div style="display: flex;justify-content: center;margin: 10px 0;">
      <AvatarUploader/>
    </div>

    <!--表单-->
    <!--:wrapper-col="{span: 18,}"-->
    <a-form :model="formState" :label-col="{ style: {width: '70px',},}">
      <a-form-item label="用户编号" name="uid">
        <a-input v-model:value="formState.uid" disabled="true"/>
      </a-form-item>
      <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入用户名！' }]">
        <a-input v-model:value="formState.name">
          <template #prefix>
            <UserOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-space wrap>
        <a-form-item label="性别" name="sex">
          <a-radio-group v-model:value="formState.sex">
            <a-radio-button value="男"><ManOutlined style="color: #3269f3" /></a-radio-button>
            <a-radio-button value="女"><WomanOutlined style="color: #ef50f4" /></a-radio-button>
            <a-radio-button :aria-checked="true" value=""><RobotOutlined style="color: #666666"/></a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="生日" name="birthday">
          <a-date-picker style="width:113%" v-model:value="formInputDate"/>
        </a-form-item>
      </a-space>
      <a-form-item label="电子邮箱" name="eMail">
        <a-input v-model:value="formState.eMail">
          <template #prefix>
            <MailOutlined />
          </template>
          <template #addonAfter>
            <a-select v-model:value="formEmailAfter" style="width: 120px">
              <a-select-option value="@qq.com">@qq.com</a-select-option>
              <a-select-option value="@gmail.com">@gmail.com</a-select-option>
              <a-select-option value="@163.com">@163.com</a-select-option>
            </a-select>
          </template>
        </a-input>

      </a-form-item>
      <a-form-item label="电话" name="phone">
        <a-input v-model:value="formState.phone">
          <template #prefix>
            <PhoneOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-space warp>
        <a-form-item label="硬币" name="coin">
          <a-input-number v-model:value="formState.coin"/>
        </a-form-item>
        <a-form-item label="等级" name="level">
          <a-select v-model:value="formState.level" style="width: 90px">
            <a-select-option value="1"><span class="iconfont icon-user_level_1"></span></a-select-option>
            <a-select-option value="2"><span class="iconfont icon-user_level_2"></span></a-select-option>
            <a-select-option value="3"><span class="iconfont icon-user_level_3"></span></a-select-option>
            <a-select-option value="4"><span class="iconfont icon-user_level_4"></span></a-select-option>
            <a-select-option value="5"><span class="iconfont icon-user_level_5"></span></a-select-option>
            <a-select-option value="6"><span class="iconfont icon-user_level_6"></span></a-select-option>
          </a-select>
        </a-form-item>
      </a-space>
      <a-form-item label="签名" name="sign">
        <a-textarea v-model:value="formState.sign"/>
      </a-form-item>
      <a-form-item label="身份证" name="identityCard">
        <a-input v-model:value="formState.identityCard"/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import {inject, onMounted, reactive, ref} from "vue";
import AvatarUploader from "./components/avatarUploader.vue"
import {LockOutlined, PhoneOutlined, UserOutlined,WomanOutlined,ManOutlined,RobotOutlined,MailOutlined,EditOutlined,DeleteOutlined,MoreOutlined } from '@ant-design/icons-vue';
import {notification} from "ant-design-vue";

const api = inject('api');
const userAvatarResource = inject("userAvatarResource")
const DrawerStatus = ref(false);//抽屉状态
const DrawerTitle = ref("");//抽屉标题
const DrawerShowTool = ref(false);//抽屉显示操作栏
const columns = [
  {title: '用户编号', dataIndex: 'uid', key: 'uid',},
  {title: '姓名', dataIndex: 'name', key: 'name',},
  {title: '性别', dataIndex: 'sex', key: 'sex',},
  {title: '生日', dataIndex: 'birthday', key: 'birthday',},
  {title: '电话', dataIndex: 'phone', key: 'phone',},
  {title: '电子邮箱', dataIndex: 'eMail', key: 'eMail',},
  {title: '等级', dataIndex: 'level', key: 'level',},
  {title: '操作', key: 'action',},
];//定义表格的列
const tableData = ref([])//定义表格的数据


const formState = reactive({
  uid: 0,
  name: "",
  eMail: "",
  phone: "",
  password: "",
  coin: 0,
  level: 1,
  nowExp:0,
  nextExp:0,
  sign: "",
  sex: "",
  identityCard: ""
});//定义表单的对象
const formEmailAfter = ref('@qq.com');//表单的邮箱的后缀对象
const formInputDate = ref(); //表单的日期选择框的对象

const dataInit = () => {
  api.userApi.Get().then(res => {
    if (res.data.isSuccess)
      tableData.value = res.data.data
  }).catch(error => {

  })
}
const getAge=birthdayStr=>{
  const birthday = new Date(birthdayStr);
  const theday = new Date();
  const age = theday.getFullYear() - birthday.getFullYear();
  return age;
}
const openDrawer= (drawerTitle,drawerShowTool)=>{
  DrawerStatus.value=true;
  DrawerTitle.value=drawerTitle;
  DrawerShowTool.value=drawerShowTool;
}
const Edit=(keyValue)=>{
  api.userApi.GetById(keyValue)
      .then(res=>{
        if (res.data.isSuccess){
          // formState =
        }
      })
      .catch(error=> notification['error']({message: '错误', description: `${error.data.message}`,}))
  openDrawer('编辑',true);
}
const Delete=(keyValue)=>{
  return api.userApi.Delete(keyValue)
      .then(res=>{
        if (res.data.isSuccess){
          notification['success']({message: "成功", description: `${res.data.message}`,});
          dataInit();
        }
        else
          notification['error']({message: "异常", description: `${res.data.message}`,});
      })
      .catch(error=> notification['error']({message: '错误', description: `${error.data.message}`,}))
}
const onSubmit = () => {
  if (formState.EMail != null && formState.EMail != "") {
    formState.EMail += formEmailAfter.value;
  }

  if(formInputDate.value!=null){
    const year = formInputDate.value.$y
    const month = (formInputDate.value.$M+1);
    const day = formInputDate.value.$D;
    formState.birthday = `${year}-${month<10?"0"+month:month}-${day<10?"0"+day:day}`;
  }
  //判断编号是添加还是删除
  if (formState.uid != 0) {
    alert("编辑")
  }else{
    // 添加
    api.userApi.Add(formState).then(res=>{
      if (res.data.isSuccess){
        notification['success']({message: '成功', description: `${res.data.message}`,});
        dataInit();
      }
      else notification['error']({message: '异常', description: `${res.data.message}`,});
    }).catch(error=>{
      notification['error']({message: '错误', description: `${error}`,});
    })
  }
  onClose();//关闭抽屉
};
const onClose = () => {
  DrawerStatus.value = false;
};
onMounted(() => {
  dataInit();
})
</script>

<style scoped>

</style>