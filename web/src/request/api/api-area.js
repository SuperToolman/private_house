import myAxios from '../axios.js';

export default {
    LoadPartition:()=>{
        return myAxios({
            method:'get',
            url:`/Area/LoadPartition`,
        })
    },
    LoadKeyValue:()=>{
        return myAxios({
            method:'get',
            url:`/Area/LoadKeyValue`,
        })
    },
    LoadKeyValueByFavorite:(collectId)=>{
        return myAxios({
            method:'get',
            url:`/Area/LoadKeyValueByFavorite?collectId=${collectId}`,
        })
    },


}