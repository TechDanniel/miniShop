const pool=require('../db/dbconfig')
//调用dbconfig执行查询,查询列表数据
const getCategory=async(req,res)=>{
    try{
        var sql = `SELECT category_level1.categoryId AS level1_id,
                    category_level1.categoryName AS level1_name,
                    category_level2.categoryId AS level2_id,
                    category_level2.categoryName AS level2_name,
                    category_level3.categoryId AS level3_id,
                    category_level3.categoryName AS level3_name
                FROM 
                    category_level1
                LEFT JOIN 
                    category_level2 ON category_level1.categoryId = category_level2.parentCategoryId
                LEFT JOIN 
                    category_level3 ON category_level2.categoryId = category_level3.parentCategoryId
        `;
        var sqlArr = [];
         // 执行数据库查询
        const [data] = await pool.execute(sql, sqlArr);
       
        // 初始化最终结果数组
        const finalResult = [];
        // 用于快速查找一级分类的对象
        const level1Map = {};

        if (data.length > 0){
            // 遍历查询结果
            data.forEach(row => {
                const { level1_id, level1_name, level2_id, level2_name, level3_id, level3_name } = row;

                // 处理一级分类
                if (!level1Map[level1_id]) {
                    const level1Item = {
                        categoryId: level1_id,
                        categoryName: level1_name,
                        childCategory: []
                    };
                    level1Map[level1_id] = level1Item;
                    finalResult.push(level1Item);
                }

                // 处理二级分类
                if (level2_id) {
                    const level2List = level1Map[level1_id].childCategory;
                    let level2Item = level2List.find(item => item.categoryId === level2_id);
                    if (!level2Item) {
                        level2Item = {
                            categoryId: level2_id,
                            categoryName: level2_name,
                            childCategory: []
                        };
                        level2List.push(level2Item);
                    }

                    // 处理三级分类
                    if (level3_id) {
                        const level3List = level2Item.childCategory;
                        const level3Item = {
                            categoryId: level3_id,
                            categoryName: level3_name
                        };
                        if (!level3List.some(item => item.categoryId === level3_id)) {
                            level3List.push(level3Item);
                        }
                    }
                }
            });
            res.send(finalResult);
        }else{
            res.send({ code: 401, msg: '查询为空' });
        }
    }catch (err) {
        console.log('---查询失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
    
}

module.exports={
    getCategory
}