export default class LocalStoreHelper {
    // 存储数据
    static setItem(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    }

    // 获取数据
    static getItem(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null;
        } catch (error) {
            console.error("Error retrieving from localStorage", error);
            return null;
        }
    }

    // 删除数据
    static removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage", error);
        }
    }

    // 清空所有数据
    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage", error);
        }
    }

    // 如果key存在且为数组，往数组中添加数据；如果不存在，创建数组并添加
    static addItemToLocalVideoArray(value) {
        try {
            console.log(value)
            let existingData = this.getItem('video_upload_record'); // 先获取现有的数据
            if (existingData && Array.isArray(existingData)) {
                existingData.push(value); // 如果是数组，则添加到数组
            } else {
                existingData = [value]; // 否则创建一个新的数组
            }
            this.setItem('video_upload_record', existingData); // 更新localStorage中的数据
        } catch (error) {
            console.error("Error adding item to array in localStorage", error);
        }
    }

    // 根据id从数组中删除对象
    static removeItemByIdFromVideoArray(id) {
        try {
            let existingData = this.getItem('video_upload_record'); // 先获取现有的数据
            if (existingData && Array.isArray(existingData)) {
                // 过滤掉具有匹配id的对象
                const updatedData = existingData.filter(item => item.id !== id);
                this.setItem('video_upload_record', updatedData); // 更新localStorage中的数据
            }
        } catch (error) {
            console.error("Error deleting item from array in localStorage", error);
        }
    }
}
