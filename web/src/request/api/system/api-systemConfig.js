import myAxios from '@request/axios.js';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    controllerName = 'System'
    constructor() {
        super('Menu');
    }

    GetConfigByNginx = () =>{
        return myAxios({
            method:'get',
            url:`/${this.controllerName}/GetConfigByNginx`
        })
    }
    UpdateConfigByNginx = (from)=>{
        return myAxios({
            method:'post',
            data:from,
            url:`/${this.controllerName}/UpdateConfigByNginx`
        })
    }
    GetConfigByRedis = () =>{
        return myAxios({
            method:'get',
            url:`/${this.controllerName}/GetConfigByRedis`
        })
    }
    InitDatabase = () =>{
        return myAxios({
            method:'get',
            url:`/${this.controllerName}/InitDatabase`
        })
    }
}