import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './menuNav.less';
export default class MenuNav extends Component {
  render() {
    return (
      <ul className="menuNav">
        <li>
          <Link to="/market">
            <div className="menuBg menu5"></div>
            <p>休闲零食</p>
          </Link>
        </li>
        <li>
          <Link to="/market">
            <div className="menuBg menu6"></div>
            <p>生活用品</p>
          </Link>
        </li>
        <li>
          <Link to="/market">
            <div className="menuBg menu7"></div>
            <p>方便速食</p>
          </Link>
        </li>
        <li>
          <Link to="/market">
            <div className="menuBg menu8"></div>
            <p>更多分类</p>
          </Link>
        </li>
      </ul>
    )
  }
}
