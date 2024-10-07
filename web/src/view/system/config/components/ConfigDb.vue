<script setup>
import {reactive} from "vue";
import {api} from "@request/mangement";
let formState = reactive({
  db:reactive({
    name:'MySQL',
    host:'127.0.0.1',
    port:'3306',
    user:'',
    password:''
  }),
  redis: reactive({
    host:'127.0.0.1',
    port:'6379',
    user:'',
    password:''
  }),
});

const onFinish = (values) => {
  console.log(values);
  console.log(formState);
  if (formState.id === ""){
    //添加
    api.systemMenuApi.Add(formState).then(res => {
      if (res.isSuccess) {
        console.log('Success:', values);
      }
    });
  }else{
    //编辑
    api.systemMenuApi.Update(formState)
  }

};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>


<template>
  <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-card :title="'数据库配置'" class="setting-group">
      <a-form-item label="数据库" name="formState.db.name">
        <a-select ref="select" v-model:value="formState.db.name" @focus="focus">
          <a-select-option value="MySQL">MySQL</a-select-option>
          <a-select-option value="SQLServer">SQLServer</a-select-option>
        </a-select>
      </a-form-item>

      <div class="ant-input-row">
        <div class="ant-input-row-item">
          <a-form-item label="主机" name="formState.db.host">
            <a-input v-model:value="formState.db.host" />
          </a-form-item>
        </div>

        <div class="ant-input-row-item">
          <a-form-item label="端口" name="formState.db.port">
            <a-input v-model:value="formState.db.port" />
          </a-form-item>
        </div>
      </div>

      <a-form-item label="用户名" name="formState.db.user">
        <a-input v-model:value="formState.db.user" />
      </a-form-item>

      <a-form-item label="密码" name="formState.db.password">
        <a-input v-model:value="formState.db.password" />
      </a-form-item>
    </a-card>


    <a-card :title="'Redis缓存数据库'" class="setting-group">
      <div class="ant-input-row">
        <div class="ant-input-row-item">
          <a-form-item label="主机" name="formState.redis.host">
            <a-input v-model:value="formState.redis.host" />
          </a-form-item>
        </div>

        <div class="ant-input-row-item">
          <a-form-item label="端口" name="formState.redis.port">
            <a-input v-model:value="formState.redis.port" />
          </a-form-item>
        </div>
      </div>

      <a-form-item label="密码" name="formState.db.password">
        <a-input v-model:value="formState.redis.password" placeholder="（可选）Radis服务器验证密码"/>
      </a-form-item>

      <a-form-item label="用户名" name="formState.db.user">
        <a-input v-model:value="formState.redis.user" placeholder="（可选）服务端认证用户 [Radis>6.0] "/>
      </a-form-item>
    </a-card>

    <a-form-item :wrapper-col="{ offset: 11, span: 3 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
.setting-group{
  margin-top: 20px;
  box-shadow: 0 0 8px 1px rgba(220, 220, 220, 0.62);
}
</style>