import myAxios from '@request/axios.jsx';
import { BaseApi } from "@request/api/baseApi";

export default class extends BaseApi {
  constructor() {
      super('Role');
  }
}