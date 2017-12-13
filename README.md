# react-biubiuMarket


### **概述**

------

​	这是一个用 React 全家桶写的完整的实现前后台交互的线上超市App项目。实现了的功能主要有注册登录，搜索，商品分类，排序，购物车，修改信息等。

### **跑起来**

------

项目clone到本地
使用npm安装依赖： `npm install`
客户端： 主目录下运行 `npm run dev`
服务器端 ： server目录下运行`node server.js`

### **技术栈**

------

-  基础列表库： `react`
-  路由 ： `react-router`
-  数据管理：`react-redux` + `redux-thunk`+`redux-logger`中间件
-  路由信息同步 ： `react-router-redux`
-  样式 ： `less`
-  后台： `node.js` + `express`


### **功能实现：**

------

- **注册、登录**：使用手机获取验证码来实现直接登录
- **首页**：项目第一次运行时，弹出一个今日广告弹框，点击叉或三秒后自动消失，使用 ***react-swipe*** 插件实现轮播图效果、使用 ***fetch*** 向后台请求数据，除了菜单menu所有数据都从后台获取并渲到页面，底部封装为一个 ***Tab*** 组件对应四个路由页面，包括首页、*biubiu*超市、购物车、我的，点击跳转到对应的路由页面
- **搜索页**：实现各种关键词模糊搜索，提供热门搜索信息条、点击确认或敲键盘enter键实现开启搜索，从后台拉取用户输入的关键字所匹配到的商品信息并渲染到页面中、使用 ***localStorage*** 本地存储搜索历史记录、提供清空历史记录功能，实现多个组件在同一个页面内进行条件式的显示隐藏
- **biubiu超市页**：实现商品分类侧边栏效果、实现全部分类以及综合、价格、销量的商品排序功能、点击加号添加商品到购物车，发送 **action** ，改变 ***React-redux*** 对应的store状态
- **购物车**：获取store的最新状态，负责展示购物车商品信息，也可以在此修改store的状态，利用 ***react-redux*** 封装的 ***connect*** 连接组件和仓库状态，store的状态一改变，页面就会重渲染新的数据，点击“选好了”进入付款页面
- **我的**：实现信息修改
- 点击具体的商品，通过将当前商品信息动态绑定写好的detail组件，并跳转到对应的页面，在详情页亦可以实现商品的收藏、加入购物车功能
- 点击修改地址可以编辑地址信息

### 首页

![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/home.gif
)

### 注册登录页

![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/login.gif
)

### 添加地址信息

用户登录成功后需要先添加地址才能看到biubiu超市里的商品信息列表和购物车页面的信息
![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/cate.gif)

### biubiu超市页

![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/market.gif)

### 添加商品至购物车-购买(可以临时修改地址)-支付

![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/shop.gif)

### 搜索页

![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/search.gif)

### 地址删除功能

![Image text](https://raw.githubusercontent.com/XuXiaowen/react-biubiuMarket/master/src/images/removeAddress.gif)


