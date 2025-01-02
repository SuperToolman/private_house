// stores/menuStore.js
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        collapsed: true,
        openKeys: ['sub1'], // 初始化的 openKeys
        selectedKeys: ['1'], // 初始化的 selectedKeys
    }),
    persist: true,
    actions: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
            this.openKeys = this.collapsed ? [] : ['sub1']; // 更新 openKeys
        },
        setOpenKeys(keys) {
            this.openKeys = keys; // 添加方法来更新 openKeys
        },
        setSelectedKeys(keys) {
            this.selectedKeys = keys; // 可选，更新 selectedKeys
        },
    },
});
