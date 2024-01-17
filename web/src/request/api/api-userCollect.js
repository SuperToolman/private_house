import myAxios from "../axios.js";

const SSOServer = "http://localhost:53001"
export default {
    LoadByCollectDialog:(userId)=>{
        return myAxios({
            method:'get',
            url:`/UserCollect/LoadByCollectDialog?userId=${userId}`
        })
    },
    LoadByCollectWithVideos:(userId,videoId)=>{
        return myAxios({
            method:'get',
            url:`/UserCollect/LoadByCollectWithVideos?userId=${userId}&videoId=${videoId}`
        })
    },
    LoadByUserId:(userId)=>{
        return myAxios({
            method:'get',
            url:`/UserCollect/LoadByUserId?userId=${userId}`
        })
    },
    IsCollectingVideos:(userId,videoId)=>{
        return myAxios({
            method:'get',
            url:`/UserCollect/IsCollectingVideos?userId=${userId}&videoId=${videoId}`
        })
    },
    JoinOrExitByList:(selectCollectIds,unselectCollectIds,videoId)=>{
        return myAxios({
            method:'post',
            data:{
                selectCollectIds: selectCollectIds,
                unselectCollectIds: unselectCollectIds,
                videoId: videoId,
            },
            url:`/UserCollect/JoinOrExitByList`
        })
    }
}