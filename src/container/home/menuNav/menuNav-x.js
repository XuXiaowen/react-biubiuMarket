import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './menuNav.less';
export default class MenuNav extends Component {
    render() {
        return (
            <ul className="menuNav">
                {
                    this.props.menuInfos.map((item, index) => (
                        <li key={index}>
                            <Link to="/market">
                                <div style={item.style} className="menuBg"></div>
                                <p>{item.title}</p>
                            </Link>
                        </li>
                    ))
                }

            </ul>
        )
    }
}
