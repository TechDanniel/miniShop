const pool=require('../db/dbconfig')
//调用dbconfig执行查询,查询列表数据
const postCart=async(req,res)=>{
    try{
        const {skuId,skuNum,isChecked}=req.body
        const user_id = req.user; // 从请求中获取用户ID
        // 先查询购物车中是否已存在该 skuId
        const checkSql = `SELECT skuNum FROM shopcart WHERE skuid =? AND user_id = ?`;
        const [checkResult] = await pool.execute(checkSql, [skuId,user_id]);
        if (checkResult.length > 0) {
            // skuId 存在，更新 skuNum
            const updateSql = `UPDATE shopcart SET skuNum = skuNum +?,ischecked =? WHERE skuId =?`;
            await pool.execute(updateSql, [skuNum, isChecked,skuId]);
        } else {
            const [data]=await pool.execute(`select price,title from goods where id=${skuId}`)
            const {price,title}=data[0]

            // skuId 不存在，插入新记录s
            const insertSql = `INSERT INTO shopcart (skuId,user_id,skuNum,skuPrice,isChecked,skuName,imgUrl) VALUES (?,?,?,?,?,?,"./images/s1.png")`;
            await pool.execute(insertSql, [skuId, user_id,skuNum,price,isChecked,title]);
        }
        res.send({ code: 200, msg: '加入购物车成功' });
    }catch (err) {
        console.log('---查询失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }  
}

module.exports={
    postCart
}