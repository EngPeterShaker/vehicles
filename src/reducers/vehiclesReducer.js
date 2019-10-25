import * as actionTypes from '../actions/actionTypes';

const initialState = {
  'vehicles' : []
}

export default (state = initialState, {type , payload}) => {
  switch (type) {
   case actionTypes.FETCH_VEHICLES:
    return {
      ...state , ...payload
    //  result: action.payload
    }
    case actionTypes.FETCH_CUSTOMERS:
    return {
      ...state , ...payload
    }
   default:
    return state
  }
 }