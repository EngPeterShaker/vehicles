
// const axios = import('axios')
import axios from "axios";

const baseURL = 'http://localhost:3001/'

const fetch_vehicles = (data, secretSauce)=> {
  return {
    type: 'FETCH_VEHICLES',
    payload: {
      vehicles : data
    }
  };
}
const fetch_customers = (data, secretSauce)=> {
  return {
    type: 'FETCH_CUSTOMERS',
    payload: {
      customers : data,
      // vehiclesList : data.map(item)
    }
  };
}

 export const fetching = (route) => {
  return function(dispatch) {
    return axios.get(`${baseURL}${route}`)
  .then(res => callDispatch(dispatch , res, route),
      // (error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
    );
  };
}

const callDispatch = (dispatch, res, fn_name, auxData={}) => {
  const FN = eval(`fetch_${fn_name}`);
  dispatch(FN(res.data, auxData));
};