const jwt = require('jsonwebtoken');
const pool = require('../db/dbconfig')
// 定义 JWT 密钥
const JWT_SECRET = 'minishop';  

//调用dbconfig执行查询,查询列表数据
// 调用 dbconfig 执行查询，实现登录验证
const login = async (req, res) => {
    try {
        const {phone, password,isRemember,rememberDays } = req.body;
        // 使用参数化查询避免 SQL 注入
        let sql = 'SELECT * FROM userinfo WHERE phone = ? AND password = ?';
        let sqlArr = [phone, password];

        // 执行数据库查询
        const [data] = await pool.execute(sql, sqlArr);
        let tokenExpires='1d'
        if(isRemember) tokenExpires = rememberDays+'d'; // 如果需要记住登录状态，设置 token 有效期
        if (data.length > 0) {
            const exp=Date.now() + 60 * 60 * 1000; //加上accessToken过期时间以便前端使用
            // 登录成功，生成 token 并返回
            const AccessToken = jwt.sign({ userId: data[0].userId}, JWT_SECRET,{ expiresIn: '1h' }); // 令牌有效期为 1 小时
            const RefreshToken = jwt.sign({userId: data[0].userId}, JWT_SECRET, { expiresIn: `${tokenExpires}` }); // 刷新令牌有效期为 7 天
            
            res.send({
                code:200,
                msg:'登录成功',
                data:{
                    AccessToken,
                    RefreshToken
                }
            } );
        } else {
            // 用户名或密码错误
            res.status(401).send({ code: 401, msg: `用户名或密码错误 ${sqlArr}` });
        }
    } catch (err) {
        console.log('---登录失败----', err);
        res.status(500).send({ code: 500, msg: `服务器内部错误: ${err.message}` });
    }
};

module.exports ={
    login
}