import {
  setInitialState,
  setLoadingState,
  setSuccessState,
  setFailureState,
} from '@kai23/reduxutils';


import { LOCATION_CHANGE } from 'connected-react-router';
import actionTypes from './actionTypes';

const data = {
  locations: [],
};
export const initialState = setInitialState(actionTypes, data);

function homeReducer(state = initialState, action) {
  switch (action.type) {
    // ////////////
    // GET_USERS
    // ////////////
    case actionTypes.GET_LOCATIONS_LOADING:
      return setLoadingState(state, 'getLocations');

    case actionTypes.GET_LOCATIONS_SUCCESS:
      return setSuccessState(state, 'getLocations', { locations: action.result });

    case actionTypes.GET_LOCATIONS_FAILED:
      return setFailureState(state, 'getLocations', action.error.responseJSON);

    case LOCATION_CHANGE:
      return { ...initialState };

    default:
      return state;
  }
}

export default homeReducer;
