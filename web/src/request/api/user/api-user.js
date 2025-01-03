import myAxios from '../../axios.jsx';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('User');
    }
    UploadAvatar = (avatarFileBlob,userUUID)=>{
        const formData = new FormData()
        formData.append('avatarFile', avatarFileBlob, `${userUUID}.webp`);
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
}