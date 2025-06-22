import { reqAddressInfo, reqSettle, reqSubmitOrder,reqOrderStatus,reqOrderList } from "@/API"
import { client } from "@/router"

const state={
    address:[],
    orderInfo:{},
    payInfo:{},
    myOrderList:{}
}

const actions={
    getAddressInfo({commit}){
        reqAddressInfo().then(([error,data])=>{
            if(error){
                console.log('请求出错:', error);
            } else {
                commit('GETADDRESSINFO',data)
            }
        })
    },
    Settle({commit},{orderIds}){
        console.log(orderIds)
        reqSettle(orderIds).then(([error,data])=>{
            if(error){
                console.log('请求出错:', error);
            }else{
                commit('GETORDERINFO',data)
                // 发送消息
                client.send({type:'settle',message:orderIds});
            }
        })
    },
    submitOrder({commit},data){
        reqSubmitOrder(data).then(([error,data])=>{
            if(data){
                commit('GETPAYINFO',data)
            }else{
                console.log('订单提交出错:', error);
            }
        })
    },
    async payStatus(orderId){
        const [error, data] = await reqOrderStatus(orderId);
        if (data) {
            if (data.code === 200) {
            client.send({type:'PAYSTATUS',message:'支付成功'});
            } else {
            client.send({type:'PAYSTATUS',message:'支付失败，请稍后再试'});  
            }
            return data;
        } else {
            console.log('查询支付状态出错:', error);
            return { code: 500, message: '查询支付状态出错' }; 
        }
    },
    async getOrderList({commit},{page,limit}){
        const [error,data]=await reqOrderList(page,limit)
        if(data){
            commit('GETORDERLIST',data)
        }else{
            console.log('获取订单信息出错')
        }
    }
}

const mutations={
    GETADDRESSINFO(state,value){
        state.address=value||[]
    },
    GETORDERINFO(state,value){
        state.orderInfo=value.data||{}
        console.log(state.orderInfo)
    },
    GETPAYINFO(state,value){
        state.payInfo=value.data||{}
        console.log('订单信息',state.payInfo)
    },
    GETORDERLIST(state,value){
        state.myOrderList=value||{}
    }
}

const getters={
    orderInfo(state){
        return state.orderInfo||{}
    },
    address(state){
        return state.address||[]
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}