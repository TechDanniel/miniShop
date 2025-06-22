const mysql=require('mysql2/promise')

const config={
    host:'127.0.0.1',
    user:'root',
    password:'2004',
    database:'merchandiseinfo',
    charset: 'utf8mb4', // 关键：设置连接字符集为 utf8mb4
    // 显式指定排序规则（与表一致更保险）
  collation: 'utf8mb4_unicode_ci' 
}

module.exports= mysql.createPool(config)