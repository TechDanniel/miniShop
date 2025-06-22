const pool=require('../db/dbconfig')

const getOrderStatus=async(req,res)=>{
    //根据订单号查询订单状态
    const {orderNo}=req.body
    try{
        const sql='select order_status from order_main where order_id=?'
        const row=await pool.execute(sql,[orderNo])
        if(row){
            //这里模拟直接设置支付状态为已支付，then直接返回成功
            const sql='update order_main set order_status="已支付" where order_id=?'
            await pool.execute(sql,[orderNo])
            res.status(200).json({ msg: '支付成功', data: { orderNo, status: '已支付' } });
        }
    }catch (err) {
        console.log('---支付失败----', err); 
    }
}

module.exports={
    getOrderStatus
}