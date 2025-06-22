import { reqCartList } from "@/API"

const state={
    cartList: []
}
const actions={
    //获取购物车列表数据
   getCartList({commit}){
        reqCartList().then(([error,data])=>{
            if (error) {
                console.log('请求出错:', error);
            } else {
                commit('GETCARTLIST',data)
            }
        })
    }
}
const mutations={
    GETCARTLIST(state,value){
        state.cartList=value
    }
}
const getters={
    cartList(state){
        return state.cartList||{}
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}