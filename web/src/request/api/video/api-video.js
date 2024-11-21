import myAxios from '@request/axios.jsx';
import {BaseApi} from "@request/api/baseApi";
import {v4 as uuidv4} from "uuid";

export default class extends BaseApi{
    constructor() {
        super('Video');
    }
    Submission = formData =>{
        console.log('提交的投稿',formData)
        return myAxios({
            method: 'post',
            url: `/Video/Submission`,
            data: {userId:formData.userId,
            videoFileList:formData.videoFileList[0],
            coverFileList:formData.coverFileList[0]},
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        })
    }

    UploadToTemp = (file,config = {}) =>{
        // console.log('开始上传文件',file)
        const formData = new FormData()
        formData.append('file',file)
        return myAxios({
            method: 'post',
            url: `/Video/UploadToTemp`,
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
            ...config
        })
    }

    GetByCombinationQuery = (areaId=-1,auditStatus=-1,countOption = -1) =>{
        return myAxios({
            method: 'get',
            url: `/Video/GetByCombinationQuery?areaId=${areaId}&videoAuditStatus=${auditStatus}&videoCountOption=${countOption}`,
        })
    }
    AdoptForReview = (videoId) =>{
        return myAxios({
            method: 'post',
            url: `/Video/AdoptForReview?videoId=${videoId}`,
        })
    }

    SubmissionForReview = (video) =>{
        console.log(video)
        const data = {
            cover:video.cover.blob,
            video:null
        }
        console.log(data)
        const {cover,file,previews,...info} = video
        data.video = info;
        return myAxios({
            method: 'post',
            url: `/Video/SubmissionForReview`,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        })
    }

    PushTagByString =(tagString,videoId)=>{
        return myAxios({
            method:'post',
            url:`/Video/PushTagByString?tagString=${tagString}&videoId=${videoId}`,
        })
    }
}