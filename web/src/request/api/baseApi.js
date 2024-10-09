import myAxios from "@request/axios.js";
import {v4 as uuidv4} from 'uuid';

export class BaseApi {
    constructor(controllerName) {
        this.controllerName = controllerName
    }
    Get = () => {
        return myAxios({
            method: 'get',
            url: `/${this.controllerName}`
        })
    }
    Add = (entity) => {
        console.log(`${this.controllerName}执行了通用新增操作：`,entity)
        return myAxios({
            method: 'post',
            url: `/${this.controllerName}`,
            data: entity,
        })
    }
    Update = (entity) => {
        console.log(`${this.controllerName}执行了通用更新操作：`,entity)
        entity.updateTime = new Date().toISOString()
        return myAxios({
            method: 'put',
            url: `/${this.controllerName}`,
            data: entity,
        })
    }
    Delete = (entity) => {
        return myAxios({
            method: 'delete',
            url: `/${this.controllerName}`
        })
    }
    GetById = (id) => {
        return myAxios({
            method: 'get',
            url: `/${this.controllerName}/Id?id=${id}`
        })
    }
    DeleteById = (id) => {
        return myAxios({
            method: 'delete',
            url: `/${this.controllerName}/Id?id=${id}`
        })
    }
    GetByPaged = () => {
        return myAxios({
            method: 'get',
            url: `/${this.controllerName}/Paged`
        })
    }
}