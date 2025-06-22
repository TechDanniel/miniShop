const express=require('express');
const router=express.Router();
const refreshToken=require('../Controllers/refreshToken')

router.post('/user/refreshToken',refreshToken.refreshToken);
module.exports=router;