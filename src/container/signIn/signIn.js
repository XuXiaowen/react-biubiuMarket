import React, {Component} from 'react';
import Header from "../../components/header/header";
import {Link} from 'react-router-dom';
import './signIn.less';
import Dialog from "../../components/dialog/dialog";
import {connect} from 'react-redux';
import actions from '../../store/actions/signIn';
class SignIn extends Component {
    constructor(){
        super();
        this.state={
            isShow:false,
            spanShow:true,
            num:10
        }
    }
    hideDialog=()=>{
        this.setState({
            isShow:false
        })
    };
    btnClick=()=>{
        let reg=/^1(3|8|5|7)\d{9}$/;
        let userPhone=this.telephone.value;
        let authCode=this.authCode.value;
        let reg2=/^\d{4}$/;
        if(userPhone.length===0){
            this.message='请输入手机号';
            this.setState({
                isShow:true
            })
        }else if(!reg.test(userPhone)){
            this.message='手机号格式不正确，请重试';
            this.setState({
                isShow:true
            })
        }else if(authCode.length===0){
            this.message='请输入验证码';
            this.setState({
                isShow:true
            })
        }else if(!reg2.test(authCode)){
            this.message='验证码不正确';
            this.setState({
                isShow:true
            })
        }else{
            this.props.signIn({userPhone,authCode});
        }
    };
    spanClick=()=>{
        let reg=/^1(3|8|5|7)\d{9}$/;
        let phone=this.telephone.value;
        if(phone.length===0){
            this.message='请输入手机号';
            this.setState({
                isShow:true
            })
        }else if(!reg.test(phone)){
            this.message='手机号格式不正确，请重试';
            this.setState({
                isShow:true
            })
        }else {
            this.message='验证码发送成功';
            this.setState({
                isShow:true,
                spanShow:false
            });
            this.timer=setInterval(()=>{
                    let num=this.state.num-1;
                this.setState({
                    num:num
                },function(){
                    if(this.state.num===0){
                        clearInterval(this.timer);
                        this.setState({
                            spanShow:true
                        });
                    }
                })

            },1000);
        }
    }
    componentDidMount(){

    }
    render() {
        let dialog={
            hideDialog:this.hideDialog,
            btnShow:false,
            message:this.message,
            time:1000,
            cb:null
        };
        return (
            <div>
                {this.state.isShow?<Dialog dialog={dialog}/>:null}
                <Header>
                    <div className="page-header sign-header">
                        <Link to="/home">
                            <i className="iconfont icon-mjiantou-copy"></i>
                        </Link>
                        验证手机
                    </div>
                </Header>
                <div className="sign-panel">
                    <div className="sign-img">
                        <p className="sign-word">为了方便您及时查询订单信息，需要验证您的手机号为查询帐号</p>
                    </div>
                    <div className="sign-info">
                        <div className="input-wrap">
                            <input type="text" placeholder="手机号码" ref={input=>this.telephone=input}/>

                            {this.state.spanShow?(<span onClick={this.spanClick}>获取验证码</span>):
                                (<span style={{background:'#ddd'}}>{this.state.num}秒后重新发送</span>)
                            }



                        </div>
                        <div className="input-wrap">
                            <input type="text" placeholder="短信验证码" ref={input=>this.authCode=input}/>
                        </div>
                    </div>
                    <div className="sign-btn" onClick={this.btnClick}>确&nbsp;定</div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>state.signInfo,actions
)(SignIn)