import myAxios from "../../axios.js";
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('UserTag');
    }
}