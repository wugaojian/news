import axios from 'axios'
import store from '../store'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(function (config) {
    const { user } = store.state
    // 如果用户已经登录，将token统一放在表头
    if (user) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 加载完一定要把config返回
    return config
})

export default request