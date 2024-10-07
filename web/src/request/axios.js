import axios from 'axios';
import {notification} from "ant-design-vue";

axios.defaults.withCredentials = true// Cookie跨域
axios.defaults.baseURL = "https://localhost:7122/api";
// axios.defaults.baseURL = "https://localhost:44311/api";

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}

// 创建axios实例
const instance = axios.create();

instance.all = axios.all; // 设置axios并发请求

// 请求拦截器
instance.interceptors.request.use(config => {
    // 这里可以判断用户是否登录状态,取token授权信息等
    let _token = '';
    // config.headers.Authorization = 'Bearer ' + _token;
    return config;
}, error => {
    notification['error']({message: 'Error', description: `${error.message}`,});
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据，否则的话抛出错误
    if (response.status === 200) {
        if (response.data.isSuccess){
            // 发送成功通知
            // notification['success']({message: 'Success', description: `${response.data.message}`,});
        }else{
            notification['error']({message: 'Error', description: `${response.data.message}`,});
        }

        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, error => {
    const { response } = error;
    if (response) {
        errorHandle(response);
    } else {
        // 超时提示
        if (error.message.includes('timeout')) {
            notification['warning']({message: 'Error', description: `${'请求超时，请稍后重试！'}`,});
        } else if (!window.navigator.onLine) {
            notification['warning']({message: 'Error', description: `${'请检查当前网络是否通畅！'}`,});
        } else {
            notification['warning']({message: error.code, description: `${'请求异常：'+error.message + '，详情请查看输出控制台！'}`,});
        }
    }
    return Promise.reject(error);
});

// 错误处理函数
function errorHandle(response) {
    const status = response.status
    const message = response.message
    const obj = JSON.parse(response.request.responseText);
    console.error('错误：',obj)

    switch (status) {
        case 400:
            notification['error']({message: 'Error 400', description: '请求错误！',});
            break;
        case 401:
            // 登出逻辑
            break;
        case 403:
            notification['error']({message: 'Error 403', description: '权限不足，拒绝访问！',});
            break;
        case 404:
            notification['error']({message: 'Error 404', description: '请求的资源不存在或请求地址出错！',});
            break;
        case 413:
            notification['error']({message: 'Error 413', description: '请求体积过大！',});
            break;
        case 415:
            notification['error']({message: 'Error 415', description: '请求的格式不受支持！',});
            break;
        case 500:
            notification['error']({message: 'Error 500', description: `服务器错误！${message}`,});
            break;
        default:
            notification['error']({message: 'Error', description: `${'其它错误，状态码【' + status + '】：' + message}`,});
            break;
    }
}
export default instance;