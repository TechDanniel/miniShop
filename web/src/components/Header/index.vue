<template>
  <div class="header">
    <!-- 头部第一行 -->
    <div class="top">
        <div class="container">
            <!-- 登录部分 -->
            <div class="loginList">
                <p>miniShop欢迎您！</p>
                <p>
                    <span>请</span>
                    <router-link to="/login">登录</router-link>
                    <router-link to="/regiser" class="register">免费注册</router-link>
                </p>
            </div>
            <!-- 分类 -->
             <div class="typeList">
                <router-link to="">我的订单</router-link>
                <router-link to="">我的购物车</router-link>
                <a href="">我的商城</a>
                <a href="">miniShop会员</a>
                <a href="">企业采购</a>
                <a href="">关注miniShop</a>
                <a href="">合作招商</a>
                <a href="">商家后台</a>
             </div>
        </div>
    </div>
    <!-- 头部第二行-搜索区域-->
     <div class="bottom clearfix">
        <div class="logoArea">
            <router-link to="/home">
                <img src="./images/logo.png">
            </router-link>
        </div>
        <div class="searchArea">
            <form>
                <input type="text" v-model="keyword">
                <button class="btn" @click="nav">搜索</button>
            </form>
        </div>
     </div>
  </div>
</template>

<script>

export default {
    name:'',
    data(){
        return{
            keyword:''
        }
    },
    mounted(){
        //通过全局总线清除关键字
        this.$bus.$on('rKeyword',()=>{
            this.keyword=''
        })
    },
    methods:{
        nav(){
            let location={
                name:'search',
                params:{
                    keyword:this.keyword||undefined
                }
            }
            location.query=this.$route.query
            this.$router.push(location)
        }
    },
    beforeCreate(){
        //解除事件绑定
        this.$bus.$off('rKeyword')
    }
}
</script>

<style>
    .header {
        font-family: 'Segoe UI', 'Arial', sans-serif;
        background: #e8f5e9;
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .top{
        background-color: #43a047;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #c8e6c9;
        font-size: 14px;
        color: #fff;
    }
    .container{
        width: 1200px;
        margin:auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .loginList{
        display: flex;
        align-items: center;
    }
    .loginList p{
        margin-right: 16px;
        margin-bottom: 0;
    }
    .loginList .register{
        border-left: 1px solid #a5d6a7;
        padding-left: 8px;
        margin-left: 8px;
        font-weight: 500;
        transition: color 0.2s;
    }
    .loginList .register:hover {
        color: #1b5e20;
    }
    .loginList a, .loginList span {
        color: #fff;
        text-decoration: none;
        margin: 0 2px;
    }
    .loginList a:hover {
        color: #a5d6a7;
    }
    .typeList{
        display: flex;
        align-items: center;
    }
    .typeList a, .typeList router-link {
        padding: 0 14px;
        border-left: 1px solid #a5d6a7;
        color: #fff;
        text-decoration: none;
        transition: color 0.2s;
        font-size: 14px;
    }
    .typeList a:first-child, .typeList router-link:first-child {
        border-left: none;
    }
    .typeList a:hover, .typeList router-link:hover {
        color: #c8e6c9;
    }
    .bottom{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        padding: 18px 0 10px 0;
        background: #e8f5e9;
    }
    .logoArea img{
        width: 120px;
        margin: 0 0 0 20px;
        display: block;
    }
    .searchArea{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .searchArea form {
        display: flex;
        align-items: center;
    }
    .searchArea input{
        box-sizing: border-box;
        width: 420px;
        height: 36px;
        padding: 0 12px;
        border: 2px solid #43a047;
        border-radius: 4px 0 0 4px;
        font-size: 16px;
        outline: none;
        background: #f1f8e9;
        transition: border-color 0.2s;
    }
    .searchArea input:focus {
        border-color: #388e3c;
        background: #e8f5e9;
    }
    .btn{
        height: 36px;
        width: 80px;
        background-color: #43a047;
        border: none;
        color: #fff;
        border-radius: 0 4px 4px 0;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .btn:hover {
        background: #388e3c;
    }

    .searchArea input {
        width: 300px;
    }
</style>