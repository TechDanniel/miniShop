<template>
  <div class="list-container"> 
    <div class="sortList clearfix">
        <div class="center">
            <!--banner轮播-->
            <Carousel :lists="bannerList"/>
        </div>
        <div class="right">
            <div class="news">
                <h4>
                    <em class="fl">尚品汇快报</em>
                    <span class="fr tip">更多 ></span>
                </h4>
                <div class="cleafix"></div>
                <ul class="news-list unstyled">
                    <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
                    <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
                    <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
                    <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
                    <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
                </ul>
            </div> 
        <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:'ListContainer',
    mounted(){
        this.$store.dispatch('BannerList')
    },
    computed:{
        ...mapState({bannerList:(state)=>state.home.bannerList})
    }
}
</script>

<style scoped>
    .list-container {
        width: 1200px;
        margin: 0 auto;
    }
    .sortList{
        height: 520px;
        padding-left: 210px;
    }
    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }
    .list-container .right{
        float: left;
        width: 250px;
        margin-top: 25px;
    }
    .list-container .right .news{
        border: 1px solid #e4e4e4;
        margin-top: 5px;
    }
    .list-container .right .news h4{
        border-bottom: 1px solid #e4e4e4;
        padding: 5px 10px;
        margin: 5px 5px 0;
        line-height: 22px;
        overflow: hidden;
        font-size: 14px;
    }
    .list-container .right .news h4 .fl{
        float: left;
    }
    .list-container .right .news h4 .fr{
        float: right;
        font-size: 12px;
        font-weight: 400;
    }

    .news .news-list{
        padding: 5px 15px;
        line-height: 26px;
    }
    .news .news-list .bold{
        font-weight: 700;
    }
    .right .lifeservices{
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
    }
    .right .lifeservices .life-item{
        border-left: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        margin-right: -1px;
        height: 64px;
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 25%;
    }
    .right .lifeservices .life-item .list-item{
        background-image: url(~@/assets/images/icons.png);
        width: 61px;
        height: 40px;
        display: block;
    }
    .right .lifeservices .life-item .service-intro{
        line-height: 22px;
        width: 60px;
        display: block;
    }
    .lifeservices:nth-child(1) .list-item{
        background-position: 0px -5px;
    }
    .lifeservices:nth-child(2) .list-item{
        background-position: -62px -5px;
    }
    .lifeservices:nth-child(3) .list-item{
        background-position: -126px -5px;
    }
    .lifeservices:nth-child(4) .list-item{
        background-position: -190px -5px;
    }
    .lifeservices:nth-child(5) .list-item{
        background-position: 0px -76px;
    }
    .lifeservices:nth-child(6) .list-item{
        background-position: -62px -76px;
    }
    .lifeservices:nth-child(7) .list-item{
        background-position: -126px -76px;
    }
    .lifeservices:nth-child(8) .list-item{
        background-position: -190px -76px;
    }
    .lifeservices:nth-child(9) .list-item{
        background-position: 0px -146px;
    }
    .lifeservices:nth-child(10) .list-item{
        background-position: -62px -146px;
    }
    .lifeservices:nth-child(11) .list-item{
        background-position: -126px -146px;
    }
    .lifeservices:nth-child(12) .list-item{
        background-position: -190px -146px;
    }
    .right .ads{
        margin-top: 5px;
    }
    .right .ads img{
        opacity: 0.8;
        transition: all 400ms;
    }
    .right .ads img:hover{
        opacity: 1;
    }
</style>