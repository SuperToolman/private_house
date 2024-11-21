import myAxios from '@request/axios.jsx';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('Menu');
    }
    GetAntMenuData =  () =>{
        // console.log('获取菜单')
        return myAxios({
            method:'get',
            url:`/Menu/GetAntMenuData`
        })
    }

    GetTree = ()=>{
        return myAxios({
            method:'get',
            url:`/Menu/GetTree`
        })
    }

    LoadAntTreeSelected = () =>{
        return myAxios({
            method:'get',
            url:`/Menu/LoadAntTreeSelected`
        })
    }
}