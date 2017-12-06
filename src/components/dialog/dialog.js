import React,{Component} from 'react';
import './dialog.less'
export default class Dialog extends Component{
    handleClick=(cb)=>{
        this.props.dialog.hideDialog();
        cb&&cb();
    };
     autoHide=(cb)=>{
        setTimeout(()=>{this.handleClick(cb)},this.props.dialog.time)
     }
    render(){
        let {hideDialog,btnShow,message,time,cb}=this.props.dialog;
        return (
            <div className="dialog-wrap">
                <div className="dialog-cover"></div>
                <div className="dialog">
                    <p className="message">{message}</p>
                    {btnShow?(<button className="btn" onClick={()=>{this.handleClick(cb)}}>确定</button>):this.autoHide(cb)}

                </div>
            </div>
        )
    }
}