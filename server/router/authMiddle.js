const jwt = require('jsonwebtoken');
const secret = 'minishop';

module.exports = function (req, res, next) {
  // Express 会将所有请求头字段名转为小写
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ code: 401, msg: '未登录，禁止访问' });
  const token = auth.split(' ')[1];
  try {
    const user = jwt.verify(token, secret);
    req.user = user.userId;
    next();
  } catch (err) {
    return res.status(401).json({ code: 401, msg: '登录已过期或无效' });
  }
};