import React, {Component} from 'react';
import './settlement.less';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import header from '../../components/header/header';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../../store/actions/userInformation';

class Settlement extends Component {
    constructor() {
        super();
    }

    // componentDidMount() {
    //     this.node = document.createElement('div');
    //     this.node.className = 'ReactModal';
    //     document.getElementsByTagName('body')[0].appendChild(this.node);
    //     let modal = (
    //         <div className="sure-pay">
    //             <span>应付金额&nbsp;:</span >&nbsp;&nbsp;<span>{this.props.location.query}</span><span>确定下单</span>
    //         </div>
    //     );
    //     let allClass = document.getElementsByClassName('ReactModal');
    //     ReactDOM.render(modal, allClass[allClass.length - 1]);
    // }
    //
    // componentWillUnmount() {
    //     ReactDOM.unmountComponentAtNode(this.node)
    // }

    render() {

        return (
            <div>
                <header>
                    <div className="page-header">
                        <Link to='/home'>
                        <i className="iconfont icon-mjiantou-copy toBack"></i>
                        </Link>
                        结算付款
                    </div>
                </header>
                <div className="settle-wrapper">
                    <div className="pay-way">
                        <div className="class-name">选择支付方式</div>
                        <ul>
                            <li><i></i><span>微信支付</span><i></i></li>
                            <li><i></i><span>支付宝支付</span><i></i></li>
                            <li><i></i><span>货到付款</span><i></i></li>
                        </ul>
                    </div>
                    <ul className="discount">
                        <li className="class-name youhuiquan"><span>优惠券</span><span>暂无可用优惠券</span></li>
                        <li><span>积分券</span><span>暂无可用积分券</span></li>
                    </ul>
                    <div className="correct-money">
                        <span>应付金额&nbsp;:</span >&nbsp;&nbsp;<span className="correct-pay">￥{this.props.location.query}</span>
                        <button>确认支付</button>
                    </div>
                    {/*<div className="product-list">*/}
                    {/*<div className="class-name">商品明细</div>*/}
                    {/*<ul>*/}
                    {/*<li><span>高乐高</span><span>x100&nbsp;&nbsp;￥100</span></li>*/}
                    {/*</ul>*/}
                    {/*</div>*/}
                    {/*<div className="money-list">*/}
                    {/*<div className="class-name">费用明细</div>*/}
                    {/*<ul >*/}
                    {/*<li><span>商品金额</span><span>￥100</span></li>*/}
                    {/*<li><span>配送费</span><span>￥5</span></li>*/}
                    {/*<li><span>服务费</span><span>￥0</span></li>*/}
                    {/*<li><span>配送费减免</span><span>￥5</span></li>*/}
                    {/*<li><span>优惠券</span><span>￥0</span></li>*/}
                    {/*</ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.userInformation,
    actions
)(Settlement)