import axios from 'axios';
import { HEAD_DATA } from './actionTypes';

export const getHeaderData = () => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: '/json/head.json'
    }).then((res) => {
      dispatch({ type: HEAD_DATA, obj: res.data });
    });
  }
}