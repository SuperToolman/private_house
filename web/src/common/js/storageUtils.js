const video_record_key = 'video_upload_record'
export const setItem = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("保存localStorage错误", error);
    }
}

// 获取数据
export const getItem = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
        console.error("从本地存储检索时出错", error);
        return null;
    }
}

// 删除数据
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("从本地存储中删除时出错", error);
    }
}

// 清空所有数据
export const clear = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("清除本地存储时出错", error);
    }
}

export const getLocalVideoArray=()=>{
    return getItem(video_record_key)
}
// 如果key存在且为数组，往数组中添加数据；如果不存在，创建数组并添加
export const addItemToLocalVideoArray = (videoEntity) => {
    try {
        console.log('追加到本地存储',videoEntity)
        let existingData = getItem(video_record_key); // 先获取现有的数据
        if (existingData && Array.isArray(existingData)) {
            existingData.push(videoEntity); // 如果是数组，则添加到数组
        } else {
            existingData = [videoEntity]; // 否则创建一个新的数组
        }
        setItem(video_record_key, existingData); // 更新localStorage中的数据
    } catch (error) {
        console.error("将项添加到localStorage中的阵列时出错", error);
    }
}

// 根据id从数组中删除对象
export const removeItemByIdFromVideoArray = (id) => {
    try {
        let existingData = getItem(video_record_key); // 先获取现有的数据
        if (existingData && Array.isArray(existingData)) {
            // 过滤掉具有匹配id的对象
            const updatedData = existingData.filter(item => item.id !== id);
            setItem(video_record_key, updatedData); // 更新localStorage中的数据
        }
    } catch (error) {
        console.error("从localStorage的数组中删除项目时出错", error);
    }
}
export const removeVideoArray = () =>{
    removeItem(video_record_key)
}