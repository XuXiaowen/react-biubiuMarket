import React, {Component} from 'react';
import HistoryCode from "./historyCode";

export default class HistoryList extends Component {

  handleDelHis = (index) => {
    if (this.props.onDelHis) {
      this.props.onDelHis(index);
    }
  };

  render() {
    let {historyList}=this.props;
    return (
      <ul className="hotList">
        {
          historyList&&
          historyList.map((item, index) => (
            <HistoryCode
              historyCode={item}
              key={index}
              onDelHis={this.handleDelHis}
            />
          ))
        }
      </ul>
    )
  }
}
