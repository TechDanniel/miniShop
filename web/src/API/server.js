import axios from "axios";
import nprogress from "nprogress";
import  "nprogress/nprogress.css"
import { handleChangeRequestHeader, handleConfigAuth} from "./tool";
import { handleRefreshToken } from "@/utils/token";

const requests=axios.create({
    timeout:5000
})

const isExpired=(token)=>{
    if(!token) return true
    try{
        //解码JWT令牌
        const payload=JSON.parse(atob(token.split(' ')[1]))
        const now=Math.floor(Date.now()/1000)
        return payload.exp<now
    }catch(e){
        return true
    }
}

const formatToken=(token)=>{
    return `Bearer ${token}`; // 确保返回的令牌格式正确
}

//存储请求事件戳，用于防抖控制
const requestTimestamps={}
const whiteList=['/refreshToken', '/login', '/register','/home','/categoryList'] //白名单，白名单中的请求不进行token过期判断;
let isRefreshing = false; // 用于标识是否正在刷新令牌
let requestQueue = []; // 存储等待的请求队列
const handleOriginalRequest=(config)=>{
//存储由于token过期失败的请求，等到更新后resolve自动重试发起请求
 return new Promise(resolve=>{
    requestQueue.push(newToken=>{
        //更新请求头中的token
        config.headers.Authorization=newToken;
        //重新发起请求
        resolve(config);
    })
 })   
}
requests.interceptors.request.use((config)=>{
    nprogress.start()
    config=handleChangeRequestHeader(config);

    const {url,method}=config;
    const key=`${method}-${url}`
    const now=Date.now()
    //检查是否为高频请求
    if(requestTimestamps[key]&&now-requestTimestamps[key]<500){
        //如果是高频请求，取消当前请求
        return Promise.reject(new Error('请求过于频繁，请稍后再试'))
    }
    //更新事件戳
    requestTimestamps[key]=now

    return whiteList.some(url=>config.url.endsWith(url))?config:
    new Promise((resolve,reject)=>{
        const token=config.headers.Authorization
        if(isExpired(token)){
            if(!isRefreshing){
                isRefreshing=true
                handleRefreshToken(localStorage.getItem('REFRESHTOKEN')).then(data=>{
                    const newToken=data.data.AccessToken
                    localStorage.setItem('TOKEN', newToken)
                    //更新token过程是异步的，cb回调中执行resolve，触发了resolve会修改handleOriginalRequest返回promise状态。进而触发resolve(handleOriginalRequest(config))重发请求
                    requestQueue.forEach(cb=>cb(formatToken(newToken)))
                    requestQueue=[]
                }).finally(()=>[
                    isRefreshing=false
                ])
            }
            //更新了token后重新发起请求
            resolve(handleOriginalRequest(config))
        }else{
            resolve(handleConfigAuth(config))
        }
    },error=>{
        return Promise.reject(error)
    })
})

//配置默认重试参数
const default_retry_config={
    retry:3,//最大重试次数
    retryDelay:1000,//基础重试间隔（单位：ms）
    retryCondition:(error)=>{
        //可重试的错误类型网络错误或者服务器错误500
        return !error.response||(error.response.status>=500&&error.response.status<600)
    }
}
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res
},async(error)=>{
    const config=error.config||{}
    //合并自定义配置与默认配置(如果config存在retry就用config.retry,如果如果没有就用默认的)
    const {
        retry=default_retry_config.retry,
        retryDelay=default_retry_config,
        retryCondition=default_retry_config.retryCondition
    }=config

    //判断是否满足重试条件
    if(!retry||!retryCondition(error)){
        return Promise.reject(error)
    }

    //初始化重试计数器
    config.__retryCount=config.__retryCount||0
    //检查是否超过最大重试次数
    if(config.__retryCount>=retry){
        return Promise.reject(error)
    }
    config.__retryCount+=1
    //指数退避算法（增加随机抖动避免惊群效应）
    const delay=Math.pow(2,config.__retryCount)*retryDelay+Math.random()*500
    //延迟重试,在delay好毫秒后执行resolve将promise的状态改为fulfilled
    await new Promise(resolve=>setTimeout(resolve,delay))
    //重新发起请求（保留原始配置）
    return axios(config)
})

//重新封装get
const Get=(url,params={},cleanFn)=>
    new Promise((resolve)=>{
    // get 方法第二个参数需要传入一个配置对象，而 params 是这个配置对象中的一个属性,等同于 { params: params }
    //这里使用requests.get会把params默认转换为query参数
    requests.get(url,{params}).then(result=>{
        let res;
        if(cleanFn!==undefined){
            res=cleanFn(result.data)
        }else{
            res=result.data
        }
        resolve([null,res])
    }).catch(error=>{
        resolve([error,null])
    })
})

const Post=(url,data,config)=>{
    return new Promise((resolve)=>{
        requests.post(url,data,config).then(result=>{
            resolve([null,result.data])
        }).catch((err) => {
            resolve([err,null])
        })
    })
}

const Del=(url,data,params={})=>{
    return new Promise((resolve)=>{
        requests.delete(url,{params}).then(result=>{
            resolve([null,result.data]).catch(err=>{
                resolve([err,null])
            })
        })
    })
}

export {requests,Get,Post,Del};