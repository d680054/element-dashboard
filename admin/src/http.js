import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
        baseURL: 'http://localhost:3001/admin/api/rest/',
    })
    //http.uploadURL = 'http://localhost:3001/admin/api/';

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
})

http.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        if (err.response.status === 401) {
            router.push('/login');
        }
    }

    //that.$message.error({showClose: true, message: result.errmsg || '登录失败', duration: 2000});
    return Promise.reject(err);
})

export default http