import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './home.less'
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
import Slider from "./slider/slider";
import MenuNav from "./menuNav/menuNav";
import MenuNav2 from "./menuNav/menuNav2";
import Brand from "./brand/brand";
import Main from "./main/main";
import Block from "./block/block";
import Header from "../../components/header/header";
import  "../../../static/1.png";

class Home extends Component {

    componentDidMount() {
        if (this.props.sliders.length == 0) {

            this.props.getSliders();//获取轮播图
        }
        if (!this.props.brands.length) {
            this.props.getBrands();//获取brands图

        }
        if (!this.props.menuInfos.length) {
            this.props.getMenuInfos();//获取menuInfos数据
        }
        if (!this.props.blockInfos.length) {
            this.props.getBlockInfos();//获取blockInfos数据
        }
        let personInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (personInfo) {
            if (personInfo.user.addressList.length == 0) {
                this.personAdress = '';
            } else {

                let n=parseFloat(localStorage.getItem('index'));
                if(!n){
                    localStorage.setItem('index',0)
                }
                n=parseFloat(localStorage.getItem('index'));
                this.personAdress = personInfo.user.addressList[n].adress;
            }
            this.code = personInfo.code;
        } else {
            this.personAdress = '';
            this.code = 1;
        }
    }

    render() {
        return (
            <div className="home">
                <Header>
                    <div className="page-header">
                        <Link to={this.code ? "/signIn" : "/affirm"}>{this.personAdress}</Link>
                        <Link to="/search"><i className="iconfont icon-sousuo ser"></i></Link>
                    </div>
                </Header>
                {<div ref="content" className="main-content">
                    <Slider sliders={this.props.sliders}/>
                    <MenuNav menuInfos={this.props.menuInfos.menuInfo1}/>
                    <Brand brands={this.props.brands.brand1}/>
                    <Main/>
                    <MenuNav2 menuInfos={this.props.menuInfos.menuInfo2}/>
                    <Brand brands={this.props.brands.brand2} changeW="1"/>
                    <Block blockInfos={this.props.blockInfos.block1}/>
                    <Block blockInfos={this.props.blockInfos.block2}/>
                    <Block blockInfos={this.props.blockInfos.block3}/>
                    <Block blockInfos={this.props.blockInfos.block4}/>
                    <Block blockInfos={this.props.blockInfos.block5}/>
                    <Block blockInfos={this.props.blockInfos.block6}/>
                    <Block blockInfos={this.props.blockInfos.block7}/>
                </div>}
            </div>
        )
    }
}


export default connect(
    state => state.home,
    actions
)(Home)