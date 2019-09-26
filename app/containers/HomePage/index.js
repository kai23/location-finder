import React, { useEffect } from 'react';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLifecycleSelector } from '@kai23/reduxutils';
import { push } from 'connected-react-router';
import Location from 'components/Location';
import Loader from 'react-loader-spinner';
import { FaSlidersH } from 'react-icons/fa';

import actions from './core/actions';
import reducer from './core/reducer';
import saga from './core/saga';

import './assets/styles.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const key = 'home';

function HomePage() {
  const dispatch = useDispatch();
  const getLocations = useLifecycleSelector(key, 'getLocations');
  const locations = useSelector((store) => store[key].locations);

  useEffect(() => {
    dispatch(actions.getLocations());
  }, []);

  return (
    <div className="home">
      {getLocations.loading && (
        <div className="loader">
          <Loader
            type="Puff"
            color="#DC143C"
            height={100}
            width={100}
          />
        </div>
      )}
      <div className="locations">
        <h5>
          {`${locations.length} résultats`}
        </h5>
        <div className="results-filters">
          <div className="results">
            Trié
            <span className="results-length"> par date</span>
          </div>
          <div
            className="filters"
            role="button"
            tabIndex="0"
            onKeyDown={() => dispatch(push('/filters'))}
            onClick={() => dispatch(push('/filters'))}
          >
            <FaSlidersH className="filters-icon" />
            <span className="filters-title">Filtres</span>
          </div>
        </div>
        {getLocations.error && getLocations.error.type && getLocations.error.type === 'no-settings'
          ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Merci de saisir tous les filtres pour lancer la recherche</AlertTitle>
            </Alert>
          )
          : null}
        {getLocations.success ? locations.map((l) => (
          <Location
            key={l.link}
            date={l.date}
            description={l.description}
            images={l.images}
            link={l.link}
            price={parseInt(l.price, 10)}
            rooms={parseInt(l.rooms, 10)}
            size={parseInt(l.size, 10)}
            title={l.title}
            type={l.type}
          />
        )) : null}
      </div>
    </div>
  );
}

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(withReducer, withSaga)(HomePage);
