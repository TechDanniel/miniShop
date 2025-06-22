const express=require('express');
const router=express.Router();
const CartList=require('../Controllers/cartList')

router.get('/cartList',CartList.getCartList);

// 将这个路由器对象导出，这样其他模块就可以通过 require 语句来导入并使用这个路由器对象了
module.exports=router;