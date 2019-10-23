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
   default:
    return state
  }
 }