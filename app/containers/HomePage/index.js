import React, { useEffect } from 'react';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { useDispatch, useSelector } from 'react-redux';
import { useLifecycleSelector } from '@kai23/reduxutils';
import Location from 'components/Location';

import actions from './core/actions';
import reducer from './core/reducer';
import saga from './core/saga';

import './assets/styles.scss';

const key = 'home';

function HomePage() {
  const dispatch = useDispatch();
  const getLocations = useLifecycleSelector(key, 'getLocations');
  const locations = useSelector((store) => store[key].locations);

  console.log('locations', JSON.stringify(locations, null, 2));

  useEffect(() => {
    dispatch(actions.getLocations());
  }, []);

  return (
    <div className="home">
      {getLocations.loading && (<p>Chargement des locations...</p>)}
      {getLocations.success && (
        locations.map((l, i) => (
          <Location
            key={i}
            date={l.date}
            description={l.description}
            images={l.images}
            link={l.link}
            price={parseInt(l.price, 10)}
            rooms={parseInt(l.rooms, 10)}
            size={parseInt(l.size, 10)}
            title={l.title}
          />
        ))
      )}
    </div>
  );
}

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(withReducer, withSaga)(HomePage);
