import React, {Component} from 'react';
import {HashRouter as Router, withRouter} from 'react-router-dom';

class SearchInput extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      historyList: [],
      cancelBtnShow: false,
      searchGet: [],
      url: ''
    }
  }

  //自动获取焦点
  componentDidMount() {
    this.input.focus();
  }

  //输入框变化
  handleChange = (event) => {
    this.setState({
      cancelBtnShow: true,
      value: event.target.value
    })
  };

  //取消输入
  handleCancle = () => {
    this.setState({
      value: ""
    })
  };

  //点击确认
  handleSure = (event) => {
    if (this.props.onSure) {
      let {value} = this.state;
      if (value.replace(/\s+/, "").length > 0) {//此处需完善正则匹配
        this.props.onSure(value);
      }
      if (event.keyCode === 13) {
        this.props.onSure(value);
      }
    }
  };

  handleEnter = (event) =>{
    event.keyCode==13?this.handleSure(event):"";
  };

  render() {
    let {value, cancelBtnShow} = this.state;
    return (
      <div className="searchHeader">

        <div className="back" onClick={() => {
          this.props.history.go(-1)
        }}>
          <i className="iconfont icon-mjiantou-copy"/>
        </div>

        <div className="searchInp">
          <i className="iconfont icon-sousuo1"/>

          <input
            type="text"
            placeholder="请输入商品关键字"
            ref={(input) => this.input = input}
            onChange={this.handleChange}
            value={value}
            onKeyUp={this.handleEnter}
          />

          {
            cancelBtnShow ?
              <i
                className="iconfont icon-quxiao"
                onClick={this.handleCancle}
              /> : ""
          }
        </div>

        <span
          className="sure"
          onClick={this.handleSure}
          onKeyUp={this.handleSure}
        >确认
          </span>

      </div>
    )
  }
}
export default withRouter(SearchInput);