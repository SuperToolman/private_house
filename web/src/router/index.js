import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path:'/user',component:()=>import('@view/user/index.vue'),
        // redirect: "/platform/home",
        children: [
            {
                path: "management", component: () => import('@view/user/management/Index.vue'),
                children: [
                    { path: "add", component: () => import('@view/user/management/components/UserModal.vue')}
                ]
            },
            {path: "tag", component: () => import('@view/user/tag/index.vue'),},
        ]
    },
    {
        path:'/video',component:()=>import('@view/video/index.vue'),
        children: [
            {path: ":videoId", component: () => import('@view/video/management/Info.vue'),},
            {path: "management", component: () => import('@view/video/management/Index.vue'),},
            {
                path: "submission_and_review",component:()=>import('@view/video/submission_and_review/Index.vue'),
            },
            // {path: "upload", component: () => import('@view/video/management/Upload.vue')},
            {path: "area", component: () => import('@view/video/area/Index.vue'),},
            {path: "tag", component: () => import('@view/video/tag/Index.vue'),}
        ]
    },
    {
        path:'/system',component:()=>import('@view/video/index.vue'),
        children: [
            {
                path: "config", component: () => import('@view/system/config/Index.vue'),
                redirect:'/system/config/app',
                children: [
                    {path: "app", component: () => import('@view/system/config/components/ConfigApp.vue')},
                    {path: "db", component: () => import('@view/system/config/components/ConfigDb.vue')},
                    {path: "nginx", component: () => import('@view/system/config/components/ConfigNginx.vue')}
                ]
            },
            {path: "menu", component: () => import('@view/system/menu/Index.vue'),},
            {path:'api_info',component:()=>import('@view/system/api_info/Index.vue')},
            {path:'file',component:()=>import('@view/system/file/Index.vue'),}
        ]
    },


]

//导出路由
const router = createRouter({
    // history:createWebHashHistory(),//使用hash模式
    history: createWebHistory(), //使用history模式
    routes
});

export default router