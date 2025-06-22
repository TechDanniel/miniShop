<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart) in cartList"
          :key="cart.skuId"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              @click="handler('check',cart.skuNum,cart)"
              :checked="cart.isChecked===1"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus',-1,cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change',$evnet.target.value*1,cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add',1,cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @click="changeCheckAll"
          :checked="isAllCheck&&cartList.length>0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a>删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <div class="sum-btn" @click="sumOrder">结算</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:'shopcart',
  data(){
    return{
      //所有订单的id
      orderIds:[]
    }
  },
  mounted(){
    this.$store.dispatch('getCartList')
  },
  computed:{
      ...mapGetters(['cartList']),
      isAllCheck(){
        return this.cartList.every(item=>item.isChecked===1)
      },
      totalPrice(){
        return this.cartList.reduce((pre,good)=> {
          return this.checkedOrderIds.includes(good.skuid)?pre+good.skuPrice*good.skuNum:pre
        },0);
      },
      // 新增计算属性，用于获取已勾选商品的 skuid 数组
      checkedOrderIds() {
        return this.cartList.filter(item => item.isChecked === 1).map(item => item.skuid);
      }
  },
  methods:{
    async handler(type,disNum,cart){
      switch(type){
        case 'add':
          disNum=1
          break
        case 'minus':
          disNum=-1
          break
        case 'change':
          if(isNaN(disNum)||disNum<1){
            disNum=0
          }else{
            parseInt(disNum)-cart.skuNum
          }
          break
        case 'check':
          cart.isChecked=!cart.isChecked
          break
      }
      try{
        await this.$store.dispatch('addOrUpdateSortCart',{skuId:cart.skuid,skuNum:disNum,isChecked:cart.isChecked?1:0})
        this.$store.dispatch('getCartList')
      }catch(error){
          alert(error.message)
      }
    },
    async changeCheckAll(){
      const newCheckStatus = !this.isAllCheck;
      // 修改购物车列表中每个商品的勾选状态
      this.cartList.forEach(item => {
        item.isChecked = newCheckStatus ? 1 : 0;
      });
      this.orderIds=this.cartList.map(item=>item.skuid)
      await this.$store.dispatch('batchUpdateCart', { orderIds: this.orderIds, newStatus: newCheckStatus });
    },
    async sumOrder(){
      console.log(this.checkedOrderIds)
      if(this.checkedOrderIds.length>0) {
        await this.$store.dispatch('Settle',{orderIds:this.checkedOrderIds})
        this.$router.push('/trade')
      }
      else{alert('请勾选商品')}
    }
  }
}
</script>

<style>
.cart {
  width: 1200px;
  margin: 0 auto;
}
.cart h4{
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
    color: #218838;
}
.cart-main .cart-th {
    background: #e6f4ea;
    border: 1px solid #b2dfb2;
    padding: 10px;
    overflow: hidden;
}
.cart-th>div{
    float: left;
}
.cart-th1 {
    width: 25%;
}
.cart-th1 input{
    vertical-align: middle;
}
.cart-th1 span{
    vertical-align: middle;
}
.cart-th2 {
    width: 25%;
}
.cart-th3,
    .cart-th4,
    .cart-th5,
    .cart-th6 {
    width: 12.5%;
}
.cart-body {
    margin: 15px 0;
    border: 1px solid #b2dfb2;
}
.cart-list {
    padding: 10px;
    border-bottom: 1px solid #b2dfb2;
    overflow: hidden;
}
.cart-list>li{
    float: left;
}
.cart-list-con1 {
    width: 15%;
}
.cart-list-con2 {
    width: 35%;
}
.cart-list-con2 img{
    width: 82px;
    height: 82px;
    float: left;
    border: 1px solid #b2dfb2;
    border-radius: 4px;
}
.item-msg {
    float: left;
    width: 150px;
    margin: 0 10px;
    line-height: 18px;
    color: #218838;
}
.cart-list-con4 {
    width: 10%;
}
.cart-list-con5 {
    width: 17%;
}
.mins {
    border: 1px solid #b2dfb2;
    border-right: 0;
    float: left;
    color: #218838;
    width: 6px;
    text-align: center;
    padding: 8px;
    background: #e6f4ea;
    cursor: pointer;
}
.cart-list-con5 input{
    border: 1px solid #b2dfb2;
    width: 40px;
    height: 38px;
    float: left;
    text-align: center;
    font-size: 14px; 
    color: #218838;
    background: #f6fff6;
}
.plus {
    border: 1px solid #b2dfb2;
    border-left: 0;
    float: left;
    color: #218838;
    width: 6px;
    text-align: center;
    padding: 8px;
    background: #e6f4ea;
    cursor: pointer;
}
.cart-list-con6 {
    width: 10%;
}
.sum {
    font-size: 16px;
    color: #218838;
}
.cart-list-con7 {
    width: 13%;
}
.cart-list-con7 a{
    color: #218838;
    transition: color 0.2s;
}
.cart-list-con7 a:hover {
    color: #155724;
}
.cart-tool {
    overflow: hidden;
    border: 1px solid #b2dfb2;
    background: #e6f4ea;
}
.select-all {
    padding: 10px;
    overflow: hidden;
    float: left;
}
.select-all span{
    vertical-align: middle;
    color: #218838;
}
.select-all input{
    vertical-align: middle;
    accent-color: #218838;
}
.option {
    padding: 10px;
    overflow: hidden;
    float: left;
}
.option a{
    float: left;
    padding: 0 10px;
    color: #218838;    
    transition: color 0.2s;
}
.option a:hover {
    color: #155724;
}
.money-box {
    float: right;
}
.chosed {
    line-height: 26px;
    float: left;
    padding: 0 10px;
    color: #218838;
}
.sumprice {
    width: 200px;
    line-height: 22px;
    float: left;
    padding: 0 10px;
    color: #218838;
}
.summoney {
    color: #28a745;
    font-size: 16px;
}
.sumbtn {
    float: right;
}
.sumbtn .sum-btn{
    display: block;
    position: relative;
    width: 96px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    background:#28a745;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    box-shadow: 0 2px 8px rgba(40,167,69,0.08);
}
</style>