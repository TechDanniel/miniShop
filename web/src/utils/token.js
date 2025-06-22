import { reqRefreshToken } from '../API/index';

//本地存储持家化存储token
export const setToken = (data)=>{
   const {AccessToken=null, RefreshToken=null} = data;
   if(AccessToken) localStorage.setItem('TOKEN', AccessToken);
   if(RefreshToken) localStorage.setItem('REFRESHTOKEN', RefreshToken);
}

//清除tokens
export const clearToken =()=>{
   localStorage.removeItem('TOKEN');
   localStorage.removeItem('REFRESHTOKEN');
}


export const getToken = ()=>{
   return localStorage.getItem('TOKEN');
}

export const handleRefreshToken=(refreshToken)=>{
    return new Promise((resolve,reject)=>{
        reqRefreshToken(refreshToken).then(([err,data])=>{
            if(err){
                console.error('刷新token失败', err);
                reject(err);
                return;
            }else{
               setToken(data)
               resolve(data)
            }
        })
    })
}