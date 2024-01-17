import axios from 'axios';
axios.defaults.withCredentials = true; //支持cookie写入

import {ElMessage} from 'element-plus';


// 创建axios实例
let instance = axios.create();

axios.defaults.baseURL = "http://localhost:53000";
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}
axios.defaults.withCredentials = true// Cookie跨域


instance.all = axios.all; // 设置axios并发请求

// 请求拦截器
instance.interceptors.request.use(config => {
    //这里可以判断用户是否登录状态,取token授权信息等
    let _token = '';
    //config.headers.Authorization = 'Bearer ' + _token;
    return config
}, error => {
    ElMessage.error(error);
    return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据，否则的话抛出错误
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
    response.catch((error)=>{
        ElMessage.error(error)
    })
}, error => {
    console.log(Object.entries(error));
    const {
        config,
        code,
        request,
        response,
        isAxiosError,
        toJSON
    } = error;
    if (response) {
        errorHandle(response.status, response.data.message);
        return Promise.reject(response);
    } else {
        // 超时提示
        if (error.message.includes('timeout')) {
            ElMessage({
                message: '请求超时，请稍后重试！',
                type: 'warning'
            });
            return Promise.reject(error);
        } else if (!window.navigator.onLine) {
            ElMessage({
                message: '请检查当前网络是否通畅！',
                type: 'warning'
            });
        } else {
            ElMessage.error('请求异常，请查看输出控制台！');
            return Promise.reject(error);
        }
    }
})

const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        case 400:
            ElMessage.error('请求错误！');
            break;
        case 401:
            //loginOut();
            break;
        // 403 权限不足，拒绝访问
        case 403:
            ElMessage.error('权限不足，拒绝访问！');
            break;
        // 404请求不存在
        case 404:
            ElMessage.error('请求的资源不存在或请求地址出错！');
            break;
        case 413:
            ElMessage.error('请求体积过大哦！')
        // 服务器错误
        case 500:
            ElMessage.error('服务器错误！');
            break;
        default:
            console.log(other);
            ElMessage.error('其它错误，状态码【' + status + '】！');
            break;
    }
}

export default axios;