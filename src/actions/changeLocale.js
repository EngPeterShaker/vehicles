import * as actionTypes from '../actions/actionTypes';


// export  const  changeLocale = () => dispatch => {
//   dispatch({
//    type: 'SIMPLE_ACTION',
//    payload: {
//      'locale': 'sw',
//    }
//   })
//  }


const initialState = {
  // 'vehicles' : [],
  locale: 'en'
}

export default (state = initialState, {type , payload}) => {
  switch (type) {
   case actionTypes.CHANGE_LOCALE:
    return {
      ...state , ...payload
    //  result: action.payload
    }
   default:
    return state
  }
 }