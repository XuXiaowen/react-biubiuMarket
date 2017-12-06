import * as types from '../action-types';
let initState = {
  sliders: [],
  brands: {brand1: [], brand2: []},
  menuInfos: {menuInfo1: [], menuInfo2: []},
  blockInfos: {
    block: {products:[]},
    block1: {products:[]},
    block2: {products:[]},
    block3: {products:[]},
    block4: {products:[]},
    block5: {products:[]},
    block6: {products:[]},
    block7: {products:[]}
  }
};
export default function (state = initState, action) {
  switch (action.type) {
    case types.FETCH_SLIDERS:
      return {
        ...state,
        sliders: action.payload.sliders
      };
    case types.FETCH_BRANDS:
      return {
        ...state,
        brands: action.payload.brands
      };
    case types.FETCH_MENUINFOS:
      return {
        ...state,
        menuInfos: action.payload.menuInfos
      };
    case types.FETCH_BLOCKINFOS:
      return {
        ...state,
        blockInfos: action.payload.blockInfos
      };
    default:
      return state;
  }
}