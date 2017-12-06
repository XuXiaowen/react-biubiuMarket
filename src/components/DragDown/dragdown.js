/**
 * Created by Lily on 2017/11/20.
 */
import React, {Component} from 'react';
import actionsMar from '../../store/actions/market'

export default class DragDown extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        let oList = document.getElementsByTagName('li');
        oList[0].className = 'side-item active';
    }

    getActive = (e) => {
        let clsName = 'side-item';
        let oList = document.getElementsByTagName('li');
        for (let i = 0; i < oList.length; i++) {
            if (oList[i] !== e.target) {
                oList[i].className = clsName;
            } else {
                oList[i].className = clsName + ' active';
            }
        }
    };

    render() {
        return (
            <div className="mar-sidebar" id="sidebar">
                <ul className="side-list" id="list">
                    {
                        this.props.menu.map((item, index) => {
                            return (
                                <li className="side-item" onClick={(e) => {
                                    this.getActive(e);
                                    this.props.getMarket(index);
                                    this.props.changeInd(index);
                                }} key={index}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>)
    }
}
import './dragdown.less'
