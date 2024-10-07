import myAxios from '../../axios.js';
import {BaseApi} from "@request/api/baseApi";
import { v1 as uuidv1 } from 'uuid';

export default class extends BaseApi{
    constructor() {
        super('User');
    }
    UploadAvatar = (avatarFileBlob,userId)=>{
        const formData = new FormData()
        formData.append('file', avatarFileBlob, `${userId}.webp`);
        console.log(formData)
        return myAxios({
            method:'post',
            data:formData,
            url:`/User/UpdateAvatar`,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        })
    }

    AddAndUploadAvatar = (avatarBlob, form) => {
        form.id = uuidv1()
        const data = {
            file:avatarBlob,
            user:form
        }
        console.log('AddAndUploadAvatar',data)
        return myAxios({
            method: 'post',
            url: '/User/AddAndUploadAvatar',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        });
    };

    UpdateAndUploadAvatar = (avatarBlob, form) => {
        return myAxios({
            method: 'post',
            url: '/User/UpdateAndUploadAvatar',
            data: {
                file:avatarBlob,
                user:form
            } ,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
        });
    };
}