// import axios from 'axios';
import t from '../types';
// import { request } from '../../util/request';

const setInfo = (name) => (dispatch) => {
  dispatch({
    type: t.SET_NAME,
    payload: name,
  });
};

export default setInfo;
