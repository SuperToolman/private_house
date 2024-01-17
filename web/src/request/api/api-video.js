import myAxios from '../axios.js';

export default {
    UploadByLocal: (formData) => {
        return myAxios({
            method: 'post',
            url: `/Video/UploadByLocal`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'},
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        })
    },
    LoadByHotplay: (getCount) => {
        return myAxios({
            method: 'get',
            url: `/Video/LoadByHotplay?getCount=${getCount}`,
        })
    },
    LoadByVideoId: (vid) => {
        return myAxios({
            method: 'get',
            url: `/Video/LoadByVideoId?vid=${vid}`,
        })
    },
    LoadBySearch: (keyword, order, duration, tids) => {
        let requestUrl = `/Video/GetSearch?keyword=${keyword}&order=${order}&duration=${duration}&area=${tids}`
        console.log(requestUrl)

        return myAxios({
            method: 'get',
            url: requestUrl,
        })
    },
    LoadByVideoPlay: (videoId) => {
        return myAxios({
            method: 'get',
            url: `/Video/LoadByVideoPlay?videoId=${videoId}`,
        })
    },
    LoadByUserId: (userId) => {
        return myAxios({
            method: 'get',
            url: `/Video/LoadByUserId?userId=${userId}`,
        })
    },
    LoadByCollectId: (collectId) => {
        return myAxios({
            method: 'get',
            url: `/Video/LoadByCollectId?collectId=${collectId}`,
        })
    },
    LikeOrUnlike: (userId, videoId) => {
        return myAxios({
            method: 'put',
            url: `/Video/LikeOrUnlike?userId=${userId}&videoId=${videoId}`,
        })
    },
    IsLike:(videoId,userId)=>{
        return myAxios({
            method:'get',
            url:`/Video/IsLike?videoId=${videoId}&userId=${userId}`,
        })
    }
}