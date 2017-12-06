import React,{Component} from 'react';
import './user.less';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import  header from '../../../components/header/header';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../../../store/actions/userInformation';
class User extends Component {
    constructor(){
        super();
        this.state={
            sex:'男',
        }
    }
    componentDidMount(){
            this.props.getUserInformation() ;
        console.log(2222222,this.props)
    }
    static defaultProps={
            open:false,
};
   chooseM=(event)=>{
       let _this=this;
       setTimeout(function () {
           _this.setState({sex:'男'});
       },300);
       ReactDOM.unmountComponentAtNode(this.node)
   } ;
    chooseW=(event)=>{
        let _this=this;
        setTimeout(function () {
            _this.setState({sex:'女'});
        },300);
        ReactDOM.unmountComponentAtNode(this.node)
    } ;
    cancel=()=>{
        ReactDOM.unmountComponentAtNode(this.node)
    };
   handleClick=()=>{
       if ( !this.props.open) { // 从无到有
           //console.log(this.props,'312313');
           this.node = document.createElement('div'); // 创建 DOM
           this.node.className = 'ReactModal'; // 给上 ClassName
           document.getElementsByTagName('body')[0].appendChild(this.node) ;// 给 body 加上刚才的 带有 className 的 div
           // 这个时候创建了 render的目的地。
          // const style = require('./modal.less'); // css 样式
           let modal = (
               <div className="container">
                   <div className="mask">
                   </div>
                   <div className="sex">
                       <div onClick={()=>{this.chooseM()}}>男</div>
                       <div onClick={()=>{this.chooseW()}}>女</div>
                       <div className="cancel"   onClick={()=>{this.cancel()}}>
                           取消
                       </div>
                   </div>
               </div>
           );
           // 这个时候创建了 Modal 的虚拟 Dom
           let allClass = document.getElementsByClassName('ReactModal');
           ReactDOM.render(modal, allClass[allClass.length - 1]); // 之所以这么写，是因为能重复打开Modal，因为每一次打开Modal，都会建立一个div
           // 将 Modal 成功 render 到目的地
       }
       if (this.props.open ) { // 从有到无
           ReactDOM.unmountComponentAtNode(this.node) // 调用 react-dom unmountComponentAtNode方法，将Modal解除。
           // 或者可以写下面的方法，将整个创建的div删除，这样多次打开就不会有很多个div残留在body中，但是并不是很正规的做法。
           // document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('ReactModal')[0])
       }
   };
    render() {
            return (
                <div className="gerenziliao">
                    <header>
                        <div className="page-header user-page">
                            <i className= "icon-jiantouxia"  onClick={history.go(1) }></i>
                            个人资料
                        </div>
                    </header>
                    <div className="user-detail" >
                        <ul className="ul1">
                            <li className="touxiang">
                                <span>头像</span>
                                <div className="user-picture">
                                    <img className="con" src={this.props.photoUrl} alt=""/>
                                </div>
                            </li>
                            <Link to="/changeUserName">
                                <li className="nicheng">
                                    <span>昵称</span>
                                    <span>{this.props.nickName}</span>
                                </li>
                            </Link>
                            <li  onClick={()=>{this.handleClick()}}>
                                <span>性别</span>
                                <span>
                                    {this.state.sex}
                                </span>
                            </li>
                            <li><span>年龄</span><span>{this.props.age}</span></li>
                        </ul>
                    </div>
                    <div className="member">
                        <ul className="ul2">
                            <li><span>会员等级</span><span>V1会员</span></li>
                            <li><span>会员中心</span><span>查看特权</span></li>
                            <li><span>积分</span><span>0积分</span></li>
                        </ul>
                    </div>

                </div>
            )
        }
}
export default connect(
    state => state.userInformation,
    actions
)(User)