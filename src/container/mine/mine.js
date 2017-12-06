import React, {Component} from 'react';
import './mine.less';
import {Link} from 'react-router-dom';
export default class Mine extends Component {
  constructor(){
    super();
    this.state={
      telephone:null
    }
  }

  componentDidMount(){
    let personInfo = JSON.parse(localStorage.getItem('userInfo'));
    let phone=JSON.parse(localStorage.getItem('userInfo')).user.userPhone;
    this.setState({
      telephone:phone
    })

  }

  render() {
    return (

      <div className="mine-main">

        <div className="user-Info" >
          {/*  <Link >*/}
          <div className="user">
            <div className="user-picture">
              <i className="iconfont icon-ren"></i>
            </div>
            <div className="user-self">
              <p className="user-phone">{this.state.telephone}</p>
              <p className="user-lever"><i className="iconfont icon-medal">
              </i>
              </p>
            </div>
            <p className="more">&gt;</p>
          </div>
          {/* </Link>
           */}
        </div>
        <div className="user-theme">
          <div>
            <i className="iconfont icon-bao">
            </i>
            商品收藏
          </div>
          <span></span>
          <div className="store">
            <i className="iconfont icon-dianpu">

            </i>
            店铺收藏
          </div>
        </div>
        <div className="mine-content">

          <div className="mine-order">
            我的订单
            <span>查看全部订单&gt;</span>
          </div>
          <ul className="mine-type">
            <li>
              <i className="iconfont icon-bao"></i>
              待付款
            </li>
            <li>
              <i className="iconfont icon-bao"></i>
              待收货
            </li>
            <li>
              <i className="iconfont icon-bao"></i>
              待评价
            </li>
            <li>
              <i className="iconfont icon-bao"></i>
              退款/售后
            </li>
          </ul>
          <ul>
            <li>
              <i className="iconfont icon-bao"></i>
              积分商城
            </li>
            <li>
              <i className="iconfont icon-bao"></i>
              优惠券
            </li>
            <li>
              <Link to='/affirm'>
                <i className="iconfont icon-bao"></i>
                收货地址
              </Link>
            </li>
            <li>
              <i className="iconfont icon-bao"></i>
              客服/反馈
            </li>

            <li>
              <i className="iconfont icon-bao"></i>
              关于我们
            </li>
          </ul>
          <div className="mine-quit" >
            退出当前账号
          </div>

        </div>


      </div>


    )
  }
}