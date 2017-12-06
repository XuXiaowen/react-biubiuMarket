import React,{Component} from 'react';
import './itemDetail.less';
export default class ItemDetail extends Component{
  render(){
    return (
      <div>
      <div className="itemDetail">
        <div className="limitBuy">限时抢购</div>
        <div className="leftImg"
             style={{
               backgroundImage:"url('http://img01.bqstatic.com/upload/goods/201/708/0116/20170801160414_186496.jpg@355w_355h_90Q')",
               backgroundSize:"100%",
               backgroundRepeat: "no-repeat"
             }}

        ></div>
        <div className="detail">
          <p>美国科克兰盐烤扁桃仁</p>
          <p>1130g</p>
          <p>
            <span>￥80/</span>
            <span>原价：￥147</span>
          </p>
          <span className="buyNow">立即购买</span>
        </div>
      </div>

      <div className="itemDetail">
        <div className="limitBuy">限时抢购</div>
        <div className="leftImg"
             style={{
               backgroundImage:"url('http://img01.bqstatic.com/upload/goods/201/708/0116/20170801160352_411762.jpg@355w_355h_90Q')",
               backgroundSize:"100%",
               backgroundRepeat: "no-repeat"
             }}

        ></div>
        <div className="detail">
          <p>美国科克兰混合坚果</p>
          <p>1130g</p>
          <p>
            <span>￥99/</span>
            <span>原价：￥200</span>
          </p>
          <span className="buyNow">立即购买</span>
        </div>
      </div>
      </div>


    )
  }
}
