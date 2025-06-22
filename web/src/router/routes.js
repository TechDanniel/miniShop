import home from '../pages/home'
import Register from '../pages/Register/index.vue'
import Login from '../pages/Login/index.vue'
import search from '../pages/search'
import detail from '../pages/Detail'
import addCartSuccess from '../pages/AddCartSuccess'

export default[
    {
        path: "/",
        redirect: "/login" // 直接设置根路径重定向到登录页面
    },
    {
        path:'/home',
        component:home,
        meta:{
            show:true
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            show:false
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            show:false
        }
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:search,
        meta:{
            show:true
        }
    },
    {
        path:'/detail/:goodId',
        component:detail
    },
    {
        name:'addCartSuccess',
        path:'/addCartSuccess',
        component:addCartSuccess
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:()=>import('@/pages/ShopCart')
    },
    //交易页面的路由：书写在这里的守卫，路由独享守卫【只负责档期这一个路由】
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            //to：去哪个路由
            //from：从哪个路由而来
            //next：放行函数
            //代表的用户从购物车跳转到交易页面，才放行
            if (from.path == "/shopcart") {
                next();
            } else {
                //用户并非从购物车而来  
                //next(false): 中断当前的导航。
                //如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //进入支付页面，必须从交易页面而来
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }

    }
    ,
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            //我的订单二级路由
            {
                path: "myorder",
                component: () => import('@/pages/Center/myOrder'),
            }
            ,
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            }
            ,
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    }
]