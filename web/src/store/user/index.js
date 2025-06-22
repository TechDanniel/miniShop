import { reqLogin} from "@/API";
import { setToken,getToken,clearToken} from '@/utils/token'

//登录与注册模块仓库
const state = {
    code: '',
    token:null,
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    SETTOKEN(state, token) {
        state.token =token.AccessToken;
    },
    //退出登录情况全部用户信息
    USERLOGOUT(state){
       state.token = '';
       state.userInfo = {};
       //本地存储数据【token】
       clearToken();
    }
};
const actions = {
    //登录业务
    userLogin({ commit }, { phone, password,isRemeber,rememberDays }) {
        //切记:当用户登录成功以后，服务器会返回相应数据息，数据信息当中包含token
        reqLogin(phone, password,isRemeber,rememberDays).then(([err,data])=>{
            if(err){
                console.log('登录失败',err)
            }else{
                setToken(data.data);
                commit("SETTOKEN", data);
            }
        })     
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
