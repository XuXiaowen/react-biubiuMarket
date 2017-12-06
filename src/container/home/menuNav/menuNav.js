import React, {Component} from 'react';
import './menuNav.less';
import {Link} from 'react-router-dom';
export  default class MenuNav extends Component {
  render() {

    return (
      <ul className="menuNav">
        <li>
            <Link
              to={
                {
                  pathname: "/goodsDetail/fruit",
                }
              }
            >
            <div className="menuBg menu1"></div>
            <p>水果特惠趴</p>
          </Link>
        </li>
        <li>
            <div className="menuBg menu2"></div>
            <p>每日必抢</p>
        </li>
        <li>
            <div className="menuBg menu3"></div>
            <p>新人专享</p>
        </li>
        <li>
            <div className="menuBg menu4"></div>
            <p>大转盘</p>
        </li>
      </ul>
    )
  }
}
