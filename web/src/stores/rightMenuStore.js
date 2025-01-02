import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        activeMenu: null,  // 当前激活的菜单ID
    }),
    actions: {
        setActiveMenu(menuId) {
            this.activeMenu = menuId;
        },
        hideMenu() {
            this.activeMenu = null;
        }
    }
});
