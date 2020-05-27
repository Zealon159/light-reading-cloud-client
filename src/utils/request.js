import axios from 'axios'
import router from '../router'
import db from '../utils/sessionStorage'
import * as common from './common'

axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
        alert(success.data.msg);
        return;
    }
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        alert('服务器迷路了( ╯□╰ )，再试一次吧。');
    } else if (error.response.status == 403) {
        alert('权限不足，请联系管理员');
    } else if (error.response.status == 401) {
        // 防止重复弹出消息
        if(db.get("LOGINFLAG") == "0"){
            alert('尚未登录或登录状态已过期，请登录')
            db.remove("LOGINFLAG")
            db.save("LOGINFLAG","1")
        }
        router.replace('/');
    } else if (error.response.status == 429) {
        alert('骚年，你的手速有点快哦！(￣.￣)...')
    } else {
        alert('未知错误!')
    }
    return;
})

let base = common.baseApi;

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params, headers) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: headers
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params, headers) => {
    let apiUrl = `${base}${url}`;
    apiUrl = getApiUrl(apiUrl,params);
    // 请求
    return axios({
        method: 'get',
        url: apiUrl,
        data: params,
        headers: headers
    })
}
export const deleteRequest = (url, params) => {
    let apiUrl = `${base}${url}`;
    apiUrl = getApiUrl(apiUrl,params);
    return axios({
        method: 'delete',
        url: apiUrl,
        data: params
    })
}

// 处理参数转换
function getApiUrl(url,params){
    let apiUrl = url;
    let i = 0;
    for (const key in params) {
        const value = params[key];
        const param = key+"="+value;
        let s = '?';
        if ( i > 0 ){
            s = '&';
        }
        apiUrl = apiUrl+s+param;
        i++;
    }
    return apiUrl;
}