# 项目简介 🚀

本项目是一个基于 Vue 的现代化在线商城系统，采用前后端分离架构，致力于为用户提供流畅、便捷的购物体验。系统涵盖商品浏览、购物车、下单、订单管理等完整电商流程。项目注重代码规范与可扩展性，前端界面美观易用，后端接口安全高效，数据库设计合理，便于后续功能拓展和维护。

## 项目功能 ✨

- 🛒 **商品管理**  
    支持商品的多条件筛选、模糊搜索、分页展示，商品图片轮播，提升用户浏览效率。

- 🛍️ **购物车功能**  
    实现商品一键加入购物车、批量操作、数量调整、价格实时计算，购物流程便捷直观。

- 👤 **用户系统**  
    支持注册、登录、登出、找回密码、个人信息管理，采用 JWT+双token机制 技术保障账户安全

- 📝 **订单管理**  
    用户可便捷下单，查看订单列表与详情，订单状态实时跟踪，支持订单取消与售后申请。

- 💬 **评论与评分**  
    用户可对已购商品进行评价与星级评分，评论区支持展示、筛选与管理，提升商品可信度。

- 📧 **消息通知**  
    采用websocket技术，下单成功后自动发送消息提醒，提升用户体验。

- 🗃️ **数据持久化**  
    基于 MySQL 的高效数据存储，结构清晰，支持数据备份与恢复。

## 技术栈 🛠️

- 前端： [Vue.js](https://vuejs.org/)、[Vue Router](https://router.vuejs.org/)、[Vuex](https://vuex.vuejs.org/)、[Axios](https://axios-http.com/)、[Element UI](https://element.eleme.io/)
- 后端： [Node.js](https://nodejs.org/)、[Express](https://expressjs.com/zh-cn/)
- 数据库： [MySQL](https://www.mysql.com/)

## 项目结构 🗂️

```
├── server/                # 后端服务 (Node.js + Express)
│   ├── db/                # 数据库连接
│   ├── controllers/       # 控制器
│   ├── router/            # 接口路由
│   ├── app.js             # SQL建表脚本
├── web/                   # 前端项目 (Vue)
│   ├── public/            # 公共资源
│   └── src/
│       ├── assets/        # 静态资源
│       ├── components/    # 公共组件
│       ├── pages/         # 页面组件
│       ├── router/        # 路由配置
│       ├── store/         # 状态管理
│       ├── api/           # 接口请求
│       ├── App.vue        # 根组件
│       └── main.js        # 入口文件
├── README.md
├── SQL                    # 数据库，数据表建立sql
└── package.json
```

## 安装与使用 🏁

1. 克隆项目代码

                ```bash
                git clone https://github.com/yourname/vue-shop.git
                cd vue-shop
                ```

2. 安装前端依赖

                ```bash
                cd web
                npm install
                ```

3. 安装后端依赖

                ```bash
                cd ../server
                npm install
                ```

4. 配置数据库，导入 `server/sql` 下的建表脚本

5. 启动后端服务

                ```bash
                npm run start
                ```

6. 启动前端开发环境

                ```bash
                cd ../web
                npm run serve
                ```

7. 访问 [http://localhost:8080](http://localhost:8080) 即可体验

## 其他 🙋

如有问题或建议，欢迎提 issue 交流，感谢您的关注与支持！