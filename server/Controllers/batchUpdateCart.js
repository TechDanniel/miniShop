const pool=require('../db/dbconfig')
//调用dbconfig执行查询,查询列表数据
const BatchUpdateCart=async(req,res)=>{
    try{
        const {orderIds, newStatus}=req.body
        const placeholders = orderIds.map(() => '?').join(',');
        const query = `UPDATE shopcart SET isChecked = ? WHERE skuid IN (${placeholders})`;
        const values = [newStatus, ...orderIds];

        const [rows] = await pool.execute(query, values);
        console.log(`成功更新 ${rows.affectedRows} 条订单记录`);
    }catch (err) {
        console.log('---查询失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }  
}

module.exports={
    BatchUpdateCart
}