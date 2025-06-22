//封装axios，处理mock数据
import store from '@/store'
import axios from 'axios'
import nProgress from 'nprogress'
const requests=axios.create({
    baseURL:'/mock',
    timeout:5000
})
requests.interceptors.request.use((config)=>{
    nProgress.start()
    if(store.state.detail.uuidTOKEN){
        config.headers.userTempId=store.state.detail.uuidTOKEN
    }
    return config
})

requests.interceptors.response.use(res=>{
    nProgress.done()
    return res.data
},error=>Promise.reject(new Error(error)))

export default requests