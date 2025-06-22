const express=require('express');
const router=express.Router();
const category=require('../Controllers/categoyController')

router.get('/categoryList',category.getCategory);

// 将这个路由器对象导出，这样其他模块就可以通过 require 语句来导入并使用这个路由器对象了
module.exports=router;