const express=require('express')
const http=require('http')
const cors=require('cors')
const bodyParser = require('body-parser');
const WebSocket = require('ws');
//导入路由
const categoryList=require('./router/categoryList')
const Login=require('./router/login')
const List=require('./router/list')
const goodsInfo=require('./router/goodsInfo')
const addCart=require('./router/addCart')
const cartList=require('./router/cartList')
const addressInfo=require('./router/address')
const batchUpdateCart=require('./router/batchUpdateCart');
const settlement=require('./router/orderSettlement')
const orderInfo=require('./router/orderInfo')
const OrderStatus=require('./router/OrderStaus')
const refreshToken=require('./router/RefreshToken')
const getOrderList=require('./router/getOrderList')

//创建服务器
const app=express()
//cors注册为全局中间件,处理跨域
app.use(cors())

// 解析body的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

app.use(categoryList)
app.use(Login)
app.use(List)
app.use(goodsInfo)
app.use(addCart)
app.use(cartList)
app.use(addressInfo)
app.use(batchUpdateCart)
app.use(settlement)
app.use(orderInfo)
app.use(OrderStatus)
app.use(refreshToken)
app.use(getOrderList)

//创建HTTP服务器
const server=http.createServer(app);

// 创建 WebSocket 服务器实例，使用 noServer 选项
const wss = new WebSocket.Server({ noServer: true });

// 处理 WebSocket 连接升级
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`应用正在监听端口 ${port}`);
});

//封装websocket
// 用于处理 JSON Web Token（JWT）的生成和验证。
const jwt=require('jsonwebtoken')

//定义一个JWT密钥，用于签名和验证JWT
const JWT_SECRET='minishop'

const userConnections = new Map();

//连接处理，监听connection事件，当有新的客户端连接到服务器时触发，
//ws时表示该客户端连接的webSocket实例，req是与该连接相关的HTTP请求对象
wss.on('connection',(ws,req)=>{
    console.log('处理客户端ws连接')
    //从URL中提取TOKEN
    // 当第一个参数是相对路径时，这个基础 URL 会用于解析出完整的绝对 URL。如果第一个参数已经是绝对 URL，第二个参数会被忽略。
    const token=new URL(req.url,'http://localhost:3000').searchParams.get('token');
    //验证Token
    //第三个参数处理验证结果，当验证错误时，err将包含错误信息，如果验证成功，decoded将包含解码后的JWT负载信息（负载中包含用户相关的信息，如userid等）
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log('无效token，关闭连接')
            ws.close(4003,'Athentication Failed')
            return;
        }
        console.log('验证通过，绑定用户信息',decoded)
        //绑定用户信息
        ws.userId=decoded.userId;
        console.log(`用户 ${ws.userId} 连接成功`);

        //绑定用户与连接
        if(!userConnections.has(ws.userId)){
            userConnections.set(ws.userId,new Set())
        }
        userConnections.get(ws.userId).add(ws)

        //心跳处理,初始化客户端的心跳状态为true，表示客户端存活
        ws.isAlive=true;
        //监听客户端发送的pong消息，收到时将客户端的心跳状态重置为true
        ws.on('pong',()=>{
            ws.isAlive=true
        })

        //消息处理
        ws.on('message',(data)=>{
            try{
                const message=JSON.parse(data);
                if(message.type=='ping'){
                    ws.send(JSON.stringify({type:'pong'}))
                }else if(message.type=='settle'){
                    //结算
                    console.log('处理结算')
                    if (userConnections.has(ws.userId)) {
                        const connections = userConnections.get(ws.userId);
                        connections.forEach(ws => {
                          if (ws.readyState === WebSocket.OPEN) {
                            const message=JSON.stringify({type:'NOTIFICATION',message:'订单已生成，请在15分钟内完成支付'})
                            ws.send(message)
                          }
                        });
                    }
                }else if(message.type=='PAYSTATUS'){
                    //支付状态
                    console.log(message.message)
                    if (userConnections.has(ws.userId)) {
                        const connections = userConnections.get(ws.userId);
                        connections.forEach(ws => {
                          if (ws.readyState === WebSocket.OPEN) {
                            const message=JSON.stringify({type:'NOTIFICATION',message:`支付状态已更新:${message.message}，请查看订单详情`})
                            ws.send(message)
                          }
                        });
                    }
                }
            }catch(err){
                ws.send('{"type":"error","message":"消息格式错误"}')
            }
        })
    })
})

//全局心跳检测（服务端主动检查）
setInterval(()=>{
    wss.clients.forEach((ws)=>{
        if(ws.isAlive===false){
            console.log('心跳超时，关闭连接')
            return ws.terminate();//强制断开
        }
        ws.isAlive=false;
        // 该方法是 WebSocket 协议的一部分，用于发送一个 ping 帧到客户端。
        // 当客户端收到 ping 帧后，协议层会自动返回一个 pong 帧作为响应。
        // 这个过程在 WebSocket 协议内部处理，不需要你在客户端手动监听或回复 pong。
        ws.ping();
    })
},30000)//30秒检测一次