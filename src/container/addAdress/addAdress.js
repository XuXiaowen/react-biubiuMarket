import React, {Component} from 'react';
import Header from "../../components/header/header";
import {Link} from 'react-router-dom'
import './addAdress.less'
import {connect} from 'react-redux'
import actions from '../../store/actions/adress';
import Dialog from "../../components/dialog/dialog";


 class AddAdress extends Component {
    constructor() {
        super();
        this.state = {
            isChecked: true,
            isShow:false,
        }
    }

    handleClick = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    };
    componentDidMount() {
        this.props.getCityRegion('北京');
    }
    //城市不能为空，获取城市下的地区
    cityClick = (e) => {
        //验证城市不能为空
        console.log(e.target.value,111111111111);
        if(e.target.value=='请选择'){
            this.message='城市不能为空，请选择城市';
            this.setState({
                ...this.state,
                isShow:true,
            })
        }

        //获取城市下的地区
        let value = e.target.value;
        this.props.getCityRegion(value);
    };
    //验证收货人
    nameBlur=()=>{
        if(this.username.value.length==0){
            this.message='收货人不能为空';
            this.setState({
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
                 isShow:true,
             });
             return;
         }else if(!reg.test(this.telephone.value)){
             this.message='手机号格式不正确';
             this.setState({
                 isShow:true,
             });
             return;
         }
     }
     hideDialog=()=>{
         this.setState({
             isShow:false
         })
     };
     addAdress=()=>{

         let receiverName=this.username.value;
         let receiverPhone= this.telephone.value;
         let region=this.selectRegion.value;
         let adress=this.detail.value;
         let city=this.selectCity.value;
         if(receiverName.length==0){
             this.message='收货人不能为空';
             this.setState({
                 isShow:true,
             });
             return;
         }

         let reg=/^1(3|8|5|7)\d{9}$/;
         if(receiverPhone.length==0){
             this.message='手机号不能为空';
             this.setState({
                 isShow:true,
             });
             return;
         }else if(!reg.test(receiverPhone)){
             this.message='手机号格式不正确';
             this.setState({
                 isShow:true,
             });
             return;
         }
         if(adress==0){
             this.message='地址不能为空';
             this.setState({
                 isShow:true,
             });
             return;
         }
         let sex=this.state.isChecked?1:0;
         console.log(this.state.isChecked,'yyyyyyyyyyyyyyyyy');
         let userId=JSON.parse(localStorage.getItem('userInfo')).user.userId;
         let receiverInfo={receiverName,city,receiverPhone,region,adress,sex};
         let receiver={userId,receiverInfo}
         //console.log(receiver);
         this.props.addReceiver(receiver);

     }
    render() {
        let dialog={
            hideDialog:this.hideDialog,
            btnShow:false,
            message:this.message,
            time:1500,
            cb:null
        };
        let isChecked = this.state.isChecked;
        return (
            <div>
                {this.state.isShow?<Dialog dialog={dialog}/>:null}
                <Header>
                    <div className="page-header adress-header">
                        <Link to="/affirm">
                            <i className="iconfont icon-mjiantou-copy"></i>
                        </Link>
                        增加地址
                    </div>
                </Header>
                <div className="content-panel">
                    <ul className="adress-list">
                        <li className="adress-item">
                            <label>联系人</label>
                            <input type="text"
                                   placeholder="收货人姓名"
                                   onBlur={this.nameBlur}
                                   ref={input => this.username = input} />
                        </li>
                        <li className="adress-item">
                            <div className="item-icon">
                                <div className="item-box">
                                    {
                                        this.state.isChecked?
                                            <i className="iconfont icon-xuanze"></i>:
                                            <i className="default-font"></i>
                                    }

                                    <span onClick={this.handleClick}>先生</span>
                                </div>
                                <div className="item-box">
                                    {
                                        this.state.isChecked?
                                            <i className="default-font"></i>:
                                            <i className="iconfont icon-xuanze"></i>
                                    }
                                    <span onClick={this.handleClick}>女士</span>
                                </div>
                            </div>
                        </li>
                        <li className="adress-item">
                            <label>手机号码</label>
                            <input type="text"
                                   placeholder="收货人电话"
                                   onBlur={this.teleBlur}
                                   ref={input => this.telephone = input}/>
                        </li>
                        <li className="adress-item">
                            <label>所在城市</label>
                            <select ref={input => this.selectCity = input} onChange={this.cityClick}>
                              {/*  <option >请选择</option>*/}
                                <option value="北京">北京</option>
                                <option value="上海">上海</option>
                            </select>
                        </li>
                        <li className="adress-item">
                            <label>所在地区</label>
                            <select ref={input => this.selectRegion = input}>
                               {/* <option >请选择</option>*/}
                                {

                                    this.props.region.region.map((item, index) => <option key={index}>{item}</option>)
                                }

                            </select>
                        </li>
                        <li className="adress-item">
                            <label>详细地址</label>
                            <input type="text"
                                   placeholder="请输入详细地址"
                                   onBlur={this.adressBlur}
                                   ref={input => this.detail = input}/>
                        </li>
                    </ul>
                    <div className="adress-btn" onClick={this.addAdress}>保存</div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => state, actions)
(AddAdress)