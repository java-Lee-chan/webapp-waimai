import {
  CHANGE_TAB
} from './actionTypes';

export const changeTab = ({ activeKey }) => ({type: CHANGE_TAB, data: { activeKey }});