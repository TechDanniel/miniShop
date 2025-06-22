const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  devServer:{
    proxy: {
      // 这里 '/api' 是路径前缀，所有以 /api 开头的请求都会被代理
      '/api': {
        // 目标服务器地址，请求会被转发到这个地址
        target: 'http://localhost:3000',
        // 修改请求头中的 Origin 字段，使其与目标服务器的域名一致，避免跨域问题
        changeOrigin: true,
        // 路径重写，将请求路径中的 /api 前缀去除，确保请求能正确到达目标服务器
        pathRewrite: {
          '^/api': ''
        },
        ws: true, // 表示这是一个 WebSocket 代理
      },
    }
  }
})