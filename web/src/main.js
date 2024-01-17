import { createApp } from 'vue'
import App from './App.vue'

//导入ELement-puls
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'


import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '/src/router/index.js'
import {api} from "./request/mangement.js";
import { createPinia } from 'pinia'
import "./assets/test.css"

const app = createApp(App);
const pinia = createPinia();

app.use(DatePicker)
app.use(router);
app.use(pinia)
app.mount('#app')

app.provide('api',api)
app.provide('animeResource',"http://192.168.1.68:8080/animeResouse/anime/")
app.provide('videoResource',"http://localhost:8080/")
app.provide('userAvatarResource',"http://localhost:8080/UserAvatar/")