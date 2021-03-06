import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from '../actions/actionTypes';
import { TABKEY } from '../config';

const tabs = {};
tabs[TABKEY.cate] = {
  key: TABKEY.cate,
  text: '全部品类',
  obj: {}
}
tabs[TABKEY.type] = {
  key: TABKEY.type,
  text: '综合排序',
  obj: {}
}
tabs[TABKEY.filter] = {
  key: TABKEY.filter,
  text: '筛选',
  obj: {}
}
// 初始化 state
const initState = {
  tabs,
  activeKey: TABKEY.cate,
  filterData: {},
  closePanel: true
};

const changeTab = (state, action) => {
  return {
    ...state,
    activeKey: action.obj.activeKey,
    closePanel: action.obj.closePanel
  }
}

const getFilterData = (state, action) => {
  return {
    ...state,
    filterData: action.obj.data
  }
}

const changeFilter = (state, action) => {
  let _tabs = JSON.parse(JSON.stringify(state.tabs));
  const { item, key } = action.obj;
  _tabs[key] = {
    key,
    text: item.name,
    obj: item
  }
  return {
    ...state,
    tabs: _tabs
  };
}

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return changeTab(state, action);
    case GET_FILTER_DATA:
      return getFilterData(state, action);
    case CHANGE_FILTER:
      return changeFilter(state, action);
    default:
      return state
  }
}

export default headerReducer;