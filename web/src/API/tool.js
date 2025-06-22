//1.请求拦截
//1.1请求的调整
export const handleChangeRequestHeader=(config)=>{
    //标识请求体是标准json格式
    config.headers['Content-Type']='application/json';
    return config;
}

//1.2配置用户标识
export const handleConfigAuth=(config)=>{
    config.headers['Authorization']='Bearer ' + localStorage.getItem('TOKEN')||"";
    return config;
}
