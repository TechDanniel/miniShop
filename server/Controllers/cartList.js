const pool = require('../db/dbconfig')

//调用dbconfig执行查询,查询列表数据
const getCartList=async(req,res)=>{
    try{
        const sql=`select * from shopcart`
        const [data]=await pool.execute(sql)
        console.log('前端访问')
        res.send(data)
    }catch (err) {
        console.log('---查询失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
}

module.exports={
    getCartList
}