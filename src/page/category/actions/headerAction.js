import axios from 'axios';
import { CHANGE_TAB, GET_FILTER_DATA } from './actionTypes';


export const changeTab = (obj) => ({ type: CHANGE_TAB, obj});


export const getFilterData = () => async (dispatch) => {
  const res = await axios.get('/json/filter.json');
  dispatch({ type: GET_FILTER_DATA, obj: res.data });
}