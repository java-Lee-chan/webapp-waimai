import { GET_LIST_DATA } from './actionTypes';
import axios from 'axios';

export const getListData = (obj = {}) => async (dispatch, getState) => {

  let url = '/json/list.json';
  if (obj.filterData || getState().contentListReducer.filterData) {
    url = '/json/listparams.json';
  }
  console.log(111);
  const res = await axios.get(url);

  dispatch({
    type: GET_LIST_DATA,
    filterData: obj.filterData,
    toFirstPage: obj.toFirstPage,
    obj: res.data
  });
}