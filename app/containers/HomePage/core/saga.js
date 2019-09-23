import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import request from 'utils/request';
import actions from './actions';

import actionTypes from './actionTypes';
// import mock from './mock.json';


/**
 * login
 * @param {object} data
 * @yield {Object}
 */
export function* getLocations() {
  const requestURL = '/v1/locations?maxPrice=750&postalCode=31000&surfaceMin=45&roomNumber=2&isMeuble=false';
  try {
    const result = yield call(request, requestURL);
    yield put(actions.onGetLocationsSuccess(result));
  } catch (err) {
    yield put(actions.onGetLocationsFailed(err));
  }
}

// Root saga
export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_LOCATIONS_LOADING, getLocations);
}
