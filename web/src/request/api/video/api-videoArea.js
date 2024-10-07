import myAxios from "@request/axios.js";
import { v4 as uuidv4 } from 'uuid';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('VideoArea');
    }
    GetByTree =()=>{
        return myAxios({
            method:'get',
            url:`/VideoArea/Tree`
        })
    }
    LoadSelectedData=()=>{
        return myAxios({
            method:'get',
            url:`/VideoArea/LoadSelectedData`
        })
    }
    LoadAntTreeSelected=()=>{
        return myAxios({
            method:'get',
            url:`/VideoArea/LoadAntTreeSelected`
        })
    }
}