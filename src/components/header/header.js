import React,{Component} from 'react';
import './header.less'
export default class Header extends Component{
    render(){
        return (
            <div className="header">
                {this.props.children}
            </div>
        )
    }
}