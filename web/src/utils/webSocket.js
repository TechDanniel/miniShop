export class webSocketClient {
    constructor(token) {
        //存储webSocket实例
        this.ws = null;
        //存储重连定时器
        this.reconnectTimer = null;
        //存储心跳定时器
        this.heartbeatTimer = null;
        //记录重连尝试次数
        this.reconnectAttempts = 0;
        //设置最大重连尝试次数
        this.maxReconnectAttempts = 5;
        //存储用户登录后的JWT TOKEN
        this.token = token;
        this.pingTimeout = null; // 用于存储 ping 超时定时器 ID
    }
    //初始化连接
    connect() {
        //清除旧的连接
        if (this.ws) this.ws.close()
        //创建带Token的新连接
        this.ws = new WebSocket(`/api?token=${this.token}`);
        //连接成功
        this.ws.onopen = () => {
            console.log('websocket连接成功');
            this.reconnectAttempts = 0;//重置重连计数器
            this.startHeartbeat();//开始心跳
        }
        //当接收到服务器发送的消息时
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            //ping是主动发送的消息，用于检测对方是否仍然在线且能够正常响应；pong消息是对ping消息的响应，以表明自己仍然在线且能够正常响应。
            if (message.type === 'pong') {
                //处理心跳响应
                this.handlePong();
            }else{
                switch (message.type) {
                    case 'ORDER_UPDATE':
                        this.handleOrderUpdate(message);
                        break;
                    case 'NOTIFICATION':
                        this.handleSystemNotification(message);
                        break;
                    default:
                        console.warn('Unhandled message type:', message.type);
                }
            }
        }

        //连接关闭
        this.ws.onclose = (event) => {
            console.log('websocket连接关闭的原因', event.reason)
            //停止心跳检测
            this.stopHeartbeat();
            // 如果是异常关闭（非主动调用close方法关闭），则尝试重连
            if (!event.wasClean) {
                //开始重连
                console.log("重连")
                this.scheduleReconnect();
            }
        }

        //错误处理
        this.ws.onerror = (error) => {
            console.log('websocket连接出错', error)
        }
    }

    handleOrderUpdate(orderData) {
        // 更新页面订单状态，例如使用状态管理工具
        store.dispatch(updateOrderStatus(orderData));
    }

    handleSystemNotification(notification) {
        alert(notification.message);
    }

    //开启心跳检测
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                console.log('发送心跳')
                this.ws.send(JSON.stringify({ type: 'ping' }))//发送心跳包
                //设置超时检测（5秒内未收到pong则断开）
                this.pingTimeout = setTimeout(() => {
                    if (this.ws.readyState === WebSocket.OPEN) {
                        this.ws.close()//主动断开触发重连
                    }
                }, 5000)
            }
        }, 30000)//每30秒发送一次心跳
    }

    //停止心跳
    stopHeartbeat() {
        console.log("停止心跳")
        clearInterval(this.heartbeatTimer);
        if (this.pingTimeout) {
            clearTimeout(this.pingTimeout);
        }
    }

    //处理心跳响应
    handlePong() {
        console.log('心跳正常')
        if (this.pingTimeout) {
            clearTimeout(this.pingTimeout);
            this.pingTimeout = null;//重置定时器ID
        }
    }

    //计划重连
    scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('已达最大重连次数，停止重试')
            return
        }

        //指数退避策略
        const delay = Math.pow(2, this.reconnectAttempts) * 1000
        this.reconnectTimer = setTimeout(() => {
            console.log('尝试重连', this.reconnectAttempts)
            this.reconnectAttempts++
            this.connect()
        }, delay)
    }

    //发送消息
    send(data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }
}

