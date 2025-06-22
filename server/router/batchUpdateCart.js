const express=require('express');
const router=express.Router();
const batchUpdateCart=require('../Controllers/batchUpdateCart')

router.post('/batchUpdateCart',batchUpdateCart.BatchUpdateCart);

// 将这个路由器对象导出，这样其他模块就可以通过 require 语句来导入并使用这个路由器对象了
module.exports=router;