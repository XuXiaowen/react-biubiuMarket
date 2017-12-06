import React, {Component} from 'react';
import './slider.less'
import ReactSwipe from 'react-swipe';
import {Link} from 'react-router-dom';
export default class Slider extends Component {
    constructor() {
        super();
        this.state = {index: 0};
    }

    render() {
        let swipeOptions = {
            continuous: true,
            auto: 2000,
            callback: (index) => {
                this.setState({index});
            }
        };
        return (
            <div className="carousel-wrapper">
                {
                    this.props.sliders.length > 0
                        ? <ReactSwipe className="carousel" swipeOptions={swipeOptions}>
                        {
                            this.props.sliders.map((item, index) => (
                                <div key={index}>
                                    <Link to="/goodsDetail"><img src={item}/>
                                    </Link>
                                </div>
                            ))
                        }
                    </ReactSwipe>
                        : <div>数据加载中</div>
                }
                <div className="dots">
                    {
                        this.props.sliders.map((item, index) => (
                            <span key={index} className={this.state.index == index ? "active" : ""}></span>
                        ))
                    }
                </div>
            </div>
        )
    }
}