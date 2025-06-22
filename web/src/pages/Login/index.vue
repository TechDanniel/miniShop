<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <!-- 用户名与密码的地方 -->
            <form>
              <div class="input-text clearFix">
                <span></span>
                <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone"/>
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input type="text" placeholder="请输入密码" v-model="password"/>
              </div>
              <div class="setting">
                <div width="50px">
                  <input type="checkbox" id="remember" v-model="isRemember"/>
                  <select class="checkbox inline" v-model="rememberDays">
                    <option value="7">7天</option>
                    <option value="30">30天</option>
                  </select>
                  <span style="margin-right: 7px;">内免登录</span>
                </div>
                <div class="forget">忘记密码？</div>
              </div>
              <!-- prevent修饰符:可以阻止默认事件  不用修饰符也可以，用event.preventDefault() -->
              <button class="btn" @click.prevent="login">
                登&nbsp;&nbsp;录
              </button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机miniShop</li>
        <li>销售联盟</li>
        <li>miniShop社区</li>
      </ul>
      <div class="address">地址：湖北省武汉市</div>
      <div class="beian">鄂390139485634</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //收集用户名
      phone: "",
      //收集登录密码
      password: "",
      rememberDays: "1", // 记住登录天数
      isRemember: false, // 是否记住登录
    };
  },
  methods: {
    //登录的回调
    async login() {
      //获取用户名|密码
      const { phone, password } = this;
      //通知Vuex发请求，告诉服务器我要登录
      if (phone && password) {
        //登录成功---home
        //失败提示
        try {
          console.log("登录中...",this.rememberDays);
          await this.$store.dispatch("userLogin", { phone, password,isRemember:this.isRemember,rememberDays:this.rememberDays });
          //判断登录的组件URL：是否有query参数【即为用户未登录时候，想去而没有去成的路由】
          let toPath = this.$route.query.redirect||'/home';
          this.$router.push(toPath);
        } catch (error) {
          alert(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background:url(./images/loginbg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background: transparent;
}

.login {
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.10);
  padding: 28px 22px;
  position: relative;
}

.loginform {
  width: 100%;
}

.tab {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.tab li {
  flex: 1;
}

.tab li a {
  display: block;
  height: 44px;
  line-height: 44px;
  font-size: 17px;
  color: #999;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.tab li a.current,
.tab li a:hover {
  color: #e93854;
  border-bottom: 2px solid #e93854;
  background: #f7f7f7;
}

.content {
  padding: 0;
}

form {
  margin-bottom: 16px;
}

.input-text {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #fafbfc;
  transition: border-color 0.2s;
  overflow: hidden;
}

.input-text:focus-within {
  border-color: #e93854;
}

.input-text span {
  width: 36px;
  height: 36px;
  background-size: 120px 240px;
  border-right: 1px solid #e0e0e0;
}

.input-text .pwd {
  background-position: -72px -201px;
}

.input-text input {
  flex: 1;
  height: 36px;
  border: none;
  background: transparent;
  padding: 0 10px;
  font-size: 15px;
  outline: none;
}

.setting {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
  font-size: 13px;
  color: #888;
}

.setting input[type="checkbox"] {
  margin: 5px;
}

.setting .forget {
  color: #e93854;
  cursor: pointer;
  transition: color 0.2s;
}

.setting .forget:hover {
  color: #b71c1c;
  text-decoration: underline;
}

.btn {
  background: linear-gradient(90deg, #e93854 0%, #ff6a88 100%);
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  height: 40px;
  margin-top: 16px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(233,56,84,0.08);
}

.btn:hover {
  background: linear-gradient(90deg, #ff6a88 0%, #e93854 100%);
  box-shadow: 0 4px 16px rgba(233,56,84,0.13);
}

.call {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
}

.call ul {
  display: flex;
  gap: 10px;
}

.call ul li img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f5f5;
  padding: 3px;
  transition: box-shadow 0.2s;
}

.call ul li img:hover {
  box-shadow: 0 2px 8px rgba(233,56,84,0.10);
}

.call .register {
  color: #e93854;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.call .register:hover {
  color: #ff6a88;
  text-decoration: underline;
}

.copyright {
  width: 100%;
  background: #fff;
  padding: 20px 0 10px 0;
  margin-top: 36px;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 14px;
  color: #888;
}

.copyright ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.copyright ul li {
  display: inline-block;
  border-right: 1px solid #e0e0e0;
  padding: 0 15px;
  margin-bottom: 8px;
}

.copyright ul li:last-child {
  border-right: none;
}

.copyright .address,
.copyright .beian {
  margin-top: 5px;
  font-size: 13px;
  color: #aaa;
}
</style>