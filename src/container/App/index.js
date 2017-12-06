import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import Home from "../home/home";
import Cart from "../cart/cart";
import Settlement from "../settlement/settlement";
import Mine from "../mine/mine";
import Market from "../market/market";
import Tab from "../../components/tab/tab";
import GoodsDetail from '../goodsDetail/goodsDetail';
import './index.less';
import Affirm from "../affirmAdress/affirm";
import SignIn from "../signIn/signIn";
import ModifiAdress from "../modifiAdress/modifiAdress";
import AddAdress from "../addAdress/addAdress";
import Search from '../search/search';
import User from '../mine/user/user';
import changeUserName from '../mine/user/changeUserName/changeUserName';
import BlockDetail from '../blockDetail/blockDetail';
import AD from '../../components/AD/AD'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/home" exact component={Home}/>
          <Route path="/" component={AD}/>
          <Route path="/market" component={Market}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/settlement" component={Settlement}/>
          <Route path="/mine" component={Mine}/>
          <Route path="/affirm" component={Affirm}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/goodsDetail" component={GoodsDetail}/>
          <Route path="/modifiAdress" component={ModifiAdress}/>
          <Route path="/addAdress" component={AddAdress}/>
          <Route path="/search" component={Search}/>
          <Route path="/user" component={User}/>
          <Route path="/changeUserName" component={changeUserName}/>
          <Route path="/blockDetail" component={BlockDetail}/>
          <Tab/>
        </div>
      </Router>
    )
  }
}