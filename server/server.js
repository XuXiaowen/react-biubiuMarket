let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let path = require('path');
let url = require('url');
let fs = require('fs');
let app = express();
let port = 3000;
//---------数据模块-------------
let sliders = require('./mock/sliders');
let brands = require('./mock/brands');
let menuInfos = require('./mock/menuInfos');
let blockInfos = require('./mock/blockInfos');
//----------------------------end
app.use(bodyParser.json());
app.use(session({
    resave: true, //每次访问都会重新保存 session
    saveUninitialized: true, //保存未初始化的session
    secret: 'aixianfeng' //密钥
}));

app.use(function (req, res, next) {
    //允许的来源
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //允许客户端请求的方法
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    //允许客户端发送的请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //允许客户端发送Cookie
    res.header('Access-Control-Allow-Credentials', 'true');
    //允许客户端向服务器发post跨域的时候，会先发送OPTIONS请求。如果服务器返回的响应头Access-Control-Allow-Methods里有POST的话，才会再次发送post请求
    if (req.method == 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});
app.listen(port, () => (console.log('监听' + port + '端口成功!!') ));

//加载静态资源文件
app.use(express.static(path.join(__dirname, '../static')));
//获取轮播图
app.get('/sliders', function (req, res) {
    res.json(sliders);
});
//获取brands图
app.get('/brands', function (req, res) {
    res.json(brands);
});
//获取menuInfos数据
app.get('/menuInfos', function (req, res) {
    res.json(menuInfos);
});

function getMarket(cb) {
    fs.readFile('./mock/market.json', 'utf-8', function (err, data) {
        if (err || data.length === 0) {
            cb([])
        } else {
           // console.log(data);
            cb(JSON.parse(data))
        }
    })
}

function writeMarket(cb) {
    fs.writeFile('./mock/market.json', JSON.stringify(data), cb);
}

//获取超市数据
app.get('/market', function (req, res) {
    let {query} = url.parse(req.url, true);
    let typeid = query.typeid;
    getMarket(function (markets) {
        let market = markets.find((item, index) =>
            item.typeid == typeid
        );
        res.send(market);
    });
});


//获取blockInfos数据
app.get('/blockInfos', function (req, res) {
    res.json(blockInfos);
});


//------------------------------------------------------------------------------
////获取用户购物车列表
function getCartList(cb) {
    fs.readFile('./mock/cart.json', 'utf-8', (err, data) => {
        if (err) {
            return;
        }
        cb(data);
    })
}

//添加到购物车列表
function addCart(cartList, userCart, cb) {
    fs.writeFile('./mock/cart.json', JSON.stringify(cartList), function (err) {
        if (err) {
            cb && cb({
                code: 100,
                error: '添加失败，请稍后重试。'
            })
        } else {
            cb && cb(userCart)
        }
    })
}

//从store 传递购物车数据
app.post('/api/carts', (req, res) => {
    let cart = req.body;
    console.log(1,cart,'444444444444444444444444');
    getCartList(data => {
        let allCardList = JSON.parse(data);
        // console.log(allCardList);
        if (!allCardList) {
            allCardList = []
        }
        ;

        let index = allCardList.findIndex(item => item.tel == cart.tel);
        if (index == -1) {
            allCardList.push(cart);
        } else {
            let oldCart = allCardList[index];
            console.log(oldCart,'000000000000000000000000');

            oldCart.cartList = cart.cartList;

        }

        addCart(allCardList, {code: 200, data: {...allCardList}}, data => res.send(data))
    });
});


//添加购物车
app.post('/api/cartlist', (req, res) => {
    let cart = req.body;
    // console.log(1,cart);
    getCartList(data => {
        let allCardList = JSON.parse(data);
        // console.log(allCardList);
        if (!allCardList) {
            allCardList = []
        }

        let index = allCardList.findIndex(item => item.tel == cart.tel);
        if (index == -1) {
            allCardList.push(cart);
        } else {
            let oldCart = allCardList[index];
            let oldCartList = oldCart.cartList;
            // oldCartList.push(cart.cartList)
            // console.log(oldCartList);

            //判断购物车有没有传过来的商品
            let isExist = oldCartList.some(item => item.goodsid == cart.cartList[0].goodsid)
            if (isExist) {
                oldCartList.forEach(item => {
                    if (item.goodsid == cart.cartList[0].goodsid) {
                        item.count = parseFloat(item.count) + 1
                    }
                })
            } else {
                oldCartList.push(cart.cartList[0])
            }
        }
        addCart(allCardList, {code: 200, data: {...allCardList}}, data => res.send(data))
    });
});

//获取购物车
app.get('/api/cartlist', (req, res) => {

    let query = url.parse(req.url, true).query;
    // console.log(query);
    getCartList(data => {
        let cartList = JSON.parse(data);
        //  console.log(cartList);
        let userCart = cartList.find(item => {
            return item.tel == query.tel
        });
        // console.log(11,userCart);
        if (!userCart) {
            userCart = {
                tel: query.tel,
                data: []
            };
            res.send({code: 200, data: []})

        } else {

            res.send({code: 200, data: {...userCart}})
        }
    })
});

//-----------------------------------------------------------------

// 注册登录
//获取数据
function getData(cb) {
    fs.readFile('./mock/userData.json', 'utf8', function (error, data) {
        if (error || data.length === 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

//写进去数据
function writeBook(data, cb) {
    fs.writeFile('./mock/userData.json', JSON.stringify(data), cb);
}

// 注册登录
app.post('/api/signIn', function (req, res) {
    let result = {};
    getData(function (users) {
        let user = req.body;
        console.log(user);
        let newUser = users.find((item) => item.userPhone === user.userPhone);
        if (newUser) {
            result.user = newUser;
            result.code = 0;
            res.json(result);
        } else {
            user.userId = users.length ? users[users.length - 1].userId + 1 : 1;
            user.addressList = [];
            users.push(user);
            writeBook(users, function () {
                result.user = user;
                result.code = 0;
                res.json(result);
            })
        }
    });
})
//获取用户信息
app.post('/api/userInformation', function (req, res) {
    let userInformation = require('./mock/userData.json');
    res.json(userInformation);
    console.log('获取userDate数据成功')
});
//添加收货地址
app.post('/api/adress', function (req, res) {
    getData(function (userInfoList) {
        let addInfo = req.body;
        let userInfo = userInfoList.find(item => item.userId == addInfo.userId);
        if (userInfo) {
            addInfo.receiverInfo.adressId = userInfo.addressList.length ? userInfo.addressList[userInfo.addressList.length - 1].adressId + 1 : 1;
            userInfo.addressList.push(addInfo.receiverInfo);
            /*userInfoList.map(item => {
             if (item.userId == userInfo.userId) {
             return userInfo;
             } else {
             return item
             }
             });*/
            writeBook(userInfoList, function () {
                res.json(userInfo);
            });
        }
    })
});
// 删除收货人地址
app.post('/api/delAdress', function (req, res) {
    getData(function (userInfoList) {
        let id = req.body;
        let userInfo = userInfoList.find(item => item.userId === id.userId);
        if (userInfo) {
            userInfo.addressList = userInfo.addressList.filter(item => item.adressId !== id.adressId)
        }
        writeBook(userInfoList, function () {
            res.json(userInfo);
        });
    })
});
//修改收货人地址
app.post('/api/modifiAdress', function (req, res) {
    getData(function (userInfoList) {
        let modifiInfo = req.body;
        let userInfo = userInfoList.find(item => item.userId === modifiInfo.userId);
        if (userInfo) {
            userInfo.addressList = userInfo.addressList.map((item) => {
                if (item.adressId === modifiInfo.receiverInfo.adressId) {
                    console.log(modifiInfo.receiverInfo);
                    return modifiInfo.receiverInfo;
                } else {
                    console.log(item);
                    return item;
                }
            });

            /*userInfoList=userInfoList.map(item => {
             if (item.userId == userInfo.userId) {
             return userInfo;
             } else {
             return item;
             }
             });*/
            writeBook(userInfoList, function () {
                res.json(userInfo);
            });
        }
    })
});

function getAllData(url, cb) {
    fs.readFile(url, 'utf8', function (error, data) {
        if (error || data.length === 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

//写进去数据
function writeAllBook(url, data, cb) {
    fs.writeFile(url, JSON.stringify(data), cb);
}

//获取城市详细地区
app.get('/api/city', function (req, res) {
    let {query} = url.parse(req.url, true);

    getAllData('./mock/city.json', function (citys) {
        let city = citys.find(item => item.city === query.city);
        res.send(city);
    })
});


//search
app.get('/search', function (req, res) {
    let {str} = url.parse(req.url, true).query;
    console.log(str);
    let blockInfos = require('./mock/blockInfos.js');
    if (str == '' || !str) {
        res.send({code: 100, error: ''});
    } else {
        let reg = new RegExp(str);
        console.log(reg);
        console.log("ssssssssss");

        let product = blockInfos.block1.products.filter(item => {
            let isFilter = item.tag && item.tag.find(item => {
                    let reg2 = new RegExp(item);
                    console.log(reg.test(item), reg2.test(str));
                    return reg.test(item) || reg2.test(str);
                });
            return isFilter;
        });
        res.send(product)
    }
});


