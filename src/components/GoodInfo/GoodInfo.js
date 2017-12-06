/**
 * Created by Lily on 2017/11/20.
 */
import React, {Component} from 'react';
import actions from '../../store/actions/cart'
import {connect} from 'react-redux'
export  default  class GoodInfo extends Component {
    /*购物车*/
    findMsg = (e) => {



        let cartItem = null;
        let id = e.target.dataset.id;


        let n = parseFloat(localStorage.getItem('index'));
        let personInfo = JSON.parse(localStorage.getItem('userInfo'));
        let {userPhone, addressList} = personInfo.user;

        //let tel = addressList[n].receiverPhone;
        if (e.target.tagName.toLowerCase() === 'i') {
            id = e.target.parentNode.dataset.id;
            cartItem = this.props.goods.find((item, index) => {
                return item.goodsid == id;
            })
        }

        this.props.addCart({
            tel: 18611111112,
            cartList: [cartItem]
        })
    };

    render() {
        return (
            <div className="goods">
                {
                    this.props.goods.length > 0 ? this.props.goods.map((item, index) => (
                        <div className="con" key={index}>
                            <div className="img">
                                <img src={item.img} alt=""/>
                            </div>
                            {
                                item.goodsid ? <div className="info">
                                    <p>{item.name} </p>
                                    <i className="iconfont icon-jingxuan red iact"></i><br/>
                                    <div className="goodsInfo">
                                        <div>
                                            <span>{item.unit}</span><br/>
                                            <span className="price">￥{item.price}</span>
                                        </div>
                                        <div className="add" data-id={item.goodsid} onClick={
                                            (e) => {
                                                this.findMsg(e);
                                                this.props.setShow()
                                            }}>
                                            <i className="iconfont icon-iconjia"></i>
                                        </div>
                                    </div>
                                </div> : <div className="nothing"><p>亲，宝贝已经被抢光了哦~</p></div>
                            }
                        </div>
                    )) : ''
                }
            </div>
        )
    }
}
import './GoodInfo.less'