<template>
  <div class="detail" style=" float: left; margin-left:80px ;">
    <!-- 商品分类导航 -->
    <typeNav />
    <!-- 主要内容区域 -->
    <section class="con">
        <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-show="categoryView.category1Name">
          {{categoryView.category1Name}}
        </span>
        <span v-show="categoryView.category2Name">
          {{ categoryView.category2Name }}
        </span>
        <span v-show="categoryView.category3Name">
          {{ categoryView.category3Name }}
        </span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="skuImageList" />
          <!-- 小图列表 -->
          <ImageList :skuImageList="skuImageList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
            <div class="goodsDetail">
                <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
                <p class="news">{{ skuInfo.skuDesc }}</p>
                <div class="priceArea">
                    <div class="priceArea1">
                        <div class="title">
                            价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                        </div>
                        <div class="price">
                            <i>¥</i>
                            <em>{{ skuInfo.price }}</em>
                            <span>降价通知</span>
                        </div> 
                        <div class="remark">
                            <i>累计评价</i>
                            <em>65545</em>
                        </div>   
                    </div>
                    <div class="priceArea2">
                        <div class="title">
                            <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                        </div>
                        <div class="fixWidth">
                            <i class="red-bg">加价购</i>
                            <em class="t-gray"
                                >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                        </div>
                    </div>
                </div>
                <div class="support">
                    <div class="supportArea">
                        <div class="title">
                            支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                        </div>
                        <div class="fixWidth">
                            以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                        </div>
                    </div>
                    <div class="supportArea">
                        <div class="title">配 送 至</div>
                        <div class="fixWidth">广东省 深圳市 宝安区</div>
                    </div>
                </div>
            </div>

            <div class="choose">
            <div class="chooseArea">
                <div class="choosed"></div>
                <dl v-for="(spuSaleAttr) in spuSaleAttrList" :key="spuSaleAttr.id">
                  <dd class="title">{{ spuSaleAttr.saleAttrName }}</dd>
                  <dt 
                  :class="{active: spuSaleAttrValue.isChecked === 1}"
                  @click="changeActive(spuSaleAttrValue,spuSaleAttr.spuSaleAttrValueList)"
                  v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList" :key="spuSaleAttrValue.id">
                    {{ spuSaleAttrValue.saleAttrValueName }}
                  </dt>
                </dl>
            </div>
            <div class="cartWrap">
                <div class="controls">
                    <input autocomplete="off" class="itxt" v-model="skuNum" @change="changeSkuNum">
                    <a href="javascript:" class="plus" @click="plus">+</a>
                    <a href="javascript:" class="mins" @click="minus">-</a>
                </div> 
                <!-- 加入购物车 -->
                <div class="add" @click="addShopCar">
                    <a>加入购物车</a>
                </div>
            </div>   
        </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <div class="detail">
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###">
                商品介绍
              </a>
            </li>
            <li>
              <a href="###">
                规格与包装
              </a>
            </li>
            <li>
              <a href="###">
                售后保障
              </a>
            </li>
            <li>
              <a href="###">
                商品评价
              </a>
            </li>
            <li>
              <a href="###">
                手机社区
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageList from './imageList/ImageList.vue';
import Zoom from './Zoom/Zoom.vue';
export default {
  name:'',
  components:{
    ImageList,
    Zoom
  },
  data(){
    return{
      skuNum:1
    }
  },
  mounted(){
    this.$store.dispatch('getGoodsInfo',{goodId:this.$route.params.goodId})
  },
  computed:{
    ...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
    skuImageList(){
      return this.skuInfo.skuImageList||[]
    }
  },
  methods:{
    //改变属性选择的高亮
    changeActive(spuSaleAttrValue,attr){
      attr.forEach(item => {
        item.isChecked=0
      });
      spuSaleAttrValue.isChecked=1
    },
    //用户输入购买数量的一些约束
    changeSkuNum(event){
      let value=event.target.value*1
      if(isNaN(value)||value<1){
        this.skuNum=1
      }else{
        this.skuNum=parseInt(value)
      }
    },
    //增加购买数量
    plus(){
      this.skuNum++
    },
    //减少购买数量
    minus(){
      if(this.skuNum>1){
        this.skuNum--
      }
    },
    //将购物参数带给服务器
    async addShopCar(){
      try{
        await this.$store.dispatch('addOrUpdateSortCart',{skuId:this.$route.params.goodId,skuNum:this.skuNum,isChecked:1})
        //进行路由跳转
        this.$router.push({name:'addCartSuccess',query:{skuNum:this.skuNum}})
        //会话存储复杂数据，不放在路由上
        sessionStorage.setItem('skuInfo',JSON.stringify(this.skuInfo))
      }catch(error){
        alert(error.message)
      }
    }
  }
}
</script>

<style scoped>
.detail .con {
  width: 1200px;
  margin: 15px auto;
}
.conPoin {
  padding: 9px 15px 9px 0;
}
.conPoin>span::before{
  content: "/\00a0";
  padding: 0 5px;
  color: #ccc;
}
.mainCon {
  overflow: hidden;
  margin: 5px 0 15px;
}
.previewWrap {
  float: left;
  width: 400px;
  position: relative;
}
.InfoWrap {
  width: 700px;
  float: right;
}
.InfoName {
  font-size: 14px;
  line-height: 21px;
  margin-top: 15px;
}
.news {
  color: #1abc1a;
  margin-top: 15px;
}
.priceArea {
  background: #e6f9e6;
  padding: 7px;
  margin: 13px 0;
}
.priceArea1 {
  overflow: hidden;
  line-height: 28px;
  margin-top: 10px;
}
.priceArea1 .title {
  float: left;
  margin-right: 15px;
}
.priceArea1 .price {
  float: left;
  color: #1abc1a;
}
.priceArea1 .price i{
  float: left;
  color: #1abc1a;
}
.priceArea1 .price em {
  font-size: 24px;
  font-weight: 700;
}
.priceArea1 .price span{
  font-size: 12px;
}
.remark {
  float: right;
}
.priceArea2 {
  overflow: hidden;
  line-height: 28px;
  margin-top: 10px;
}
.priceArea2 .title {
  margin-right: 15px;
  float: left;
}
.priceArea2 .fixWidth {
  width: 520px;
  float: left;
}
.red-bg {
  background: #1abc1a;
  color: #fff;
  padding: 3px;
}
.t-gray {
  color: #999;
}
.support {
  border-bottom: 1px solid #ededed;
  padding-bottom: 5px;
}
.supportArea {
  overflow: hidden;
  line-height: 28px;
  margin-top: 10px;
}
.supportArea .title {
  margin-right: 15px;
  float: left;
}
.supportArea .fixWidth {
  width: 520px;
  float: left;
  color: #999;
}
.choose .chooseArea {
  overflow: hidden;
  line-height: 28px;
  margin-top: 10px;
}
.choose .chooseArea dl{
  overflow: hidden;
  margin: 13px 0;
}
.choose .chooseArea dl dt{
  margin-right: 15px;
  float: left;
}
.choose .chooseArea dl dd{
  float: left;
  margin-right: 5px;
  color: #666;
  line-height: 24px;
  padding: 2px 14px;
  border-top: 1px solid #eee;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-left: 1px solid #eee;
}
.chooseArea .active{
  color: #1abc1a;
  border: 1px solid #1abc1a;
}
.cartWrap .controls {
  width: 48px;
  position: relative;
  float: left;
  margin-right: 15px;
}
.cartWrap .controls  .itxt {
  width: 38px;
  height: 37px;
  border: 1px solid #ddd;
  color: #555;
  float: left;
  border-right: 0;
  text-align: center;
}
.cartWrap .controls .plus,.cartWrap .controls .mins {
  width: 15px;
  text-align: center;
  height: 17px;
  line-height: 17px;
  background: #f1f1f1;
  color: #666;
  position: absolute;
  right: -8px;
  border: 1px solid #ccc;
}
.cartWrap .controls .mins{
  right: -8px;
  top: 19px;
  border-top: 0;
}
.cartWrap .controls .plus{
  right: -8px;
}
.add {
  float: left;
}
.add a{
  background-color: #1abc1a;
  padding: 0 25px;
  font-size: 16px;
  color: #fff;
  height: 36px;
  line-height: 36px;
  display: block;
}
.product-detail {
  overflow: hidden;
}
.tabWraped {
  height: 40px;
}
.tabWraped h4{
  border-top: 3px solid #fff;
  float: left;
  line-height: 37px;
  width: 105px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.tabWraped h4 .active{
  border-top: 3px solid #1abc1a;
  border-bottom: 0;
  font-weight: normal;
}
.tabContent {
  padding: 10px;
}
.tab-pane .active{
  display: block;
}
.tab-pane :nth-child(1) .partList {
  overflow: hidden;
}
.tab-pane :nth-child(1) .partList li{
  width: 50%;
  float: left;
  border-bottom: 1px dashed #ededed;
  line-height: 28px;  
}
.goodsList >li{
  margin: 5px 0 15px;
  border-bottom: 1px solid #ededed;
  padding-bottom: 5px;
}
.list-wrap .p-img {
  text-align: center;
}
.list-wrap .p-img img{
  width: 152px;
}
.list-wrap .price{
  font-size: 16px;
  color: #1abc1a;
}
.list-wrap .operate {
  text-align: center;
  margin: 5px 0;
}
.list-wrap .operate a{
  background-color: transparent;
  border: 1px solid #1abc1a;
  color: #1abc1a;
  display: inline-block;
  padding: 2px 14px;
  line-height: 18px;
}
.detail {
  width: 980px;
  float: right;
}
.addshopcar {
  background-color: #1abc1a;
  border: 1px solid #1abc1a;
  padding: 10px 25px;
  font-size: 16px;
  color: #fff;
  display: inline-block;
  box-sizing: border-box;
}
.intro .tab-wraped {
  background: #ededed;
  /* border: 1px solid #ddd; */
  overflow: hidden;
}
.intro .tab-wraped li{
  float: left;
}
.intro .tab-wraped li > a {
  border-left: 1px solid #ddd;
}
.intro .tab-wraped li .active a{
  background: #1abc1a;
  color: #fff;
}
.intro .tab-wraped li a{
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 11px;
  text-align: center;
  color: #666;
  background: #fcfcfc;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd; 
}
.tabContent {
  padding: 10px;
}

.tabContent .tab-pane {
  display: none;
}

.tabContent .tab-pane.active {
  display: block;
}

.tabContent .tab-pane:nth-child(1) .partList {
  overflow: hidden;
}

.tabContent .tab-pane:nth-child(1) .partList li {
  width: 50%;
  float: left;
  border-bottom: 1px dashed #ededed;
  line-height: 28px;
}

.tabContent .tab-pane:nth-child(1) .goodsList > li {
  margin: 5px 0 15px;
  border-bottom: 1px solid #ededed;
  padding-bottom: 5px;
}

.tabContent .tab-pane:nth-child(1) .goodsList > li .list-wrap .p-img {
  text-align: center;
}

.tabContent .tab-pane:nth-child(1) .goodsList > li .list-wrap .p-img img {
  width: 152px;
}

.tabContent .tab-pane:nth-child(1) .goodsList > li .list-wrap .price {
  font-size: 16px;
  color: #c81623;
}

.tabContent .tab-pane:nth-child(1) .goodsList > li .list-wrap .operate {
  text-align: center;
  margin: 5px 0;
}
/* goods-intro 清新绿主题样式 */
.goods-intro {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  background: #f6fff7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(26,188,26,0.05);
}
.goods-intro li {
  padding: 8px 20px;
  color: #2e7d32;
  border-bottom: 1px solid #e0f2e9;
  font-size: 15px;
}
.goods-intro li:last-child {
  border-bottom: none;
}

/* tab-wraped 清新绿主题样式 */
.tab-wraped {
  background: #e6f9e6;
  border-radius: 6px 6px 0 0;
  border-bottom: 2px solid #1abc1a;
  overflow: hidden;
  margin-bottom: 0;
}
.tab-wraped li {
  float: left;
}
.tab-wraped li a {
  display: block;
  padding: 0 18px;
  height: 40px;
  line-height: 40px;
  color: #1abc1a;
  background: #e6f9e6;
  font-weight: 500;
  border: none;
  transition: background 0.2s, color 0.2s;
}
.tab-wraped li.active a,
.tab-wraped li a:hover {
  background: #1abc1a;
  color: #fff;
  border-radius: 6px 6px 0 0;
}
.tabContent .tab-pane:nth-child(1) .goodsList > li .list-wrap .operate a {
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
  display: inline-block;
  padding: 2px 14px;
  line-height: 18px;
}

.intro-detail{
  margin-left: 100px;
}
</style>