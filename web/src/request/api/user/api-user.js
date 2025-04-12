import myAxios from '../../axios.jsx';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('User');
    }
    UploadAvatar = (avatarFileBlob,userUUID)=>{
        const formData = new FormData()
        formData.append('avatarFile', avatarFileBlob, `${userUUID}.webp`);
        formData.append('userUUID', userUUID);
        //打印formData
        for (let key of formData.entries()) {
            console.log(key[0], key[1]);
        }
        return myAxios({
            method:'post',
            data:formData,
            url:`/User/UploadAvatar`,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        })
    }

    SearchUserByName = (userName)=>{
        return myAxios({
            method:'get',
            url:`/User/SearchUserByName?userName=${userName}`
        })
    }

    AddBySimple = (userName) =>{
        return myAxios({
            method:'post',
            url:`/User/Simple?userName=${userName}`
        })
    }

    /*@
        添加其他平台链接
        @param {string} userId - 用户ID
        @param {string} link - 链接
        @return {Promise} - 返回Promise对象
    @*/
    AddOtherPlatformLink = (userId,link) =>{
        return myAxios({
            method:'post',
            url:`/User/AddOtherPlatformLink?userId=${userId}&link=${link}`
        })
    }

    RemoveOtherPlatformLink = (linkId)=>{
        return myAxios({
            method:'delete',
            url:`/User/RemoveOtherPlatformLink?linkId=${linkId}`
        })
    }

    EditOtherPlatformLink = (linkId,newLink)=>{
        return myAxios({
            method:'put',
            url:`/User/EditOtherPlatformLink?linkId=${linkId}&newLink=${newLink}`
        })
    }
}