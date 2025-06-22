const pool = require('../db/dbconfig')

//调用dbconfig执行查询,查询列表数据
const getList=async(req,res)=>{
    const searchParams = req.body;
    const { category1Id, category2Id, category3Id, keyword, order, pageNo, pageSize, props, trademark } = searchParams;

    try{
        // 构建查询条件
        let whereClause = '';
        const conditions = [];
        if (category1Id) {
            conditions.push(`category1Id = ${category1Id}`);
        }
        if (category2Id) {
            conditions.push(`category2Id = ${category2Id}`);
        }
        if (category3Id) {
            conditions.push(`category3Id = ${category3Id}`);
        }
        if (keyword) {
            conditions.push(`title LIKE '%${keyword}%'`);
        }
        if (conditions.length > 0) {
            whereClause = `WHERE ${conditions.join(' AND ')}`;
        }

        // 计算分页偏移量
        const offset = (pageNo - 1) * parseInt(pageSize);
        //dbconfig.pool.execute 执行一个 SQL 查询后会返回一个包含两个元素的数组：第一个元素通常是查询的结果集，也就是符合查询条件的行数据。第二个元素一般是查询的元数据，例如受影响的行数、字段信息等。
        // 查询商品列表
        const [goodsList]=await pool.execute(`
            SELECT * FROM goods
            ${whereClause}
            LIMIT ${parseInt(pageSize)} OFFSET ${offset}
        `);
        const collection=goodsList.map((good)=>{
            return good.id
        })

        // 查询属性信息
        const [attrsList] =await pool.execute('SELECT * FROM attrs');

        // 将数组转换为适合 SQL IN 子句的格式
        const inClauseValues = collection.length>0?collection.join(','):'1,2,3';

        // 查询品牌信息
        // pool.execute 方法会自动从连接池中获取连接，执行查询，然后将连接释放回池中
        const [trademarkList] =await pool.execute(`SELECT * FROM trademarks  WHERE tmId IN (${inClauseValues})`);

        const responseData = {
            total:goodsList.length,
            goodsList,
            props:["1:**"],
            attrsList,
            trademarkList
        };
        res.send(responseData);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={
    getList
}