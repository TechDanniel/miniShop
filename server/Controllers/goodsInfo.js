const pool=require('../db/dbconfig')

const getGoodsInfo=async(req,res)=>{
    //req.body是获取params参数，这里是query参数
    const searchParams = req.query
    const goodId=searchParams.goodId
    try{
        const sql=`select price,category1Id,category2Id,category3Id from goods where id=?`
        let sqlArr =[goodId]
        // 执行数据库查询
        // 执行数据库查询
        const [data] = await pool.execute(sql, sqlArr);

        if (data.length === 0) {
            return res.status(404).send({ code: 404, msg: '未找到对应的商品信息' });
        }
        const [row] = data;
        const { category1Id, category2Id, category3Id, price } = row;

        const sql1 = `select categoryName from category_level1 where categoryId=?`;
        const [category1Result] = await pool.execute(sql1, [category1Id]);
        const [category1Row] = category1Result;
        const category1Name = category1Row ? category1Row.categoryName : null;

        const sql2 = `select categoryName from category_level2 where categoryId=?`;
        const [category2Result] = await pool.execute(sql2, [category2Id]);
        const [category2Row] = category2Result;
        const category2Name = category2Row ? category2Row.categoryName : null;

        const sql3 = `select categoryName from category_level3 where categoryId=?`;
        const [category3Result] = await pool.execute(sql3, [category3Id]);
        const [category3Row] = category3Result;
        const category3Name = category3Row ? category3Row.categoryName : null;

        const goodsInfo = {
            "categoryView": {
                category1Name,
                category2Name,
                category3Name
            },
            "skuInfo":{
                "id":1,
                "skuName":"2025新款",
                "skuDesc":"降序",
                "price":price,
                "skuImageList":[
                {"id":"1","imgUrl":"./images/itemlike01.png"},
                {"id":"2","imgUrl":"./images/part02.png"},
                {"id":"3","imgUrl":"./images/s1.png"},
                {"id":"4","imgUrl":"./images/s2.png"},
                {"id":"5","imgUrl":"./images/s3.png"}
                ]
            },
            "spuSaleAttrList":[
                {
                    "id":"1",
                    "saleAttrName":"选择颜色",
                    "spuSaleAttrValueList":[{"id":"1","isChecked":1,"saleAttrValueName":"金"},{"id":"2","isChecked":0,"saleAttrValueName":"银"},{"id":"3","isChecked":0,"saleAttrValueName":"黑"}]
                },
                {
                    "id":"2",
                    "saleAttrName":"内存",
                    "spuSaleAttrValueList":[{"id":"1","isChecked":1,"saleAttrValueName":"64GB"},{"id":"2","isChecked":0,"saleAttrValueName":"128GB"},{"id":"3","isChecked":0,"saleAttrValueName":"256GB"}]
                },
                {
                    "id":"3",
                    "saleAttrName":"选择版本",
                    "spuSaleAttrValueList":[{"id":"1","isChecked":1,"saleAttrValueName":"公开版"},{"id":"2","isChecked":0,"saleAttrValueName":"移动版"}]
                }
            ]
        }
        res.send(goodsInfo);
    }catch (err) {
        console.log('---查询失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
}


module.exports={
    getGoodsInfo
}