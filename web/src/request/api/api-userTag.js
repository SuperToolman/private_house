import myAxios from "../axios.js";

export default {
    Get:()=>{
        return myAxios({
            method:'get',
            url:`/UserTag`
        })
    },
    GetById:(userTagId)=>{
        return myAxios({
            method:'get',
            url:`/UserTag/LoadSingle?userTagId=${userTagId}`
        })
    },
    Add:(userTagEntity)=>{
        return myAxios({
            method:'post',
            data:userTagEntity,
            url:`/UserTag`
        })
    },
    Update:(userTagEntity)=>{
        return myAxios({
            method:'put',
            data:userTagEntity,
            url:`/UserTag`
        })
    },
    Delete:(userTagId)=>{
        return myAxios({
            method:'delete',
            url:`/UserTag?userTagId=${userTagId}`
        })
    },
}