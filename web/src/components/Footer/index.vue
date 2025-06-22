<template>
  <div class="footer">
    <div class="container">
        <div class="footList">
            <div class="item">
                <ul class="ItemCon">
                    <h4>购物指南</h4>
                    <li>购物流程</li>
                    <li>会员介绍</li>
                    <li>生活旅行/团购</li>
                    <li>常见问题</li>
                    <li>购物指南</li>
                </ul>
            </div>
            <div class="item">
                <ul class="ItemCon">
                    <h4>配送方式</h4>
                    <li>上门自提</li>
                    <li>211限时达</li>
                    <li>配送服务查询</li>
                    <li>配送费收取标准</li>
                    <li>海外配送</li>
                </ul>
            </div>
            <div class="item">
                <ul class="ItemCon">
                    <h4>支付方式</h4>
                    <li>货到付款</li>
                    <li>在线支付</li>
                    <li>分期付款</li>
                    <li>邮局汇款</li>
                    <li>公司转账</li>
                </ul>
            </div>
            <div class="item">
                <ul class="ItemCon">
                    <h4>售后服务</h4>
                    <li>售后政策</li>
                    <li>价格保护</li>
                    <li>退款说明</li>
                    <li>返修/退换货</li>
                    <li>取消订单</li>
                </ul>
            </div>
            <div class="item">
                <ul class="ItemCon">
                    <h4>特色服务</h4>
                    <li>夺宝岛</li>
                    <li>DIY装机</li>
                    <li>延保服务</li>
                    <li>尚品汇E卡</li>
                    <li>尚品汇通信</li>
                </ul>
            </div>
            <div class="item">
                <h4>帮助中心</h4>
                <img src="./images/wx_cz.jpg">
            </div>
        </div>
        <div class="copyright">
            <ul class="helpLink">
                <li>
                    关于我们
                    <span class="space"></span>
                </li>
                <li>
                    联系我们
                    <span class="space"></span>
                </li>
                <li>
                    关于我们
                    <span class="space"></span>
                </li>
                <li>
                    商家入驻
                    <span class="space"></span>
                </li>
                <li>
                    营销中心
                    <span class="space"></span>
                </li>
                <li>
                    友情链接
                    <span class="space"></span>
                </li>
                <li>
                    关于我们
                    <span class="space"></span>
                </li>
                <li>
                    营销中心<span class="space"></span>
                </li>
                <li>
                    友情链接
                    <span class="space"></span>
                </li>
                <li>
                    关于我们
                </li>
            </ul>
            <p>地址：北京市昌平区宏福科技园综合楼6层</p>
            <p>京ICP备19006430号</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .footer {
        background: #e8f5e9;
        color: #2e7d32;
        padding: 40px 0 0 0;
        font-family: 'Helvetica Neue', Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .footList {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #a5d6a7;
        padding-bottom: 30px;
    }

    .item {
        flex: 1;
        margin: 0 10px;
        min-width: 140px;
    }

    .ItemCon {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .ItemCon h4 {
        font-size: 18px;
        color: #388e3c;
        margin-bottom: 12px;
        font-weight: bold;
    }

    .ItemCon li {
        font-size: 14px;
        color: #388e3c;
        margin-bottom: 8px;
        cursor: pointer;
        transition: color 0.2s;
    }

    .ItemCon li:hover {
        color: #1b5e20;
        text-decoration: underline;
    }

    .item img {
        width: 90px;
        height: 90px;
        margin-top: 10px;
        border-radius: 8px;
        border: 1px solid #a5d6a7;
    }

    .copyright {
        text-align: center;
        padding: 24px 0 10px 0;
        color: #388e3c;
        font-size: 14px;
    }

    .helpLink {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        list-style: none;
        padding: 0;
        margin: 0 0 10px 0;
    }

    .helpLink li {
        margin: 0 8px;
        color: #388e3c;
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    .helpLink li:hover {
        color: #1b5e20;
        cursor: pointer;
    }

    .space {
        display: inline-block;
        width: 1px;
        height: 14px;
        background: #a5d6a7;
        margin: 0 8px;
    }

    .copyright p {
        margin: 4px 0;
        color: #2e7d32;
        font-size: 13px;
    }
</style>