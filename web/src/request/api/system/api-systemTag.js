import myAxios from '@request/axios.jsx';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('Tag');
    }

    SearchByName =  (key) =>{
        // console.log('获取菜单')
        return myAxios({
            method:'get',
            url:`/Tag/SearchByName?key=${key}`
        })
    }


}