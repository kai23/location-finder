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
  const settingsRaw = localStorage.getItem('settings');
  if (!settingsRaw) {
    yield put(actions.onGetLocationsFailed({
      responseJSON: {
        type: 'no-settings',
      },
    }));
  } else {
    const settings = JSON.parse(settingsRaw);
    const paramsArray = Object.keys(settings).map((key) => `${key}=${settings[key]}`);
    const params = paramsArray.join('&');

    const requestURL = `/v1/locations?${params}`;
    try {
      const result = yield call(request, requestURL);
      yield put(actions.onGetLocationsSuccess(result));
    } catch (err) {
      yield put(actions.onGetLocationsFailed(err));
    }
  }
}

// Root saga
export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_LOCATIONS_LOADING, getLocations);
}
