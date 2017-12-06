import React, {Component} from 'react';
import {downBar} from '../../utils'
import DragDown from "../../components/DragDown/dragdown";
import Header from "../../components/header/header";
import GoodInfo from "../../components/GoodInfo/GoodInfo";
import {connect} from 'react-redux'
import actionsMar from '../../store/actions/market'
import actionsCar from '../../store/actions/cart'
import {getSubtype, setActive} from '../../utils'
import {jQuery} from 'webpack-dev-server/client/web_modules/jquery'
import {Link} from 'react-router-dom'
import Dialog from "../../components/dialog/dialog";

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            splits: false, /*分类*/
            sort: false, /*排序*/
            code: false, /*是否显示菜单*/
            isSort: false, /*是否显示排序*/
            goods: [], /*筛选后的数据*/
            index: 0,
            address: true,//是否有收货地址
            text: '',
            isShow: false
        }
    }

    componentDidMount() {
        let childBox = document.getElementById('list');
        downBar(childBox);
        this.props.getMarket(0);
        /*     let title = document.getElementById('mar-title')
<<<<<<< HEAD
             let spans = title.getElementsByTagName('span');
             spans[0].className = 'mar-all focus';*/
        /* for (let i = 0; i < spans.length; i++) {
             let s = spans[i];
             s.addEventListener('click', (e) => setActive(e, 'mar-all', 'span', 'focus'))
=======
         let spans = title.getElementsByTagName('span');
         spans[0].className = 'mar-all focus';*/
        /* for (let i = 0; i < spans.length; i++) {
         let s = spans[i];
         s.addEventListener('click', (e) => setActive(e, 'mar-all', 'span', 'focus'))
         }*/

        //判断用户是否有收货地址，如果没有就跳到增加地址页面

        let personInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (personInfo) {
            let {addressList} = personInfo.user;
            if (addressList.length === 0) {
                this.setState({
                    address: false
                })
            }
            if (personInfo) {
                if (personInfo.user.addressList.length == 0) {
                    this.personAdress = '';
                } else {
                    let n = parseFloat(localStorage.getItem('index'));
                    this.personAdress = personInfo.user.addressList[n].adress;
                }
                this.code = personInfo.code;
            } else {
                this.personAdress = '';
                this.code = 1;
            }
        }


    }

    /*设置dialog*/
    showDialog = () => {
        this.setState({
            isShow: true
        })
    };
    hideDialog = () => {
        this.setState({
            isShow: false
        })
    };
    /*事件委託重置code值*/
    resetCode = (e) => {
        let menulist = document.getElementById('mar-menulist') || '';
        let alllist = document.getElementById('mar-alllist') || '';
        if (e.target.className !== 'mar-split') {
            this.setState({code: false}, () => {
                if (this.state.code) {
                    menulist.style.display = 'block'
                }
            });
        }
        if (e.target.className !== 'mar-sort') {
            this.setState({isSort: false}, () => {
                if (this.state.isSort) {
                    alllist.style.display = 'block'
                }
            });
        }
    };
    /*改变index的值*/
    changeInd = (indexs) => {
        this.setState({index: indexs})
    }
    /*更改字体图标*/
    changeIco = (e) => {
        this.setState({code: !this.state.code});
        let target = e.target;
        if (target.className === 'mar-split') {
            let son = target.children[1];
            this.setState({splits: !this.state.splits});
            son.className = this.state.splits ? 'iconfont icon-jiantouxia' : 'iconfont icon-jiantoushang';
        } else if (target.className === 'mar-sort') {
            let son = target.children[1];
            this.setState({sort: !this.state.sort});
            son.className = this.state.sort ? 'iconfont icon-jiantoushang' : 'iconfont icon-jiantouxia'
        }
    };
    /*设置span样式*/
    /*    setSpan = (e) => {
     let tle = document.getElementById('mar-tle');
     console.log(tle)
     let tags = tle.getElementsByTagName('span');
     console.log('****^^^^^^^^^^*******6666666666666668');
     console.log(tags);
     tags[0].className = 'mar-all ' + 'focus';
     for (let i = 0; i < tags.length; i++) {
     if (tags[i] !== e.target) {
     tags[i].className = 'mar-all';
     } else {
     tags[i].className = 'mar-all ' + 'focus';
     }
     }
     };*/
    /*分类搜索*/
    searchInfo = (e) => {
        let text = e.target.innerHTML;
        this.setState({text});
    };
    /*价格最低*/
    lowGoods = () => {
        let goods = this.props.goods.sort((a, b) => {
            return a.price - b.price
        })
    }
    /*价格最高*/
    highGoods = () => {
        let goods = this.props.goods.sort((a, b) => {
            return b.price - a.price
        })
    }
    /*销量最高*/
    sortGoods = () => {
        let goods = this.props.goods.sort((a, b) => {
            return b.salecount - a.salecount
        })
    }


    componentWillReceiveProps() {
        this.setState({goods: this.props.goods});


    }

    render() {
        let dialog = {
            hideDialog: this.hideDialog,
            btnShow: false,
            message: '添加购物车成功',
            time: 1500,
            cb: null
        };
        let menu = ["热销新品", "优选水果", "卤味熟食",
            "牛奶面包", "进口食品", "冰激凌", "饮料酒水", "休闲零食", "方便速食", "粮油调味", "生活用品", "跑腿代购"];
        let d = <div className="mar-wrapper" id="mar-wrapper">
            <DragDown resetCode={this.resetCode} menu={menu} getMarket={this.props.getMarket}
                      changeInd={this.changeInd} text={this.state.text}/>
            <div className="mar-menu">
                <div className="mar-title" id="mar-title">
                    <div className="mar-tle" id="mar-tle">
                        <div className="mar-split" id="mar-split" onClick={this.changeIco}>
                            <a className="fenlei">全部分类</a>
                            <i className="iconfont icon-jiantouxia"></i></div>
                        {
                            this.state.code ?
                                <div className="mar-menulist" id="mar-menulist">
                                        <span className="mar-all focus"
                                              onClick={(e) => {
                                                  // this.setSpan(e);
                                                  // this.props.getMarket(this.state.index);
                                                  this.setState({text: ''});
                                              }}>全部分类</span>
                                    {getSubtype(this.props.goods, 'subtypename').map((item, index) => {
                                        return item.subtypename ?
                                            <span className="mar-all" onClick={(e) => {
                                                e.target.className = 'mar-all focus';
                                                this.searchInfo(e);
                                                document.getElementById('mar-split').children[0].innerHTML = e.target.innerHTML;
                                            }}
                                                  key={index}>{item.subtypename}</span> : ''
                                    })}
                                </div> : ''
                        }
                    </div>
                    <div className="mar-tle">
                        <div className="mar-sort" id="mar-sort" onClick={
                            (e) => {
                                this.changeIco(e);
                                this.setState({isSort: !this.state.isSort})
                            }}>
                            <a className="sort">综合排序</a>
                            <i className="iconfont icon-jiantouxia"></i></div>
                        {this.state.isSort ?
                            <div className="sortCon" id="sortCon">
                                        <span className="mar-all focus"
                                              onClick={(e) => {
                                                  this.props.getMarket(this.state.index);
                                                  document.getElementById('mar-sort').children[0].innerHTML = e.target.innerHTML;
                                              }}>综合排序</span>
                                <span className="mar-all" onClick={(e) => {
                                    this.sortGoods();
                                    document.getElementById('mar-sort').children[0].innerHTML = e.target.innerHTML;
                                }}>销量最高</span>
                                <span className="mar-all" onClick={(e) => {
                                    this.lowGoods();
                                    document.getElementById('mar-sort').children[0].innerHTML = e.target.innerHTML;
                                }}>价格最低</span>
                                <span className="mar-all" onClick={
                                    (e) => {
                                        this.highGoods();
                                        document.getElementById('mar-sort').children[0].innerHTML = e.target.innerHTML;
                                    }
                                }>价格最高</span>
                            </div> : ''}
                    </div>
                </div>
                <div className="mar-list" id="mar-list">
                    <div id="goodinfo">
                        <div id="info">
                            {console.log(this.props.goods.filter((item) => {
                                let a = !this.state.text ? item : (item.subtypename == this.state.text ? item : '');
                                return a;
                                // return !this.state.text || item.subtypename == this.state.text
                            }))}
                            <GoodInfo
                                goods={this.props.goods.filter((item) => {
                                    return !this.state.text || item.subtypename == this.state.text
                                })}
                                addCart={this.props.addCart}
                                setShow={this.showDialog}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        return (

            <div onClick={(e) => this.resetCode(e)}>
                {this.state.isShow ? <Dialog dialog={dialog}/> : null}
                <Header>
                    <div className="page-header">
                        <Link to={this.code ? "/signIn" : "/affirm"}>{this.personAdress}</Link>
                    </div>

                </Header>
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

import './market.less'

export default connect(state => {
    return state.market
}, {...actionsMar, ...actionsCar})(Market)
