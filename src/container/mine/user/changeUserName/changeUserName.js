import React,{Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import  header from '../../../../components/header/header';
import  ReactDOM from 'react-dom';
export default class changeUserName extends Component {

    componentDidMount() {
        this.input.focus();
        //
        this.node = document.createElement('div');
        this.node.className = 'ReactModal';
        document.getElementsByTagName('body')[0].appendChild(this.node) ;
        let modal = (
            <div className="bottom-modal">

            </div>
        );
        let allClass = document.getElementsByClassName('ReactModal');
        ReactDOM.render(modal, allClass[allClass.length - 1]);
    }
    componentWillUnmount(){
        ReactDOM.unmountComponentAtNode(this.node)
    }
    render() {
        return (
            <div>
                <header>
                    <div className="page-header change-page">
                       <i className= "icon-jiantouxia"></i>
                        <span>修改昵称</span>
                        <span className="queding">确定</span>
                    </div>
                </header>
                <div className="changeName-detail">
                    <input type="text" placeholder="输入昵称" ref={(input)=>(this.input=input)}/>

                </div>
                <div className="tishi">2-16个字符只能输入中英文或数字</div>
            </div>
        )
    }
}
import './changeUserName.less'