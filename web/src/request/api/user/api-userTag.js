import myAxios from "../../axios.jsx";
import {BaseApi} from "@request/api/baseApi";

export default class extends BaseApi{
    constructor() {
        super('UserTag');
    }
}