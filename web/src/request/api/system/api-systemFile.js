import myAxios from '@request/axios.js';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('File');
    }
    GetFilesByNginx =  (baseUrl) =>{
        return myAxios({
            method:'get',
            url:`/File/GetFilesByNginx?baseUrl=${baseUrl}`
        })
    }

    GetFiles =  (targetPath = '/') =>{
        return myAxios({
            method:'get',
            url:`/File/GetFiles?directoryPath=${targetPath}`
        })
    }
}