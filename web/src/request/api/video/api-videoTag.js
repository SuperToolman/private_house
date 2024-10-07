import myAxios from '@request/axios.js';
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('VideoTag');
    }
}