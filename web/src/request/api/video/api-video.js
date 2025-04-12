import myAxios from '@request/axios.jsx';
import {BaseApi} from "@request/api/baseApi";
import {v4 as uuidv4} from "uuid";

export default class extends BaseApi{
    constructor() {
        super('Video');
    }
    UploadToTemp = (file,config = {}) =>{
        console.log('开始上传？',file)
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

    CombinationQueryPaged = (pageIndex=1,pageSize=15,areaId=-1,videoAuditStatus=-1,videoCountOption = 5) =>{
        return myAxios({
            method:'get',
            url:`/Video/CombinationQueryPaged?pageIndex=${pageIndex}&pageSize=${pageSize}&areaId=${areaId}&videoAuditStatus=${videoAuditStatus}&videoCountOption=${videoCountOption}`
        })
    }

    AdoptForReview = (videoId) =>{
        return myAxios({
            method: 'post',
            url: `/Video/AdoptForReview?videoId=${videoId}`,
        })
    }

    Submission = (video) =>{
        console.log('投稿焦点视频表单：', video)
        const {cover,file,previews,...info} = video
        return myAxios({
            method: 'post',
            url: `/Video/Submission`,
            data: info,
        })
    }

    SubmissionByDifference = (videoListByDifference, videos) => {
        // 创建 videos 的副本，并将 videoListByDifference 插入到副本的开头
        const videosCopy = [videoListByDifference, ...videos];
        console.log('投稿差异视频表单：', videosCopy);

        return myAxios({
            method: 'post',
            url: `/Video/SubmissionByDifference`, // 请求 URL
            data: videosCopy, // 传递副本数据
        });
    }

    PushTagByString =(tagString,videoId)=>{
        return myAxios({
            method:'post',
            url:`/Video/PushTagByString?tagString=${tagString}&videoId=${videoId}`,
        })
    }

    UploadCover=(videoUUID,coverFile)=>{
        console.log(coverFile)
        // console.log('开始上传文件',file)
        const formData = new FormData()
        formData.append('file',coverFile.blob,`${videoUUID}.webp`)
        return myAxios({
            method: 'post',
            url: `/Video/UploadCover`,
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        })
    }

    GetByIdWithType=(videoId,videoType)=>{
        return myAxios({
            method:'get',
            url:`/Video/IdWithType?videoId=${videoId}&videoType=${videoType}`
        })
    }

    GetByUUID = (uuid)=>{
        return myAxios({
            method:'get',
            url:`/Video/UUID?uuid=${uuid}`
        })
    }

    GetStatisticalData = ()=>{
        return myAxios({
            method:'get',
            url:`/Video/StatisticalData`
        })
    }

    DeleteByDifferenceId = (differenceId)=>{
        return myAxios({
            method:'delete',
            url:`/Video/${differenceId}`
        })
    }

    GetByDifferenceId = (getByDifferenceId,orderType = 0)=>{
        return myAxios({
            method:'get',
            url:`/Video/${getByDifferenceId}/${orderType}`
        })
    }
}