import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './brand.less'
export default class Brand extends Component {
    render() {
        return (
            <ul className="brand" style={{marginTop:this.props.changeW==1?"-1rem":""}}>
                {
                    this.props.brands.map((item, index) => (
                        <li key={index} style={{width:this.props.changeW==1?"50%":"33.33%"}}>
                            <Link to="/goodsDetail"
                                  style={{backgroundImage: `url(${item})`,paddingBottom:this.props.changeW==1?"40%":"85%"

                                  }}></Link>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
