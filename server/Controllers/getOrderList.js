const pool=require('../db/dbconfig')

const getOrderList=async(req,res)=>{
    try{
        const {page,limit}=req.params
        const pageNum=parseInt(page)
        const limitNum=parseInt(limit)
        const offset=(pageNum-1)*limitNum
        
        //查询当前页数据
        const [myOrderList]=await pool.query(
            'SELECT * FROM order_main ORDER BY create_time DESC LIMIT ? OFFSET ?',
            [limitNum, offset]
        )
        //提取主表的orderId
        const orderIds=myOrderList.map(item=>item.order_id)
        console.log(orderIds)
        if(orderIds.length==0){
            return myOrderList
        }
        const detailSql = `SELECT * FROM order_detail WHERE order_id IN (${orderIds.map(() => '?').join(',')})`;
        const [detailResult]=await pool.query(detailSql,orderIds)
        console.log("订单详细",detailResult)
        const newOrderList=myOrderList.map(item=>{
            const detailList=detailResult.filter(detailItem=>detailItem.order_id===item.order_id)
            return{
                ...item,
                orderDetailList:detailList
            }
        })
        res.status(200).send(newOrderList)
    }catch(err){
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
}

module.exports={
    getOrderList
}