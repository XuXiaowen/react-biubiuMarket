import React, {Component} from 'react';
import Header from '../../components/header/header';
import './blockDetail.less';
export default class BlockDetail extends Component {

  constructor() {
    super();
    this.state = {
      itemDetail: {},
      num: 0,
      colColor: "#c5c5c5",
      className: "iconfont icon-aixin",
      isShow: 'none'
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this._saveDetail(this.props.location.state.data);
    }
    this._loadDetail();
  }

  add = () => {
    this.setState({
      num: ++this.state.num
    })
  };

  sub = () => {
    if (this.state.num == 0) {
      this.setState({num: 0});
    } else {
      this.setState({
        num: --this.state.num
      })
    }
  };

  changeCol = () => {
    if (this.state.className == "iconfont icon-aixin") {
      this.setState({
        className: "iconfont icon-aixin1",
        colColor: "#ffd600"
      });
    } else {
      this.setState({
        className: "iconfont icon-aixin",
        colColor: "#c5c5c5"
      });
    }
  };


  _saveDetail = (itemDetail) => {
    localStorage.setItem("itemDetail", JSON.stringify(itemDetail));
  };

  _loadDetail = () => {
    let itemDetail = localStorage.getItem('itemDetail');
    if (itemDetail !== 'undefined' || itemDetail) {
      this.setState({itemDetail: JSON.parse(itemDetail)});
    }
  };

  render() {
    let {bPrice1, proImg, proName, weiInfo, bigImg} = this.state.itemDetail;
    return (
      <div className="item">
        <Header>
          <div>
            <div className="searchHeader">
              <div className="back" onClick={() => {
                this.props.history.go(-1);
              }}>
                <i className="iconfont icon-mjiantou-copy"/>
              </div>
              <div className="page-header">{proName}</div>
            </div>
          </div>

        </Header>

        <div className="detail">
          <div className="mainDetail">
            <div className="proImg"
                 style={{
                   backgroundImage: `url(${proImg})`,
                   backgroundSize: "100%"
                 }}>
            </div>
            <p className="proName">{proName}</p>
            <p className="bPrice1">￥{bPrice1}</p>
          </div>

          <div className="det">
            <div className="title">商品详情</div>
            <div className="line1">
              <span className="pp">品<span style={{visibility: "hidden"}}>噗噗</span>牌</span>
              <span className="pp2">爱鲜蜂</span>
            </div>
            <div className="line2">
              <span className="gg">产品规格</span>
              <span className="gg2">{weiInfo}</span>
            </div>
          </div>
        </div>

        <div className="det">
          <div className="title">图文详情</div>
          <div className="bigPic"
               style={{
                 backgroundImage: `url(${bigImg})`,
                 backgroundSize: "100%",
                 backgroundRepeat: "no-repeat"
               }}
          >
          </div>
          <div
            style={{
              backgroundImage: 'url("http://m.beequick.cn/static/bee/img/pages/productDetailDefault-eeed0ab8.jpg")',
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          >

          </div>
        </div>

        <div className="footer">
          <a className="col">
            <p>
              <i
                className={this.state.className}
                onClick={this.changeCol}
                style={{color:this.state.colColor}}
              ></i></p>
            <p
              onClick={this.changeCol}
              style={{color:this.state.colColor}}
            >收藏</p>
          </a>
          <div className="addGoods">
            <span>加入购物车: </span>
            <i className="iconfont icon-jianhao" onClick={this.sub}></i>
            <span>{this.state.num}</span>
            <i className="iconfont icon-jiahao" onClick={this.add}></i>
          </div>
          <div className="addCart">
            <div className="cartBtn">
              <div className="goodsNum"
                   style={{
                     display: this.state.num == 0 ? "none" : "block"
                   }}
              >{this.state.num}</div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
