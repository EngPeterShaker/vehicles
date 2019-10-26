
// const axios = import('axios')
import axios from "axios";
import * as actionTypes from '../actions/actionTypes';

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
    type: actionTypes.FETCH_CUSTOMERS,
    payload: {
      customers : data,
      vehiclesList : data.reduce(
        (acc, item) => {
          const list = item.vehicles.map(i => {
            i.owner = item.name
            return i;
          })
          return [...acc, ...list ]},
        []
      )
    }
  };
}

const statusChanged = (data)=>{
  return {
    type: actionTypes.STATUS_CHANGED,
    payload: {
      vehiclesList : data.reduce(
      (acc, item) => {
        const list = item.vehicles.map(i => {
          i.owner = item.name
          return i;
        })
        return [...acc, ...list ]},
      []
    )
  }
  }
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

export const changeStatus =(val)=>{
  return function (dispatch) {
    return axios.patch(`${baseURL}${val}`)
    .then(res => dispatch(statusChanged(res)))

  }
}