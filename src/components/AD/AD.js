/**
 * Created by Lily on 2017/11/26.
 */
import React, {Component} from 'react';
import Home from '../../container/home/home';
import {withRouter} from 'react-router-dom'
class AD extends Component {

    componentDidMount() {
        let ad = document.getElementById('ad');
        let timer = setTimeout(() => {
            ad.style.height = '100%';
            ad.style.width = '102%';
            ad.style.backgroundColor = 'rgba(0,0,0,.5)';
            ad.style.zIndex = 111;
            ad.style.top = '.5rem';
            ad.style.left = 0;
            ad.style.bottom = 0;
            ad.style.right = 0;
        }, 50);
        ad ? this.clear() : '';
    }

    disNone = () => {
        let ad = document.getElementById('shade');
        ad.style.display = 'none';
        clearTimeout(this.timer);
        this.props.history.push('/home')
    };
    clear = () => {
        setTimeout(() => {
            this.disNone();
        }, 3000);
    };

    render() {
        return (
            <div className="shade" id="shade">
                <div className="ad" id="ad">
                    <div className="out">
                        <i className="iconfont icon-x" onClick={
                            () => {
                                this.disNone();
                                this.props.history.push('/home')
                            }}></i>
                        <img src="../../../static/ads.png" alt="" className="img" id="img"/>
                    </div>
                </div>
                <Home/>
            </div>
        )
    }
}

export default withRouter(AD);
import './ad.less'

