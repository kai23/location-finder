import { setActionTypes } from '@kai23/reduxutils';

const prefixes = ['GET_LOCATIONS'];

const actionTypes = setActionTypes(prefixes, 'home', 'location-finder');

export default actionTypes;
