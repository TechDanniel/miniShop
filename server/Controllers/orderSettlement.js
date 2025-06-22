const pool=require('../db/dbconfig')

const randomOrderNo=() =>{
    // 生成一个包含时间戳和随机数的订单编号
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000000); // 生成一个6位随机数
    return `ORDER_${timestamp}_${randomPart}`;
}

//调用dbconfig执行查询,查询列表数据
const getOrderSettlement=async(req,res)=>{
    const {orderIds}=req.body
   try{
        const placeholders=orderIds.map(()=>'?').join(',')
        //从购物车获取订单相关信息并插入订单信息表
        const selectQuery=`select skuid,imgUrl,skuName,skuPrice,skuNum from shopcart where skuid in (${placeholders}) AND user_id = ?`
        const [rows]=await pool.execute(selectQuery, [...orderIds,req.user]);

        const dataWithNo={
            list:rows,
            orderNo:randomOrderNo()
        }
        console.log('订单信息:', rows);
        res.status(200).json({data:dataWithNo,message:'结算成功'})
    }catch (err) {
    console.log('---查询失败----', err);
    res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
}  

module.exports={
    getOrderSettlement
}
