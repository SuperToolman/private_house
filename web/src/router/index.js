import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path:'/user',component:()=>import('@view/user/Index.vue'),
        // redirect: "/platform/home",
        children: [
            {
                path: "management", component: () => import('@view/user/management/Index.vue'),
                children: [
                    { path: "add", component: () => import('@view/user/management/components/UserModal.vue')}
                ]
            },
            {path: "tag", component: () => import('@view/user/tag/Index.vue'),},
        ]
    },
    {
        path:'/video',component:()=>import('@view/video/Index.vue'),
        children: [
            {path: "management", component: () => import('@view/video/management/Index.vue'),},
            {path: ":videoId", component: () => import('@view/video/management/Info.vue'),},
            {
                path: 'upload',component:()=>import('@view/video/upload/Index.vue'),
                redirect: '/video/upload/standard',
                children: [
                    {path: "standard",component:()=>import('@view/video/upload/Standard.vue'),},
                    {path: "difference",component:()=>import('@view/video/upload/Difference.vue'),},
                    {path: "collection",component:()=>import('@view/video/upload/Collection.vue'),}
                ]
            },
            // {path: "upload", component: () => import('@view/video/management/Upload.vue')},
            {path: "area", component: () => import('@view/video/area/Index.vue'),},
        ]
    },
    {
        path:'/system',component:()=>import('@view/video/Index.vue'),
        children: [
            {
                path: "config", component: () => import('@view/system/config/Index.vue'),
                redirect:'/system/config/app',
                children: [
                    {path: "app", component: () => import('@view/system/config/ConfigApp.vue')},
                    {path: "db", component: () => import('@view/system/config/ConfigDb.vue')},
                    {path: "nginx", component: () => import('@view/system/config/ConfigNginx.vue')}
                ]
            },
            {path: "menu", component: () => import('@view/system/menu/Index.vue'),},
            {path: "tag", component:()=>import('@view/system/tag/Index.vue')},
            {path:'api_info',component:()=>import('@view/system/api_info/Index.vue')},
            {path:'file',component:()=>import('@view/file/Index.vue'),},
        ]
    },
    {
        path:'/manga',component:()=>import('@view/manga/Index.vue'),
        children: [
            {path: 'management',component:()=>import('@view/manga/management/Index.vue')},
            {path: "info/:mangaId", component: () => import('@view/manga/info/Index.vue'),},
            {path: ":mangaId",component:()=>import('@view/manga/read/Index.vue')},
            {
                path: "upload",component:()=>import('@view/manga/upload/Index.vue'),
                redirect: '/manga/upload/standard',
                children: [
                    {path: "standard",component:()=>import('@view/manga/upload/Standard.vue'),},
                ]
            }
        ]
    },
    {
        path: '/note',component:() =>import('@view/note/Index.vue'),
        redirect:'/note/rich_text',
        children: [
            {path: 'rich_text',component:()=>import('@view/note/rich_text/Index.vue')},
            {path :'web',component:()=>import('@view/note/web/Index.vue')}
        ]
    }
]

//导出路由
const router = createRouter({
    // history:createWebHashHistory(),//使用hash模式
    history: createWebHistory(), //使用history模式
    routes
});

export default router