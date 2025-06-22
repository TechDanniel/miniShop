const express=require('express');
const router=express.Router();
const cart=require('../Controllers/addCart')
const auth=require('../router/authMiddle')

router.post('/addTocart',auth,cart.postCart);

// 将这个路由器对象导出，这样其他模块就可以通过 require 语句来导入并使用这个路由器对象了
module.exports=router;