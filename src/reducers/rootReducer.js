import { combineReducers } from 'redux';
import { LocalizeProvider, localizeReducer } from "react-localize-redux";

import simpleReducer from './simpleReducer';
import vehiclesReducer from './vehiclesReducer';
export default combineReducers({
  localize: localizeReducer,
 simpleReducer,
vehiclesReducer
});