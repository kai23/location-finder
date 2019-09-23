import { setActions } from '@kai23/reduxutils';
import actionTypes from './actionTypes';

const actionParams = {
  GET_LOCATIONS_SUCCESS: ['result'],
};

export default setActions(actionTypes, actionParams);
