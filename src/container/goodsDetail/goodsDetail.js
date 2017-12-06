import React, {Component} from 'react';
import Header from '../../components/header/header';
import './goodsDetail.less'
import ItemDetail from "./itemDetail/itemDetail";
import './itemDetail/itemDetail.less';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';

class GoodsDetail extends Component {
  componentDidMount() {
    if (!this.props.blockInfos.length) {
      this.props.getBlockInfos();//获取blockInfos数据
    }
  }

  render() {

    //let {}=this.props.blockInfos.block1.products;


    return (
      this.props.location.pathname == '/goodsDetail/fruit' ?

        <div>

          <Header>
            <div>
              <div className="searchHeader">
                <div className="back" onClick={() => {
                  this.props.history.go(-1);
                }}>
                  <i className="iconfont icon-mjiantou-copy"/>
                </div>
                <div className="page-header">水果界最有人气的果子</div>
              </div>
            </div>
          </Header>

          <div className="goodsDetail">

            <div className="adv"
                 style={{
                   backgroundImage: 'url("http://img01.bqstatic.com/upload/activity/theme_header_1507529139_22004_0.jpg@90Q")',
                   backgroundSize: "100%",
                   backgroundRepeat: "no-repeat"
                 }}
            >
            </div>

            <div
              className="limitImg"
              style={{
                backgroundImage: 'url("http://img01.bqstatic.com/upload/activity/theme_header_1506097859_22004_1.jpg@90Q")',
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                paddingBottom:'6%'
              }}
            >
            </div>

            <ul className="items"
                style={{
                  backgroundColor: "#cb1a37",
                }}
            >
              {
                this.props.blockInfos.block1.products.filter((item1, index1) => index1 < 5).map((item, index) => (
                  <li key={index} className="itemDetail"
                      style={{
                        borderColor: '#cb1a37'
                      }}
                  >
                    <div className="limitBuy">限时抢购</div>
                    <div className="leftImg"
                         style={{
                           backgroundImage: `url(${item.proImg})`,
                           backgroundSize: "100%"
                         }}

                    >
                    </div>
                    <div className="detail">
                      <p>{item.proName}</p>
                      <p>{item.weiInfo}</p>
                      <p>
                        <span className="price1">￥{item.bPrice1}/</span>
                        <span>原价:￥{item.bPrice2}</span>
                      </p>
                      <span className="buyNow"
                            style={{
                              backgroundColor: '#cb1a37'
                            }}
                      >立即购买</span>
                    </div>
                  </li>
                ))
              }
            </ul>

            <div
              className="ruleImg"
              style={{
                backgroundImage: 'url("http://img01.bqstatic.com/upload/activity/theme_header_1506098134_22004_5.jpg@90Q")',
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                paddingBottom:"6%"
              }}
            >

            </div>
            <ul className="rules"
                style={{
                  backgroundColor: "#db4244",

                }}
            >
              <li>本次活动仅限北京用户参加</li>
              <li>活动仅当月有效</li>
            </ul>
          </div>
        </div>
        :
        <div>
          <Header>
            <div>
              <div className="searchHeader">
                <div className="back" onClick={() => {
                  this.props.history.go(-1);
                }}>
                  <i className="iconfont icon-mjiantou-copy"/>
                </div>
                <div className="page-header">美国进口坚果-科克兰</div>
              </div>
            </div>
          </Header>
          <div className="goodsDetail">
            <div className="adv"></div>
            <div className="limitImg"></div>
            <ItemDetail/>
            <div className="ruleImg"></div>
            <ul className="rules">
              <li>1、本次活动仅限北京用户参加</li>
            </ul>
          </div>
        </div>
    );
  }
}
export default connect(
  state => state.home,
  actions
)(GoodsDetail)
