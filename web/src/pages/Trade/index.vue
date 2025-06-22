<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <!-- 收件人信息 -->
      <div
        class="address clearFix"
        v-for="(user, index) in address"
        :key="user.id"
      >
        <span class="username" :class="{ selected: user.isDefault == 1 }">{{
          user.consignee
        }}</span>
        <p @click="changeAddress(user)">
          <span class="s1">{{ user.fullAddress }}</span>
          <span class="s2">{{ user.phoneNum }}</span>
          <!-- 五个收件人:五个收件人都有默认地址，只有一个人才是默认地址 -->
          <span class="s3" v-if="user.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <!-- 展示购物车商品清单地方 -->
        <ul
          class="list clearFix"
          v-for="(item, index) in orderInfo.list"
          :key="index"
        >
          <li>
            <img
              :src="item.imgUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </li>
          <li>
            <p>
              {{ item.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ item.skuPrice }}.00</h3>
          </li>
          <li>X{{ item.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="message"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>1</i>件商品，总商品金额</b>
          <span>¥{{ totalAmount }}.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{totalAmount }}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ defaultAddress.fullAddress }}</span>
        收货人：<span>{{ defaultAddress.consignee }}</span>
        <span>{{ defaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- 编程式导航：在路由跳转之前，发请求的生成订单号 -->
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';

export default {
  name: "Trade",
  data() {
    return {
      //收集用户的留言信息
      message: "",
      orderId:''
    };
  },
  //交易页面的组件挂载完毕钩子
  //在开发的时候尽可能别再生命周期函数中书写acync、await关键字
  mounted() {
    this.getData()
    console.log('订单信息',this.orderInfo)
  },
  methods: {
    async getData() {
        await this.$store.dispatch('getAddressInfo');
    },
    //点击设置默认地址回调
    changeAddress(user) {
      //user：用户点击的那个收件人
      this.address.forEach((item) => {
        item.isDefault = "0";
      });
      //点击的收件人为1
      user.isDefault = "1";
    },
    //提交订单
    async submitOrder() {
      //整理参数
      //交易信息：收件人、手机号、地址、购买产品（购物车列表数据）
      let data = {
        receiver_name: this.defaultAddress.consignee, //收件人的名字
        receiver_phone: this.defaultAddress.phoneNum, //收件人得电话
        receiver_address: this.defaultAddress.fullAddress, //收件人地址
        payment_way: "ONLINE", //在线支付
        totalAmount: this.totalAmount, //总金额
        order_comment: this.message, //用户留言信息
        orderDetailList: this.orderInfo, //购物车清单
      };
      //发请求
      const OrderNo=this.orderInfo.orderNo
      //失败返回code->201 成功返回->200:返回数据当中带有数字【支付订单号:品牌每笔交易的标识符】
      //成功
      if(OrderNo){
        this.orderId = OrderNo;
        await this.$store.dispatch('submitOrder',data)
        //路由跳转到支付页面
        this.$router.push('/pay/?orderId='+this.orderId);
      }else{
        //失败
        alert(result.message);
      }
    },
  },
  computed: {
    ...mapGetters(['address','orderInfo']),
    //计算出---默认地址用户
    defaultAddress() {
      //数组的find方法:find返回的是数组里面复合条件的元素（对象）
      //filter|map：最终返回的是数组，还需要通过下角标获取
      return this.address.find((user) => user.isDefault == "1") || {};
    },
    totalAmount(){
      //计算总金额
      return this.orderInfo.list.reduce((total, item) => {
        return total + item.skuPrice * item.skuNum;
      }, 0);
    }
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
    color: #218838;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid #b2dfdb;
    padding: 25px;
    box-sizing: border-box;
    background: #f1f8e9;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
      color: #388e3c;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #b2dfdb;
        position: relative;
        color: #388e3c;
        background: #e8f5e9;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
      }

      .username.selected {
        border-color: #43a047;
        background: #c8e6c9;
        color: #fff;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #43a047;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #dcedc8;
      }
    }

    .line {
      height: 1px;
      background-color: #b2dfdb;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #e8f5e9;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
        color: #388e3c;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #b2dfdb;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
          background: #f1f8e9;
          color: #388e3c;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      background: #e0f2f1;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
        color: #388e3c;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #388e3c;
            font-weight: 400;
          }

          h3 {
            color: #43a047;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
        color: #388e3c;
      }

      textarea {
        width: 100%;
        border-color: #b2dfdb;
        line-height: 1.8;
        outline: none;
        resize: none;
        background: #f1f8e9;
        color: #388e3c;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
        color: #388e3c;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: #43a047;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #e8f5e9;
    border: 1px solid #b2dfdb;

    div {
      line-height: 30px;
    }

    .price span {
      color: #43a047;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #388e3c;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #43a047;
      border: none;
      transition: background 0.2s;
      cursor: pointer;
    }
    .subBtn:hover {
      background-color: #388e3c;
    }
  }
}
</style>