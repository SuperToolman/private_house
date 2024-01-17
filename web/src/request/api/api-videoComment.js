import myAxios from '../axios.js';

export default {
    LoadComment:(videoId)=>{
        return myAxios({
            method:'get',
            url:`/VideoComment/LoadComment?videoId=${videoId}`,
        })
    },
    Speak:(videoId, userId, content)=>{
        return myAxios({
            method:'post',
            url:`/VideoComment/Speak?videoId=${videoId}&userId=${userId}&content=${content}`,
        })
    },
    Peply:(videoCommentId,videoId, userId, content)=>{
        return myAxios({
            method:'post',
            url:`/VideoComment/Peply?videoId=${videoId}&videoCommentId=${videoCommentId}&userId=${userId}&content=${content}`,
        })
    }
}