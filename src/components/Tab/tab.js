import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './tab.less';
// import {connect} from 'react-redux';
// import actions from '../../store/actions/cart';
export default class Tab extends Component {
    render() {
        let {code} = JSON.parse(localStorage.getItem('userInfo')) || {code: 1};
        return (
            <div className="tabs">
                <NavLink to="/home">
                    <i className="iconfont icon-shouye-copy"></i>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/market">
                    <i className="iconfont icon-iconfontrocket0-copy"></i>
                    <span>biubiu超市</span>
                </NavLink>
                {/*//权限控制*/}
                <NavLink to={code ? "/signin" : "/cart"}>
                    {/*<NavLink to="/cart">*/}
                    <i className="iconfont icon-gouwuche"></i>
                    <span>购物车</span>
                </NavLink>
                <NavLink to={code ? "/signin" : "/mine"}>
                    {/*<NavLink to="/mine">*/}
                    <i className="iconfont icon-wode"></i>
                    <span>我的</span>
                </NavLink>
            </div>
        )
    }
}