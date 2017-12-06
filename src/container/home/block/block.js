import React, {Component} from 'react';
import './block.less';
import {Link} from 'react-router-dom';
export default class Block extends Component {


  render() {
    return (
      <div className="block">
        <div className="blockHeader">
          <div className="blockTitle"><h3>{this.props.blockInfos.blockTitle}</h3></div>
          <span className="more">
            <Link to="/market">
              更多
            <i className="iconfont icon-icon1"></i>
            </Link>

            </span>
        </div>
        <div className="banner">
          <Link to="/market"
                style={{
                  backgroundImage: `url(${this.props.blockInfos.banner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain"
                }}>
          </Link>
        </div>
        <ul className="items">
          {
            this.props.blockInfos.products.filter((item1, index1) => index1 < 3).map((item, index) => (
                <li key={index}>
                  <Link
                    to={
                      {
                        pathname: "/blockDetail",
                        query: {foo: 'bar', boo: 'boz'},
                        state: {data: item}
                      }
                    }
                  >

                    <div
                      className="proImg"
                      style={{
                        backgroundImage: `url(${item.proImg})`,
                        backgroundSize: "contain"
                      }}
                    ></div>
                    <p className="proName">{item.proName}</p>
                    <i className="iconfont icon-jingxuan red"></i>
                    <p className="weiInfo">{item.weiInfo}</p>
                    <p className="red">￥{item.bPrice1}</p>

                  </Link>
                </li>
              )
            )
          }
        </ul>
      </div>
    )
  }
}