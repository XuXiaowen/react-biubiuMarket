import React, {Component} from 'react';
import Header from "../../components/header/header";
import './affirm.less'
import Dialog from "../../components/dialog/dialog";
import {connect} from 'react-redux';
import actions from '../../store/actions/adress';
import {Link} from 'react-router-dom'
 class Affirm extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            addressList:[]
        }
    }
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
    componentDidMount() {
        this.setState({
            ...this.state,
            addressList:this.props.signInfo.user.addressList
        },function(){
            let infoList=document.getElementById('info-list');
            let liItem=infoList.getElementsByTagName('li');
            let defaultClass='info-item';

            if(liItem.length){
                let n=parseFloat(localStorage.getItem('index'));
                if(!n){
                    localStorage.setItem('index',0)
                }
                n=parseFloat(localStorage.getItem('index'));
                liItem[n].className+=' active';

                infoList.onclick=fn
            }


            function fn(e){
                for(var i=0;i<liItem.length;i++){

                    if(e.target.parentNode.parentNode==liItem[i]){
                        localStorage.setItem('index', i.toString());
                        liItem[i].className=defaultClass+' active'
                    }else{
                        liItem[i].className=defaultClass
                    }
                }
            }
        });
    }
    render() {
        let dialog = {
            hideDialog: this.hideDialog,
            btnShow: true,
            message: '定位失败了，请检查你的设备',
            time: 2000,
            cb: null
        };
        return (
            <div>
                {this.state.isShow ? <Dialog dialog={dialog}/> : null}
                <Header>
                    <div className="page-header affirm-header">选择地址
                        <Link to="/home">
                            <i className="iconfont icon-mjiantou-copy"></i>
                        </Link>
                    </div>
                </Header>
                <div className="page-panel">
                    <div className="panel-position" onClick={this.showDialog}>
                        <i className="iconfont icon-dingwei1"></i>
                        <span>定位到当前位置</span>
                    </div>
                    <ul className="info-list" id="info-list">

                        {this.state.addressList.length?
                                ( this.state.addressList.map((item, index) => (
                            <li className="info-item" key={index}>
                                <div className="info-detail">
                                    <p>{item.receiverName} &nbsp;&nbsp;{item.receiverPhone}</p>
                                    <p className="p2">{item.adress}</p>
                                </div>
                                <div className="info-change">
                                    <Link to={{pathname: "/modifiAdress", index: index}}>
                                        <i className="iconfont icon-bianji"></i>
                                    </Link>

                                </div>
                            </li>
                        ))):<span className="none-adress">请先添加收货地址</span>}
                    </ul>
                    <div className="add-btn">
                        <Link to="/addAdress">
                            <div className="btn">+&nbsp;新增地址</div>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}
export default connect(
    state=>state
)(Affirm)
