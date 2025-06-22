import { reqCatagoryList, reqGetBannerList,reqGetFloorList } from "@/API"
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const actions={
    categoryList(store){
        reqCatagoryList().then(([error, data]) => {
            if (error) {
                console.log('请求出错:', error);
            } else {
                store.commit('CATEGORYLIST',data)
            }
        });
    },
    async BannerList(store){
        let result=await reqGetBannerList()
        if(result.code===200){
            store.commit('BANNERLIST',result.data)
        }
    },
    async FloorList(store){
        let result=await reqGetFloorList()
        if(result.code===200){
            store.commit('FLOORLIST',result.data)
        }
    }
}
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList=value
    },
    BANNERLIST(state,value){
        state.bannerList=value
    },
    FLOORLIST(state,value){
        state.floorList=value
    }
}

const getters={}

export default{
    state,
    actions,
    mutations
}