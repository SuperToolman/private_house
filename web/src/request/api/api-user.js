import myAxios from '../axios.js';

export default {
    GetById:(id)=>{
        return myAxios({
            method:'get',
            url:`/User/GetById?id=${id}`
        })
    },
    Get:()=>{
        return myAxios({
            method:'get',
            url:`/User`
        })
    },
    Add:(userEntity)=>{
        console.log("request",userEntity)
        return myAxios({
            method:'post',
            data:userEntity,
            url:`/User`
        })
    },
    Update:(userEntity)=>{
        return myAxios({
            method:'put',
            data:userEntity,
            url:`/User`
        })
    },
    Delete:(userId)=>{
        return myAxios({
            method:'delete',
            url:`/User?userId=${userId}`
        })
    },
    UploadAvatar:(file)=>{
        return myAxios({
            method:'post',
            data:file,
            url:`/User/UploadAvatar`
        })
    }
}