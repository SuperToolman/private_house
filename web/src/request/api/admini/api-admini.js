import myAxios from '@request/axios.jsx';
import { BaseApi } from "@request/api/baseApi";

export default class extends BaseApi {
    constructor() {
        super('Administrator');
    }

    Login = (account, password) => {
        return myAxios({
            method: 'post',
            url: `/Administrator/Login`,
            data: { account, password }
        });
    }

    GetByAccount = (account) => {
        return myAxios({
            method: 'get',
            url: `/Administrator/GetByAccount/${account}`
        });
    }

    GetByRoleId = (roleId) => {
        return myAxios({
            method: 'get',
            url: `/Administrator/GetByRoleId/${roleId}`
        });
    }

    GetAdminDetailsById = (adminId) => {
        return myAxios({
            method: 'get',
            url: `/Administrator/GetAdminDetailsById/${adminId}`
        });
    }
} 