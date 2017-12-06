import React, {Component} from 'react';
export default class HistoryCode extends Component {

  handleDelHis = () => {
    this.props.onDelHis && this.props.onDelHis();
  };

  render() {
    let {historyCode} = this.props;
    return (
      <li className="historyCode">
        <span>{historyCode}</span>
        <i
          className="iconfont icon-guanbi"
          onClick={this.handleDelHis}
        />
      </li>
    )
  }
}
