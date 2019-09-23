import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import request from 'utils/request';
import actions from './actions';

import actionTypes from './actionTypes';
import mock from './mock.json';


/**
 * login
 * @param {object} data
 * @yield {Object}
 */
export function* getLocations() {
  const requestURL = `${process.env.API_URL}/api/v1/locations`;
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
