import { createApp } from 'vue'
import App from './App.vue'
import { DatePicker } from 'ant-design-vue';
import router from '/src/router/index.js'
import {api} from "@request/mangement";
import { createPinia } from 'pinia' //pinia状态管理
import piniaPersist from 'pinia-plugin-persistedstate'; //pinia数据持久化组件
import VueLazyload from 'vue-lazyload'; //图片懒加载

import "@assets/iconfont.css"
import '@common/style/common_style.css'
import 'ant-design-vue/dist/reset.css';
import loading_error from './assets/img/common/loading_error.png';
import loading from './assets/img/common/loading2.gif';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist); // 启用持久化插件

app.use(DatePicker)
app.use(router);
app.use(pinia)
app.use(VueLazyload, {
    preLoad: 3,
    error:loading_error,
    loading: loading,
    attempt: 1
});

app.provide('api',api)
app.provide('resourceUrl','http://localhost:9080/')
app.provide('resourceByUserAvatarUrl','http://localhost:9080/UserAvatars/')
app.provide('resourceAuditPool','http://localhost:9080/AuditPool/')
app.mount('#app')