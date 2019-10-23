import { combineReducers } from 'redux';
import changeLocale from './changeLocale';
import vehiclesReducer from './vehiclesReducer';
export default combineReducers({
 changeLocale,
vehiclesReducer
});