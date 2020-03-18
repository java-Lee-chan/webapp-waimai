import axios from 'axios';
import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from './actionTypes';


export const changeTab = (obj) => ({ type: CHANGE_TAB, obj});


export const getFilterData = () => async (dispatch) => {
  const res = await axios.get('/json/filter.json');
  dispatch({ type: GET_FILTER_DATA, obj: res.data });
}

export const changeFilter = (obj) => (dispatch) => {
  dispatch({ type: CHANGE_FILTER, obj });
  dispatch({ type: CHANGE_TAB, 
    obj: {
      closePanel: true
    }
  });
}