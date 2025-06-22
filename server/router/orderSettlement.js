const express=require('express');
const router=express.Router();
const settle=require('../Controllers/orderSettlement')
const auth=require('../router/authMiddle')

router.post('/settle',auth,settle.getOrderSettlement);
// 将这个路由器对象导出，这样其他模块就可以通过 require 语句来导入并使用这个路由器对象了
module.exports=router;