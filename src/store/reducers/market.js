/**
 * Created by Lily on 2017/11/21.
 */
import * as types from '../action-types'
let initState = {
    typenames: '',
    typeid: 0,//类别
    goods: [
        {
            goodsid: '',
            subtypename: '',
            subtypeid: 0,//子类
            name: '',//姓名
            img: '',//图片地址
            price: 0,//价格
            unit: '',
            count: 0,
            total: 0,
            isShow: false,
            salecount: 0
        }
    ]
};
export default function (state = initState, action) {
    switch (action.type) {
        case types.FETCH_MARKET:
            return {...action.payload};
        case types.FETCH_GOODS:
            return {...action.payload};
        case types.ERR_MARKET:
            return {
                ...state,
                goods: [
                    {
                        goodsid: '',
                        subtypename: '',
                        subtypeid: 0,//子类
                        name: '',//姓名
                        img: '../../../static/product_default.png',//图片地址
                        price: 0,//价格
                        unit: '',
                        count: 0,
                        total: 0,
                        isShow: false,
                        salecount: 0
                    }
                ]
            };
        default:
            return state;
    }
}