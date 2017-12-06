import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './main.less';
export default class Main extends Component{
    render(){
        return (
            <div className="main">
                <div className="quickBg"></div>
                <ul className="sub_1">
                    <Link to="/market"></Link>
                    <Link to="/market"></Link>
                </ul>
            </div>
        )
    }
}
