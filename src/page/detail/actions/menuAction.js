import { GET_LIST_DATA, LEFT_CLICK } from './actionTypes';
import axios from 'axios';

export const getListData = () => async (dispatch) => {
  
  const res = await axios.get('/json/food.json');

  dispatch( { type: GET_LIST_DATA, obj: res.data });
}

export const itemClick = (obj) => ({ type: LEFT_CLICK, obj });