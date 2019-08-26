import axios, {AxiosResponse, AxiosRequestConfig} from 'axios'
import {Message} from "element-ui";
import router from '@/router'
/**
 * http 请求工具类
 * 请求拦截器： 负责将客户端表示token值存储并放置在头部提交给服务器
 * 相应拦截器： 负责全局处理业务请求的网络或业务错误
 */

let service = axios.create({
    timeout: 8000, // 超时时间
    // baseURL: "http://localhost:5001/api"
});
// 请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
    if (localStorage.getItem('tsToken')) {
        config.headers.Authorization = localStorage.getItem('tsToken')
    }
    console.log(config)
    return config
}, (err: any) => {
    return Promise.reject(err)
});
// 响应拦截器，对返回的信息（成功与否）进行相关的配置
service.interceptors.response.use((res: AxiosResponse) => {
    return res
}, (err: any) => {
    let errMsg: string = '';
    if (err && err.response.status) {
        switch (err.response.status) {
            case 401:
                errMsg = '登录状态失效，请重新登录';
                // 登陆失效，移除token，跳转到登录页
                localStorage.removeItem('tsToken');
                router.push('/login');
                break;
            case 403:
                errMsg = '拒绝访问';
                break;

            case 408:
                errMsg = '请求超时';
                break;

            case 500:
                errMsg = '服务器内部错误';
                break;

            case 501:
                errMsg = '服务未实现';
                break;

            case 502:
                errMsg = '网关错误';
                break;

            case 503:
                errMsg = '服务不可用';
                break;

            case 504:
                errMsg = '网关超时';
                break;

            case 505:
                errMsg = 'HTTP版本不受支持';
                break;

            default:
                errMsg = err.response.data.msg;
                break;
        }
    } else {
        errMsg = err;
    }
    Message.error({message: errMsg, duration: 2000});
    return Promise.reject(err)
});

export default service
