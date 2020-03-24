import { GET_LIST_DATA, LEFT_CLICK, ADD_SELECT_ITEM, MINUS_SELECT_ITEM } from './actionTypes';
import axios from 'axios';

export const getListData = () => async (dispatch) => {
  
  const res = await axios.get('/json/food.json');

  dispatch( { type: GET_LIST_DATA, obj: res.data });
}

export const itemClick = (obj) => ({ type: LEFT_CLICK, obj });

export const addSelectItem = (obj) => ({ type: ADD_SELECT_ITEM, obj });

export const minusSelectItem = (obj) => ({ type: MINUS_SELECT_ITEM, obj });