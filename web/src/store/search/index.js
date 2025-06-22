import { reqGetSearchInfo } from "@/API"
const state={
    searchList:{}
}

const actions={
    getSearchList(store,params={}){
       reqGetSearchInfo(params).then(([error, data]) => {
            if (error) {
                console.log('请求出错:', error);
            } else {
                store.commit('GETSEARCHLIST',data)
            }
        })
    }
}

const mutations={
    GETSEARCHLIST(state,value){
        state.searchList=value
    }
}

const getters={
    goodsList(state){
        //如果网络不好，可能getSearchList还是一个空对象，控制台会报错
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}