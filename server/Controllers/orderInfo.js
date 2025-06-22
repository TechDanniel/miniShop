const pool = require('../db/dbconfig')

//调用dbconfig执行查询,查询列表数据
const getOrderInfo=async(req,res)=>{
    try{
        const {data}=req.body;
        const user_id = req.user; // 从请求中获取用户ID
        const {receiver_name, receiver_phone, receiver_address, totalAmount, payment_way, order_comment,orderDetailList} = data;
        const {list,orderNo}=orderDetailList
        console.log('订单信息:', list);
        // 插入订单信息到订单表
        const now = new Date();
        const insertOrderQuery = 'INSERT INTO order_main (order_id, user_id, receiver_name, receiver_phone,receiver_address,totalAmount,payment_way,order_status,order_comment,create_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const orderValues=[
            orderNo,user_id,receiver_name, receiver_phone, receiver_address, totalAmount, payment_way, '待支付', order_comment,now
        ]
        await pool.execute(insertOrderQuery,orderValues)
        // 插入订单详情到订单详情表
        const insertOrderDetailQuery = 'INSERT INTO order_detail (order_id, product_id, product_name, product_price, quantity,total_price,create_time) VALUES ?';
        const orderDetailValues = list.map(item => [
            orderNo, item.skuid, item.skuName, item.skuPrice, item.skuNum, item.skuPrice * item.skuNum,now
        ]);
        // 使用批量插入
        await pool.query(insertOrderDetailQuery, [orderDetailValues]);
         //删除购物车中的数据并发送待支付消息
        const deleteCartQuery = `DELETE FROM shopcart WHERE user_id = ? AND skuid IN (?)`;
        const skuidList =list.map(item => item.skuId);
        await pool.execute(deleteCartQuery, [user_id, skuidList]);
        res.status(200).json({ code: 200, msg: '订单提交成功', data:{orderNo,totalAmount} });
    }catch (err) {
        console.log('---查询失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
}

module.exports={
    getOrderInfo
}