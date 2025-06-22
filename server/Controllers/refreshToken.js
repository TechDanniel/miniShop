const jwt = require('jsonwebtoken');
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ code: 400, msg: '缺少刷新令牌' });
        }

        // 验证刷新令牌
        const decoded = jwt.verify(refreshToken, 'minishop');
        const userId = decoded.userId;

        // 生成新的访问令牌
        const payload={ userId}; // 设置新的过期时间为1小时
        const newAccessToken = jwt.sign(payload, 'minishop',{ expiresIn: '1h' });

        res.send({
            code: 200,
            msg: '刷新令牌成功',
            data: {
                AccessToken: newAccessToken
            }
        });
    } catch (err) {
        console.error('刷新令牌失败:', err);
        res.status(401).json({ code: 401, msg: '无效的刷新令牌' });
    }
}

module.exports={
    refreshToken
}