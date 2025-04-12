import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@stores/authStore";
import {message} from "ant-design-vue";

const routes = [
    {
        path: '/',
        name: 'home',  // 为根路由添加 name
        component: () => import('@view/home/Index.vue')
    },
    {
        path: '/login',
        name: 'login',  // 登录页
        component: () => import('@view/login/Index.vue')
    },
    {
        path: '/user',
        name: 'user',  // 用户相关页面
        component: () => import('@view/user/Index.vue'),
        children: [
            {
                path: "management",
                name: 'user-management',  // 用户管理
                component: () => import('@view/user/management/Index.vue'),
                children: [
                    {
                        path: "add",
                        name: 'user-add',  // 添加用户
                        component: () => import('@view/user/management/components/UserModal.vue')
                    }
                ],
            },
            {
                path: "tag",
                name: 'user-tag',  // 用户标签
                component: () => import('@view/user/tag/Index.vue')
            },
            {
                path:'admini',
                name:'user-admini',
                component:()=>import('@view/user/admini/Index.vue')
            },
            {
                path: '/user/role',
                name: 'user-role',
                component: () => import('@view/user/role/Index.vue'),
            },
            {
                path:"info/:userId",
                name:"user-info",
                component:()=>import('@view/user/info/Index.vue')
            }
        ]
    },
    {
        path: '/video',
        name: 'video',  // 视频相关页面
        component: () => import('@view/video/Index.vue'),
        children: [
            {
                path: "management",
                name: 'video-management',  // 视频管理
                component: () => import('@view/video/management/Index.vue')
            },
            {
                path: ":videoId",
                name: 'video-info',  // 视频信息
                component: () => import('@view/video/management/Info.vue')
            },
            {
                path: 'upload',
                name: 'video-upload',  // 视频上传
                component: () => import('@view/video/upload/Index.vue'),
                redirect: '/video/upload/standard',
                children: [
                    {
                        path: "standard",
                        name: 'video-upload-standard',  // 标准上传
                        component: () => import('@view/video/upload/Standard.vue')
                    },
                    {
                        path: "difference",
                        name: 'video-upload-difference',  // 差异化上传
                        component: () => import('@view/video/upload/Difference.vue')
                    },
                    {
                        path: "collection",
                        name: 'video-upload-collection',  // 上传合集
                        component: () => import('@view/video/upload/Collection.vue')
                    }
                ]
            },
            {
                path: "area",
                name: 'video-area',  // 视频区域
                component: () => import('@view/video/area/Index.vue')
            }
        ]
    },
    {
        path: '/system',
        name: 'system',  // 系统设置
        component: () => import('@view/video/Index.vue'),
        children: [
            {
                path: "config",
                name: 'system-config',  // 系统配置
                component: () => import('@view/system/config/Index.vue'),
                redirect: '/system/config/app',
                children: [
                    {
                        path: "app",
                        name: 'system-config-app',  // 应用配置
                        component: () => import('@view/system/config/ConfigApp.vue')
                    },
                    {
                        path: "db",
                        name: 'system-config-db',  // 数据库配置
                        component: () => import('@view/system/config/ConfigDb.vue')
                    },
                    {
                        path: "nginx",
                        name: 'system-config-nginx',  // Nginx配置
                        component: () => import('@view/system/config/ConfigNginx.vue')
                    }
                ]
            },
            {
                path: "menu",
                name: 'system-menu',  // 菜单配置
                component: () => import('@view/system/menu/Index.vue')
            },
            {
                path: "tag",
                name: 'system-tag',  // 系统标签
                component: () => import('@view/system/tag/Index.vue')
            },
            {
                path: 'api_info',
                name: 'system-api-info',  // API 信息
                component: () => import('@view/system/api_info/Index.vue')
            },
            {
                path: 'file',
                name: 'system-file',  // 文件管理
                component: () => import('@view/file/Index.vue')
            }
        ]
    },
    {
        path: '/manga',
        name: 'manga',  // 漫画相关页面
        component: () => import('@view/manga/Index.vue'),
        children: [
            {
                path: 'management',
                name: 'manga-management',  // 漫画管理
                component: () => import('@view/manga/management/Index.vue')
            },
            {
                path: "info/:mangaId",
                name: 'manga-info',  // 漫画详情
                component: () => import('@view/manga/info/Index.vue')
            },
            {
                path: ":mangaId",
                name: 'manga-read',  // 漫画阅读
                component: () => import('@view/manga/read/Index.vue')
            },
            {
                path: "upload",
                name: 'manga-upload',  // 漫画上传
                component: () => import('@view/manga/upload/Index.vue')
            }
        ]
    },
    {
        path: '/note',
        name: 'note',  // 笔记相关页面
        component: () => import('@view/note/Index.vue'),
        redirect: '/note/rich_text',
        children: [
            {
                path: 'rich_text',
                name: 'note-rich-text',  // 富文本笔记
                component: () => import('@view/note/rich_text/Index.vue')
            },
            {
                path: 'web',
                name: 'note-web',  // Web笔记
                component: () => import('@view/note/web/Index.vue')
            }
        ]
    }
];


//导出路由
const router = createRouter({
    // history:createWebHashHistory(),//使用hash模式
    history: createWebHistory(), //使用history模式
    routes
});

// 路由守卫：在每次路由变化前检查认证状态
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    // 如果用户未认证，并且目标路由不是登录页，跳转到登录页
    // 如果目标路由已经是登录页，且用户未认证，也应允许继续访问登录页
    if (!auth.getAuthenticated && to.name !== 'login') {
        message.warning('请先登录才能访问'+to.name)
        next('/login');  // 跳转到登录页
    } else {
        next();  // 继续正常路由跳转
    }
});


export default router