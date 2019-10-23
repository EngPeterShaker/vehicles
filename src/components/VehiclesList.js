import React , {useEffect} from 'react'
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import {fetching  } from "../actions/fetchVehicles";
import MediaCard from "./MediaCard";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  100: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const VehiclesList = (props) => {
  const classes = useStyles();

  const {vehiclesReducer = {}} = props;
  const {vehicles =[]} = vehiclesReducer;
  console.log('props', props)


  useEffect(() => {
  getVehicles();
  }, [])
  // }


  const getVehicles = () => {
    props.fetchVehicles()
  }

console.log('vehicles', vehicles)
  return (
        <Grid container className={classes.root} spacing={2}>
      {vehicles && vehicles.map(item =>{
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <MediaCard data = {item} />
          </Grid>
        )
      })
      }
    </Grid>
  )
}


const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  fetchVehicles: () => dispatch(fetching('vehicles'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehiclesList);
