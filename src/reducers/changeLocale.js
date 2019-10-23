export default (state = {}, action) => {
  switch (action.type) {
   case 'CHANGE_LOCALE':
    return {
     result: action.payload
    }
   default:
    return state
  }
 }