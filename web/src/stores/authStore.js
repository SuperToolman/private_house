import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        admin: {}
    }),

    getters: {
        getAuthenticated() {
            return this.isAuthenticated
        },
        getAdmin() {
            return this.admin
        }
    },

    actions: {
        setAuth(isAuth) {
            this.isAuthenticated = isAuth
        },

        setAdmin(admin) {
            this.admin = admin
        },

        clearAuth() {
            this.isAuthenticated = false
            this.admin = {}
            localStorage.removeItem("token")
        }
    },

    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'auth', // 这里设置了一个键名 'auth'，将数据存储到 localStorage 中
                storage: localStorage, // 使用 localStorage 保存
                paths: ['isAuthenticated', 'admin'] // 只持久化这两个字段
            }
        ]
    }
})
