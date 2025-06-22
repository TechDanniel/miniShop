import { reqGetGoodsInfo,reqAddOrUpdateSortCart, reqBatchUpdateCart } from "@/API"
import { getUUID } from "@/utils/uuid-token"
const state={
    goodsInfo:{},
    cartList:[],
    //创建游客临时身份，只创建一次
    uuidTOKEN:getUUID()
}
const actions={
    getGoodsInfo({commit},params){
        reqGetGoodsInfo(params).then(([error, data]) => {
            if (error) {
                console.log('请求出错:', error);
            } else {
                commit('GETGOODSINFO',data)
            }
        }); 
    },
    addOrUpdateSortCart({commit},{skuId,skuNum,isChecked}){
        //加入购物车后发请求，将前端参数带给服务器
        reqAddOrUpdateSortCart(skuId,skuNum,isChecked).then(([error,data])=>{
            if (error) {
                console.log('请求出错:', error);
            } 
        })
    },
    batchUpdateCart({commit},{orderIds,newStatus}){
        reqBatchUpdateCart(orderIds,newStatus).then(([error,data])=>{
            if(error){
                console.log("请求出错")
            }
        })
    }
}
const mutations={
    GETGOODSINFO(state,value){
        state.goodsInfo=value
    },

}
const getters={
    //路径导航，至少是一个空对象，避免服务器还未返回goodsInfo，空对象的属性为undefined，组件里使用undeifined的属性会报错
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    //产品信息
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    //产品售卖属性
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}