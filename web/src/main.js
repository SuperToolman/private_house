import { createApp } from 'vue'
import App from './App.vue'
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '/src/router/index.js'
import {api} from "@request/mangement";
import { createPinia } from 'pinia'
import "@assets/iconfont.css"
import '@common/style/common_style.css'

const app = createApp(App);
const pinia = createPinia();

app.use(DatePicker)
app.use(router);
app.use(pinia)

app.provide('api',api)
app.provide('resourceUrl','http://localhost:9080/')
app.provide('resourceByUserAvatarUrl','http://localhost:9080/UserAvatarResources/')
app.mount('#app')