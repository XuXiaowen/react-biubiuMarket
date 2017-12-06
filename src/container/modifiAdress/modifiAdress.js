import React, {Component} from 'react';
import Header from "../../components/header/header";
import {Link} from 'react-router-dom'
import './modifiAdress.less'
import {connect} from 'react-redux'
import actions from '../../store/actions/adress';
import Dialog from "../../components/dialog/dialog";

class ModifiAdress extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            isChecked: true
        }
    }
    handleClick = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    };
   /* showDialog = () => {
        this.setState({
            isShow: true
        })
    };*/
    hideDialog = () => {
        this.setState({
            isShow: false
        })
    };

    nameBlur=()=>{
        if(this.username.value.length==0){
            this.message='收货人不能为空';
            this.setState({
                ...this.state,
                isShow:true,
            });
            return;
        }
    };
    //验证详细地址
    detailBlur=()=>{
        if(this.username.value.length==0){
            this.message='地址不能为空';
            this.setState({
                ...this.state,
                isShow:true,
            });
            return;
        }
    };
    //验证手机号
    teleBlur=()=>{
        let reg=/^1(3|8|5|7)\d{9}$/;
        if(this.telephone.value.length==0){
            this.message='手机号不能为空';
            this.setState({
                ...this.state,
                isShow:true,
            });
            return;
        }else if(!reg.test(this.telephone.value)){
            this.message='手机号格式不正确';
            this.setState({
                ...this.state,
                isShow:true,
            });
            return;
        }
    }


    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let n = parseFloat(localStorage.getItem('index'));
        let {addressList} = userInfo.user;
        this.username.value = addressList[n].receiverName;
        this.sex= addressList[n].sex;

      this.setState({
          isChecked:Boolean(this.sex)
      })
        this.telephone.value = addressList[n].receiverPhone;
        this.detail.value = addressList[n].adress;
        this.selectCity.value = addressList[n].city;
        this.selectRegion.value = addressList[n].region;
        this.props.getCityRegion(this.selectCity.value);
    }

    cityClick = (e) => {
        let value = e.target.value;
        this.props.getCityRegion(value);
    };
    delClick=()=>{
        this.setState({
            isShow: false
        });

        let n=parseFloat(localStorage.getItem('index'));
        let userId=this.props.signInfo.user.userId;
        let adressId=this.props.signInfo.user.addressList[n].adressId;
        let id={userId,adressId};
        this.props.delReceiver(id);
    };
    modifiBtn=()=>{
        this.nameBlur();
        this.detailBlur();

        this.teleBlur();
        let n=parseFloat(localStorage.getItem('index'));
        let receiverName=this.username.value;
        let city=this.selectCity.value;
        let receiverPhone= this.telephone.value;
        let region=this.selectRegion.value;
        let adress=this.detail.value;
        let sex=this.state.isChecked?1:0;
        let adressId=this.props.signInfo.user.addressList[n].adressId;
        let userId=JSON.parse(localStorage.getItem('userInfo')).user.userId;
        let receiverInfo={receiverName,city,receiverPhone,region,adress,sex,adressId};
        let receiver={userId,receiverInfo};


        this.props.modifiReceiver(receiver);


    }
    render() {
        let {index} = this.props.location;
        if (typeof(index) !== 'undefined') {
            localStorage.setItem('index', index.toString());
        }
        let isChecked = this.state.isChecked;
        // console.log('修改页面的',this.props.region);
        let dialog = {
            hideDialog: this.hideDialog,
            btnShow: false,
            message: this.message,
            time: 1500,
            cb: null
        };
        return (
            <div>
                {this.state.isShow ? <Dialog dialog={dialog}/> : null}
                <Header>
                    <div className="page-header modifi-header">
                        <Link to="/affirm">
                            <i className="iconfont icon-mjiantou-copy"></i>
                        </Link>
                        修改地址
                        <span className="s1" onClick={this.modifiBtn}>保存</span>
                    </div>
                </Header>
                <div className="content-panel">
                    <ul className="adress-list">
                        <li className="adress-item">
                            <label>联系人</label>
                            <input type="text" onBlur={this.nameBlur} ref={input => this.username = input}/>
                        </li>
                        <li className="adress-item">
                            <div className="item-icon">
                                <div className="item-box">
                                    {isChecked ? <i className="iconfont icon-xuanze"></i> :
                                        <i className="default-font"></i>}
                                    <span onClick={this.handleClick}>先生</span>
                                </div>
                                <div className="item-box">
                                    {isChecked ? <i className="default-fonti"></i> :
                                        <i className="iconfont icon-xuanze"></i>}
                                    <span onClick={this.handleClick}>女士</span>
                                </div>
                            </div>
                        </li>
                        <li className="adress-item">
                            <label>手机号码</label>
                            <input type="text" onBlur={this.teleBlur} ref={input => this.telephone = input}/>
                        </li>
                        <li className="adress-item">
                            <label>所在城市</label>
                            <select ref={input => this.selectCity = input} onChange={this.cityClick}>
                                <option value="北京">北京</option>
                                <option value="上海">上海</option>
                            </select>
                        </li>
                        <li className="adress-item">
                            <label>所在地区</label>
                            <select ref={input => this.selectRegion = input}>
                                {

                                    this.props.region.region.map((item, index) => <option key={index}>{item}</option>)
                                }

                            </select>
                        </li>
                        <li className="adress-item">
                            <label>详细地址</label>
                            <input type="text" onBlur={this.detailBlur} ref={input => this.detail = input}/>
                        </li>
                    </ul>
                    <div className="adress-btn" onClick={this.delClick}>删除地址</div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state, actions)
(ModifiAdress)