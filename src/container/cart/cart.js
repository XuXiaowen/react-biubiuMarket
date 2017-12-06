import React, {Component} from 'react';
import './cart.less'
import {connect} from 'react-redux';
import actions from '../../store/actions/cart';
import {Link} from 'react-router-dom';
import {addStoreCart} from '../../api/cart';
import Dialog from "../../components/dialog/dialog";

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            totalCount: '',
            flag: false,
            isDialog: false,
            isAll: false,
            //登录人电话
            userPhone: '',
            //收货人电话
            consigneeTel: '',
            //收货人地址
            consigneeAdress: '',
            address: true,
            consignee: ''
        }
    }

//购物车为空时跳转列表页
    go = () => {

        addStoreCart({
            tel: 18611111112,
            cartList: []
        })
    }
//点击选好了按钮，把购物车信息传递给后台
    number = () => {
        addStoreCart({
            tel: 18611111112,
            cartList: this.props.cartList
        })
    }

//弹框
    hideDialog = () => {
        this.setState({
            isDialog: false
        })
    };

//组件加载时，被勾选的商品计算价格
    computeOnce = () => {
        if (this.props.cartList && this.props.cartList.length > 0) {
            let checkList = this.props.cartList.filter(item => {
                return item.isShow;
            })
            let totalCount = checkList.reduce(function (prev, next, index) {

                return prev + next.price * next.count;
            }, 0);

            if (totalCount == 0) {
                this.setState({
                    totalCount: ''
                })
            } else {
                // let totalCounts = parseFloat(totalCount).toFixed(1);
                if (totalCount - parseInt(totalCount) == 0) {
                    this.setState({
                        totalCount: parseInt(totalCount)
                    })
                } else {
                    this.setState({
                        totalCount: parseFloat(totalCount).toFixed(1)
                    })
                }
            }
        }
    }
    // 没有选中的状态，不显示总价
    zero = () => {
        if (this.props.cartList && this.props.cartList.length > 0) {
            let checkList = this.props.cartList.every(item => {
                console.log(4, item.isShow);
                if (item.isShow == false) {
                    return item
                }
            });
            if (checkList) {
                this.setState({
                    totalCount: ''
                })
            }
        }
    }

    //计算总价
    computePrice = (id) => {
        let cartList = this.props.cartList, itemFlag = false, eachPrice = '';
        for (let i = 0; i < cartList.length; i++) {
            let item = cartList[i];
            if (item.goodsid == id) {
                itemFlag = item.isShow;
                if (itemFlag) {
                    eachPrice = Number(item.price) * Number(item.count)

                    let readNum = (Number(this.state.totalCount) + eachPrice).toFixed(1);
                    if ((readNum - parseInt(readNum)) == 0) {
                        this.setState({
                            totalCount: parseInt(readNum)
                        })
                    } else {
                        this.setState({
                            totalCount: readNum
                        })
                    }
                } else {
                    eachPrice = Number(item.price) * Number(item.count)
                    if (Number(this.state.totalCount) - eachPrice == 0) {
                        this.setState({
                            totalCount: ''
                        })
                    } else {
                        if (Number(this.state.totalCount) - eachPrice - parseInt(Number(this.state.totalCount) - eachPrice) == 0) {
                            this.setState({
                                totalCount: parseInt(Number(this.state.totalCount) - eachPrice)
                            })
                        } else {
                            this.setState({
                                totalCount: (Number(this.state.totalCount) - eachPrice).toFixed(1)
                            })
                        }
                    }
                }
            }
        }
    }
// 数量为0 时 删除这条的数量
    deleteCart = (id) => {
        if (this.props.cartList && this.props.cartList.length > 0) {
            //console.log(this.props.cartList,'333');
            let delCarts = this.props.cartList.filter(item => {
                return item.goodsid !== id;
            })
            //console.log(4, delCarts);
            this.props.lessCarts(delCarts)
        }
    }

    //勾选按钮
    handleClick = (e) => {
        let id = e.target.dataset.id;
        // console.log(e.target);
        if (e.target.tagName.toLowerCase() == "i") {
            id = e.target.parentNode.dataset.id;
        }
        this.props.check(id);
        this.computePrice(id);
        this.selectALLCartsOnce();
        this.zero();

    }
    //全选
    selectALLCartsOnce = () => {
        if (this.props.cartList && this.props.cartList.length > 0) {
            let flag = this.props.cartList.every((item) => {
                return item.isShow == true;
            })

            this.setState({
                flag
            })
        }
    }

    //selectAll
    // selectAll=()=>{
    //     console.log(222);
    //     this.setState({
    //         flag:!this.state.flag
    //     })
    //     if(this.state.flag){
    //         let allSelect= this.props.cartList.map(item=>{
    //             if(item.isShow){
    //                 item.isShow=!item.isShow;
    //             }
    //             return item;
    //         })
    //         // console.log(8,allSelect);\
    //         this.props.lessCarts(allSelect);
    //     }
    //
    //  // this.setState({
    //  //     flag:false
    //  // })
    //
    //
    //
    //
    // }

    //加号
    add = (e) => {
        let id = e.target.dataset.id;
        this.props.addCount(id);
        this.computeOnce();
        this.message = '库存有限，不能再加啦！';
        let num = this.props.cartList.find(item => {
            return item.goodsid == id
        });
        if (parseFloat(num.count) >= 10) {
            this.setState({
                isDialog: true
            })
        }
    }
    //减号
    minus = (e) => {
        let id = e.target.dataset.id;
        this.props.reduceList(id);
        this.computeOnce();

        this.message = '商品太少，不能再减啦！';
        let num = this.props.cartList.find(item => {
            return item.goodsid == id
        });
        if (parseFloat(num.count) == 0) {
            this.deleteCart(id)
        }
        if (parseFloat(num.count) <= 1) {
            this.setState({
                isDialog: true
            })
        }
    }

    componentDidMount() {

        //从本地存储中读取用户信息
        let n = parseFloat(localStorage.getItem('index'));
        let personInfo = JSON.parse(localStorage.getItem('userInfo'));
        let {userPhone, addressList} = personInfo.user;
        if (addressList.length === 0) {
            this.setState({
                address: false
            })
        }else{
            if (this.props.cartList && this.props.cartList.length > 0) {
                this.computeOnce();
                this.selectALLCartsOnce();
            } else {

                this.props.getCartGoods(18611111112, this.computeOnce);

                this.selectALLCartsOnce();
            }

            this.setState({
                consigneeTel: personInfo.user.addressList[n].receiverPhone,
                consigneeAdress: personInfo.user.addressList[n].adress,
                consignee: personInfo.user.addressList[n].receiverName
            },function(){

            });

        }

    }

    render() {
        let dialog = {
            hideDialog: this.hideDialog,
            btnShow: true,
            message: this.message,
            time: 1000,
            cb: null
        };
        let d = <div>
            {this.props.cartList && this.props.cartList.length > 0 ? <div className="main">
            <div className="message-wrapper">
                <div className="message">
                    <div className="user">
                        <span className="username">收货人</span>
                        <p>{this.state.consignee}</p>
                    </div>
                    <div>
                        <span className="phone">电&nbsp;&nbsp;话</span>
                        <p>{this.state.consigneeTel}</p>
                        <Link to='/affirm'><i className="correct">修改&gt;</i></Link>

                    </div>
                    <div className="picture">
                        <span className="address">收货地址</span>
                        <p>{this.state.consigneeAdress}</p>
                    </div>
                </div>
            </div>
            {this.props.cartList && this.props.cartList.length > 0 ?
                <div className="group-wrapper">
                    <div className="cart-group">
                        <div className="group-name">
                            闪送超市
                        </div>
                        <span className="group-theme">凑单专区</span>
                        <p className="group-receive">￥0起送，22点后满￥69运费5元起，不满￥69运10元起</p>
                        <div className="group-time">
                            <span>收货时间&nbsp;&nbsp;</span>
                            <span className="send">30分钟送达</span>
                            <span className="can">可预订&gt;</span>
                        </div>
                        <div className="group-comment">
                            收货备注
                            <div>
                                <input type="text" placeholder="可输入100字" maxLength={100}/>
                            </div>
                        </div>

                        {

                            this.props.cartList && this.props.cartList.length > 0 ?
                                this.props.cartList.map((item, index) => (
                                    <div className="group-list" key={item.goodsid}>
                                        <div className="list-picture clear">
                                            <div className="list-icon">
                                                <div className="list-box" data-id={item.goodsid}
                                                     onClick={this.handleClick}
                                                >
                                                    {item.isShow ?
                                                        <i className="iconfont icon-xuanze"></i> : null}
                                                </div>
                                            </div>
                                            <img
                                                src={item.img}
                                            />
                                        </div>
                                        <div className="list-detail">
                                            <div className="list-name">{item.name}</div>
                                            <div className="list-price">
                                                <span>{item.price}</span>
                                                <div className="list-number">
                                                    <i className="iconfont icon-jianhao" data-id={item.goodsid}
                                                       onClick={this.minus}
                                                    ></i>
                                                    <span>{item.count}</span>
                                                    <i className="iconfont icon-jiahao"
                                                       data-id={item.goodsid}
                                                       onClick={this.add}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                        }

                        {this.props.cartList && this.props.cartList.length > 0 ? <div className="list-all">
                            <div className="list-logo">
                                <div className="list-selectAll" onClick={this.selectAll} data-all="all">
                                    {this.state.flag ? <i className="iconfont icon-xuanze"></i> : null}
                                </div>
                                <span>
                                        全选</span>
                                <span>{this.state.totalCount}</span>
                            </div>
                            <Link
                                to={{pathname:'/settlement',query:this.state.totalCount}} >
                                <div className="list-check clear"
                                     onClick={this.number}
                                >选好了
                                </div>
                            </Link>

                        </div> : null}
                    </div>
                </div> : null}
        </div> : <div className="cart-empty">
            <div className="cart-null">
                亲，你的购物车是空哒.....
            </div>
            <div className="cart-go">
                <Link to="/market" onClick={this.go}>去逛逛吧</Link>
            </div>
        </div>}
        </div>
        return (
            <div className="car-container">
                {this.state.isDialog ? <Dialog dialog={dialog}/> : null}
                <div className="header">
                    <div className="title-name">购物车</div>
                </div>

                {this.state.address ? d : (<div className="mar-wrapper">
                    <img className="positionImg" src="../../../static/empty_addrlist-7b6725e9.png"/>
                    <div className="positionInfo">
                        <span>还没有收货地址哦~~~~</span>
                        <Link to='/affirm'>
                            <div className="btn">点击增加地址</div>
                        </Link>

                    </div>

                </div>)}

            </div>
        )
    }
}

export default connect(
    state => state.cart,
    actions
)(Cart)