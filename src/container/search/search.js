import React, {Component} from 'react';
import './search.less';
import Header from "../../components/header/header";
import SearchInput from './compo/searchInput';
import HistoryList from "./compo/historyList";
import {fetchSearchInfos} from '../../api/search';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
class Search extends Component {
  constructor() {
    super();
    this.state = {
      historyList: [],
      searchGet: [],
      hotShow: true,
      historyShow: true,
      pageShow: true,
      searchShow: false,
      res: {}
    }
  }

  //保留历史记录 刷新仍在
  componentWillMount() {
    this._loadHistoryValues();
  }

  componentDidMount() {
    if (!this.props.blockInfos.length) {
      this.props.getBlockInfos();//获取blockInfos数据
    }
  }

  //确认输入值->增加历史记录条、获取后台数据->跳转路由
  handleSure = (value) => {
    this.setState({
      historyList: [value, ...this.state.historyList],
      historyShow: false
    }, () => this._saveHistoryValues(this.state.historyList));

    fetchSearchInfos(value).then(res => {
      this.setState({
        searchGet: [res, ...this.state.searchGet][0],
      }, () => {
        localStorage.setItem("searchGet", JSON.stringify(this.state.searchGet));
      });
      if (res.length > 0) {
        this.setState({
          pageShow: false,
          searchShow: true
        });
      } else {
        this.setState({
          pageShow: true,
          searchShow: false
        });
      }
      this.setState({res: res[0]});
    });

    let searchGet = localStorage.getItem('searchGet');
    if (searchGet) {
      searchGet = JSON.parse(searchGet);
    }
  };

  //删除选中历史记录条
  handleDelHis = (index) => {
    const historyList = this.state.historyList;
    historyList.splice(index, 1);
    this.setState({historyList});
    this._saveHistoryValues(historyList);
  };

  //清空历史
  handleEmpty = () => {
    localStorage.setItem("historyList", "");
    localStorage.setItem("searchGet", "");
    this.setState({
      value: "",
      historyList: localStorage.getItem('historyList')
    })
  };

  //本地存储查询值
  _saveHistoryValues = (historyList) => {
    localStorage.setItem("historyList", JSON.stringify(historyList.filter((item1, index1) => index1 < 5)));
  };

  //获取本地历史记录
  _loadHistoryValues = () => {
    const historyList = localStorage.getItem('historyList');
    historyList && this.setState({historyList: JSON.parse(historyList)});
  };

  render() {
    let historyList = localStorage.getItem('historyList');
    if (historyList) {
      historyList = JSON.parse(historyList);
    }

    let ary = ["橘子", "柚子", "酸奶", "瓜子", "老干妈", "三鲜水饺"];
    return (

      <div className="search">

        <Header>
          <SearchInput
            onSure={this.handleSure}
            searchGet={this.state.searchGet}
          />
        </Header>
        {
          this.state.pageShow ?
            <div>

              <div className="hotSearch">
                <p>热门搜索</p>
                <ul className="hotList">
                  {
                    ary.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={
                            {
                              pathname: "/blockDetail",
                              query: {foo: 'bar', boo: 'boz'},
                              state: {data: this.props.blockInfos.block.products[index]}
                            }
                          }
                        >
                          <span>{item}</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>

              </div>

              {
                this.state.historyShow && this.state.historyList.length > 0 && !this.state.searchShow ?
                  <div>
                    <div className="history">
                      <p>历史记录</p>
                      <HistoryList
                        historyList={this.state.historyList}
                        onDelHis={this.handleDelHis}
                      />
                    </div>

                    <span className="clearBtn" onClick={() => {
                      this.handleEmpty()
                    }}>清空历史</span>
                  </div> : null
              }

            </div>
            : null}

        {
          this.state.searchShow ?
            <div>
              <div className="search">
                <Header>
                  <SearchInput
                    onSure={this.handleSure}
                    searchGet={this.state.searchGet}
                  />
                </Header>


                {
                  this.state.searchGet.length > 0 ?
                    <ul className="items">
                      {
                        this.state.searchGet.map((item, index) => (
                          <li key={index} style={{width: this.props.changeW == 1 ? "50%" : "33.33%"}}>

                              <Link to={
                                {
                                  pathname: "/blockDetail",
                                  state: {data: item}
                                }
                              }
                                    className="proImg"
                                    style={{
                                      backgroundImage: `url(${item.proImg})`,
                                      backgroundSize: "contain"
                                    }}
                              ></Link>

                            <p className="proName">{item.proName}</p>
                            <i className="iconfont icon-jingxuan red"></i>
                            <p className="weiInfo">{item.weiInfo}</p>
                            <p className="red">￥{item.bPrice1}</p>
                            <span className="add"><i className="iconfont icon-iconjia"></i></span>
                          </li>
                        ))
                      }
                    </ul>
                    : "ssss"
                }


              </div>
            </div>

            :
            <div>
              {
                !this.state.historyShow ?
                  <div className="failSearch">
                    <div style={{marginTop: "5rem"}} className="hotSearch"><p className="unsee">喵~ 这是啥 T.T 你再搜搜~</p>
                    </div>
                    <span className="zai"><Link to="/market">点我逛嗨</Link></span>
                  </div>
                  : null
              }
            </div>
        }

        <div className="footer"></div>
      </div>
    )
  }
}
;


export default connect(
  state => state.home,
  actions
)(Search)