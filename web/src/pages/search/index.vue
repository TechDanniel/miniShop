<template>
  <div>
    <!-- 商品三级分类列表 -->
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          
          <ul class="fl sui-tag">
            <!-- 分类的面包屑-->
            <li class="with-x" v-if="$route.query.categoryName">
              {{ $route.query.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!--平台的售卖的属性值展示-->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!-- selector -->
        <searchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的解构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a
                    >综合<span v-show="isOne" class="iconfont" :class="{'icon-paixu-shengxu':isAsc,'icon-paixu-jiangxu':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a
                    >价格<span v-show="isTwo" class="iconfont" :class="{'icon-paixu-shengxu':isAsc,'icon-paixu-jiangxu':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候切记别忘记带id（params）参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img src="./images/goods1.png"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchSelector from './searchSelector'
import { mapGetters, mapState } from 'vuex';
export default {
  name:'',
  components:{
    searchSelector,
  },
  data(){
    return{
      searchParams:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
        keyword:'',
        order:'1:desc',
        pageNo:1,//当前页数
        pageSize:'3',//每页展示数据的个数
        props:[],//平台售卖属性
        trademark:''//品牌
      }
    }
  },
    beforeMount(){
      Object.assign(this.searchParams,this.$route.params,this.$route.query)
    },
    methods:{
        getData(){
          this.$store.dispatch('getSearchList',this.searchParams)
        },
        //删除分类面包屑
        removeCategoryName(){
          //undefined的参数不会带给服务器，优化性能
          this.$route.query.categoryName=undefined
          this.category1Id=undefined
          this.category2Id=undefined
          this.category3Id=undefined
          this.getData()                                
          this.$router.push({name:'search',params:this.$route.params})
        },
        //删除关键字面包屑
        removeKeyword(){
          this.searchParams.keyword=undefined
          this.getData()
          //清空搜索框里的内容
          this.$bus.$emit('rKeyword')
        },
      //删除品牌信息面包屑
      removeTradeMark(){
        this.searchParams.trademark=undefined
        this.getData()
      },
      //品牌自定义事件回调
      trademarkInfo(trademark){
        this.searchParams.trademark=trademark
        this.getData()
      },
      //绑定属性的自定义回调
      attrInfo(attr,attrValue){
        //数组去重
        let prop=`${attr.attrId}:${attrValue}:${attr.attrName}`
        if(this.searchParams.props.indexOf(prop)===-1){
          this.searchParams.props.push(prop)
        }
      },
      //删除属性面包屑
      removeAttr(index){
        this.searchParams.props.splice(index,1)
        this.getData()
      },
      //改变排序的值,index是标识综合还是价格
      changeOrder(index){
        let OriginIndex=this.searchParams.order.split(":")[0]
        let OriginSort=this.searchParams.order.split(":")[1]
        let newOrder=''
        if(OriginIndex===index){
          if(OriginSort==='desc') newOrder=`${index}:asc`
          else newOrder=`${index}:desc`
          this.searchParams.order=newOrder
        }else{
          newOrder=`${index}:desc`
          this.searchParams.order=newOrder
        }
        this.getData()
      },
      //整理带给服务器的参数，显示第index页
      getPageNo(index){
        this.searchParams.pageNo=index
        this.getData()
      }
    },
    mounted(){
      this.getData()
    },
    watch:{
      //监听search页面中参数变化，重新发请求
      $route(newValue,oldValue){
        Object.assign(this.searchParams,this.$route.params,this.$route.query)
        this.getData()
        this.searchParams.category1Id=''
        this.searchParams.category2Id=''
        this.searchParams.category3Id=''
      }
    },
    computed:{
        ...mapGetters(['goodsList']),
        isOne(){
          return this.searchParams.order.indexOf("1")!==-1
        },
        isTwo(){
          return this.searchParams.order.indexOf("2")!==-1
        },
        isAsc(){
          return this.searchParams.order.indexOf('asc')!==-1
        },
        isDesc(){
          return this.searchParams.order.indexOf('desc')!==-1
        },
        //searchList的总数total
        ...mapState({
         total: (state)=>{
          return state.search.searchList.total
        }
      })
    }
}
</script>

<style scoped>
.main {
  margin: 10px 0;
}
.py-container {
  width: 1200px;
  margin: 0 auto;
}
.bread {
  margin-bottom: 5px;
  overflow: hidden;
}
.sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.sui-breadcrumb li{
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.sui-breadcrumb li a{
  color: #666;
  text-decoration: none;
}
.sui-breadcrumb li a:hover{
  color: #21b97a; /* 绿色主题 */
}
.sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}
.with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}
.with-x i{
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.with-x :hover{
  color: #21b97a; /* 绿色主题 */
}
.details {
  margin-bottom: 5px;
}
.sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}
.filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}
.sui-nav li{
  float: left;
  line-height: 18px;
}
.sui-nav li a{
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}
.sui-nav .active a{
  background: #21b97a; /* 绿色主题 */
  color: #fff;
}
.goods-list {
  margin: 20px 0;
}
.goods-list ul{
  display: flex;
  flex-wrap: wrap;
}
.goods-list ul li{
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}
.list-wrap .p-img{
  padding-left: 15px;
  width: 215px;
  height: 255px;
}
.list-wrap .p-img img{
  width: 215px;
  height: 255px;
}
.list-wrap .p-img a{
  color: #666;
}
.list-wrap .p-img a img{
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
.price {
  padding-left: 15px;
  font-size: 18px;
  color: #21b97a; /* 绿色主题 */
}
.price strong{
  font-weight: 700;
}
.price strong em{
  margin-left: -5px;
}
.attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* -webkit-line-clamp: 2; */
}
.attr a{
  color: #333;
  text-decoration: none;
}
.commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.commit span{
  font-weight: 700;
  color: #21b97a; /* 绿色主题 */
}
.operate {
  padding: 12px 15px;
}
.sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}
.btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #21b97a; /* 绿色主题 */
  color: #21b97a; /* 绿色主题 */
}
.btn-bordered:hover{
  border: 1px solid #21b97a;
  color: #fff !important;
  background-color: #21b97a;
  text-decoration: none;
}
.btn-danger {
  border: 1px solid #21b97a; /* 绿色主题 */
  color: #21b97a; /* 绿色主题 */
}
.btn-danger:hover{
  border: 1px solid #21b97a;
  background-color: #21b97a;
  color: white !important;
  text-decoration: none;
}
.page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;
}
.sui-pagination {
  margin: 18px 0;
}
.sui-pagination ul{
  margin-left: 0;
  margin-bottom: 0;
  vertical-align: middle;
  width: 490px;
  float: left;
}
.sui-pagination ul li{
  line-height: 18px;
  display: inline-block;
}
.sui-pagination ul li a{
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #21b97a; /* 绿色主题 */
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}
.sui-pagination .active a{
  background-color: #21b97a; /* 绿色主题 */
  color: #fff;
  border-color: #21b97a;
  cursor: default;
}
.sui-pagination .prev a{
  background-color: #e6f9f0; /* 绿色淡色 */
}
.sui-pagination .disabled a{
  color: #999;
  cursor: default;
}
.dotted span{
  margin-left: -1px;
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  font-size: 14px;
  border: 0;
  padding: 9px 18px;
  color: #333;
}
.next a{
  background-color: #e6f9f0; /* 绿色淡色 */
}
.sui-pagination div{
  color: #333;
  font-size: 14px;
  float: right;
  width: 241px;
}
</style>
