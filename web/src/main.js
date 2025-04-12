import App from './App.vue';

// 样式和静态资源
import 'default-passive-events'; // 提高滚动性能
import 'viewerjs/dist/viewer.css'; // 图片预览样式
import '@assets/iconfont.css'; // 自定义图标样式
import '@common/style/common_style.css'; // 公共样式
import 'ant-design-vue/dist/reset.css'; // Ant Design Vue 重置样式

// 插件和库
import { DatePicker } from 'ant-design-vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import VueLazyload from 'vue-lazyload';
import VueViewer from 'v-viewer';

// 请求和状态管理
import router from '/src/router/index.js';
import { api } from '@request/mangement';

// 图片加载配置
import loading_error from './assets/img/common/loading_error.png';
import loading from './assets/img/common/loading2.gif';

// Pinia 状态管理
const pinia = createPinia();
pinia.use(piniaPersist);

// 应用实例化
const app = createApp(App);

// 插件注册
app.use(DatePicker);
app.use(router);
app.use(pinia);
app.use(VueViewer);
app.use(VueLazyload, {
    preLoad: 3,
    error: loading_error,
    loading: loading,
    attempt: 1
});

// 提供全局依赖
app.provide('api',api)
app.provide('resourceUrl','http://localhost:9080/')
app.provide('resourceByUserAvatarUrl','http://localhost:9080/UserAvatars/')
app.provide('resourceAuditPool','http://localhost:9080/AuditPool/')

// 挂载应用
app.mount('#app');
