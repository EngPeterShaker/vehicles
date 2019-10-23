import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import vehiclesReducer from './vehiclesReducer';
export default combineReducers({
 simpleReducer,
vehiclesReducer
});