//统一管理接口
import {requests,Get,Post,Del} from './server'
import mockRequests from './mockAjax'

export const reqCatagoryList=()=>{
    return Get('/api/categoryList')
}

export const reqGetBannerList=()=>{
return mockRequests({
    url:"/banner",
    method:'get'
})
}

export const reqGetFloorList=()=>{
    return mockRequests({
        url:"/floor",
        method:'get'
    })
}

//获取搜索模块数据
export const reqGetSearchInfo=(data)=>{
    return Post('/api/list',data)
}

//获取详细商品信息
export const reqGetGoodsInfo=(params)=>{
    return Get('/api/detail',params)
}

//将产品添加到购物车中
export const reqAddOrUpdateSortCart=(skuId,skuNum,isChecked)=>{
    return Post('/api/addTocart',{skuId,skuNum,isChecked})
}

//批量更新购物车的状态
export const reqBatchUpdateCart=(orderIds,newStatus)=>{
    return Post('/api/batchUpdateCart',{orderIds,newStatus})
}

//获取购物车数据
export const reqCartList=()=>{
    return Get('/api/cartList')
}

//登录接口
export const reqLogin = (phone,password,isRemeber,rememberDays)=>Post('/api/user/login',{phone,password,isRemeber,rememberDays},{});

//刷新accessToken
export const reqRefreshToken = (refreshToken) => Post('/api/user/refreshToken', { refreshToken }, {});

//获取用户地址信息
export const reqAddressInfo = ()=>Get('/api/findUserAddressList');

//购物车结算接口
export const reqSettle =(orderIds,userId)=>Post('/api/settle',{orderIds,userId});

//退出登录的接口【通知服务器销毁当前token身份】
///api/user/passport/logout  get 
export const reqLogout = ()=>mockRequests({url:`/user/logout`,method:'get'});

//注册用户接口
//api/user/passport/register  post  phone code password
export const reqRegister = (phone,code,password)=>request({url:`/user/passport/register`,method:'post',data:{phone,code,password}});

//提交订单的接口
export const reqSubmitOrder = (data)=>Post('/api/order',{data},{});

//判断用户是否支付成功
///api/payment/weixin/queryPayStatus/{orderId}  get
export const reqOrderStatus = (orderNo)=>Post('/api/payment',{orderNo},{});

//获取用户订单列表数据
///api/order/auth/{page}/{limit}   get
//page:代表当前第几页
//limit：代表的是每一页多少条数据
export const reqOrderList = (page,limit)=>Get(`api/orderList/${page}/${limit}`);

//获取用户信息的接口
//api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>request({url:`/user/passport/auth/getUserInfo`,method:'get'});