import banner from './banner.json'
import floor from './floor.json'
import detail from './detail.json'
import Mock from 'mockjs'
import shopcart from './shopcart.json'

//三级链表
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
Mock.mock('/mock/detail',{code:200,data:detail})
// options 对象在 data 函数内部被自动传递，它包含了关于请求的各种信息，比如请求的方法、URL、路径参数、查询参数、请求体等
Mock.mock('mock/cart/addToCart', {code: 200,data:null})
Mock.mock('/cart/cartList',{code:200,data:shopcart})