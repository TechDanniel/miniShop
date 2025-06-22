<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
        <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
        <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg" />
          </div>
          <div class="right-info">
            <p class="title">{{ skuInfo.skuName }}</p>
            <p class="attr">
              {{ skuInfo.skuDesc }} 数量:{{ $route.query.skuNum }}
            </p>
          </div>
        </div>
        <div class="right-gocart">
          <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
          <router-link to="/shopcart">去购物车结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'AddCartSuccess',
    computed:{
        skuInfo(){
            return JSON.parse(sessionStorage.getItem('skuInfo'))
        }
    }
}
</script>

<style scoped>
.cart-complete {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
    padding-bottom: 20px;
}
.cart-complete h3 {
    font-weight: 500;
    font-size: 18px;
    color: #43a047;
    padding-top: 20px;
    padding-bottom: 15px;
    margin: 0;
    letter-spacing: 1px;
}
.icon-pc-right {
    border: 2px solid #43a047;
    color: #43a047;
    padding: 3px;
    margin-right: 8px;
    border-radius: 15px;
}
.goods {
    overflow: hidden;
    padding: 18px 0 10px 0;
}
.left-good {
    float: left;
}
.left-pic {
    border: 1px solid #b2dfdb;
    width: 60px;
    float: left;
    border-radius: 6px;
}
.left-pic img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
}
.right-info {
    color: #388e3c;
    float: left;
    margin-left: 14px;
}
.title {
    width: 100%;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 500;
}
.attr {
    color: #66bb6a;
    font-size: 13px;
}
.right-gocart {
    float: right;
    margin-top: 10px;
}
.right-gocart a {
    padding: 7px 36px;
    font-size: 15px;
    line-height: 22px;
    color: #fff;
    background-color: #66bb6a;
    text-decoration: none;
    box-sizing: border-box;
    border: 1px solid #43a047;
    border-radius: 4px;
    margin-left: 10px;
    transition: background 0.2s, border 0.2s;
}
.right-gocart a:hover {
    background-color: #43a047;
    border: 1px solid #388e3c;
}
.right-gocart a:active {
    background-color: #388e3c;
    border: 1px solid #2e7d32;
}
.btn-danger {
    background-color: #43a047;
    color: #fff;
}
.btn-danger:hover {
    background-color: #388e3c;
}
</style>