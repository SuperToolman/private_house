import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/user/info", component: () => import('@view/user/info/index.vue'),},
    {path: "/user/tag", component: () => import('@view/user/tag/index.vue'),},
]

//导出路由
const router = createRouter({
    // history:createWebHashHistory(),//使用hash模式
    history: createWebHistory(), //使用history模式
    routes
});

export default router