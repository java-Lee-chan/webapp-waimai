import { GET_LIST_DATA, LEFT_CLICK, ADD_SELECT_ITEM, MINUS_SELECT_ITEM } from '../actions/actionTypes';

const initState = {
  listData: {},
  currentLeftIndex: 0
}

const dealWithSelectItem = (state, action) => {
  const listData = state.listData;
  const currentLeftIndex = state.currentLeftIndex;
  const index = action.obj.index;
  // 找到外层，左边list列表
  const list = listData.food_spu_tags;
  // 通过列表找到左边item使用的数据，也就是点击的item数据
  const currentItem = list[currentLeftIndex];
  // 对当前点击这个item的chooseCount加一或减一
  if (action.type === ADD_SELECT_ITEM) {
    currentItem.spus[index].chooseCount ++;
  } else {
    currentItem.spus[index].chooseCount --;
  }

  const _listData = JSON.parse(JSON.stringify(listData));
  return {
    ...state,
    listData: _listData
  }
}

const itemClick = (state, action) => ({
  ...state,
  currentLeftIndex: action.obj.currentLeftIndex
});

const getListData = (state, action) => ({
  ...state,
  listData: action.obj.data
});

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_DATA:
      return getListData(state, action);
    case LEFT_CLICK:
      return itemClick(state, action);
    case ADD_SELECT_ITEM:
      return dealWithSelectItem(state, action);
    case MINUS_SELECT_ITEM:
      return dealWithSelectItem(state, action);
    default:
      return state;
  }
}

export default menuReducer;