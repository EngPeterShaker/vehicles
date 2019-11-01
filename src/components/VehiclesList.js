import React, { useEffect, useState, forwardRef, useRef } from "react";
import { connect } from "react-redux";
import { withLocalize, Translate } from "react-localize-redux";
import en from "../translations/en.translations.json";
import fr from "../translations/fr.translations.json";
import { fetching , changeStatus } from "../actions/fetchVehicles";
import MediaCard from "./MediaCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import _ from 'lodash';
import useInterval from "../HOOKS/useInterval";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import '../styles/VehiclesList.scss';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  100: {
    height: "100%",
    width: "100%"
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '5em'
  },
  control: {
    padding: theme.spacing(2)
  },
  formControl1:{
      margin: theme.spacing(1),
      minWidth: 120,
      width:'4em',
    display:'block'
  },
  formControl2:{
    margin: theme.spacing(1),
    minWidth: 120,
    width:'100%',
  display:'block'
}
}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ITEM_HEIGHT = 500;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxHeight: "90%",
      width: 250
    }
  }
};
function getStyles(name, personName, theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium
    // personName.indexOf(name) === -1
    //   ? theme.typography.fontWeightRegular
    //   : theme.typography.fontWeightMedium,
  };
}

const VehiclesList = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [vehiclesList, setVehiclesList] = useState(null);
  const [personName, setPersonName] = useState([]);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(50);
  // useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);
  // const [values, setValues] = useState({
  //   status: "",
  //   name: "hai"
  // });
  const [toastState, setToastState] = useState({
    isToastOpen: false,
    vertical: 'bottom',
    horizontal: 'left',
    changedVehicle:{}
  });
  const { vertical, horizontal, isToastOpen , changedVehicle} = toastState;

  const {
    vehiclesReducer = {},
    languages,
    activeLanguage,
    addTranslationForLanguage,
    setActiveLanguage
  } = props;
  const {
    vehicles = [],
    customers = null,
    vehiclesList: list
  } = vehiclesReducer;
  // let vehiclesList = [];

  const getCustomers = () => {
    // props.fetchVehicles();
    props.fetchCustomers();
  };
  const toggleToast = (changedVehicle) => {
    setToastState({ ...toastState, isToastOpen: !isToastOpen  , changedVehicle});
  };

  useEffect(() => {
    getCustomers();
    addTranslationForLanguage(en, "en");
    addTranslationForLanguage(fr, "fr");
  }, []);
  /////////////// empty dependency array to be invoked once //////////////////////
  useEffect(() => {
    if (list && list.length > 0) {
      setVehiclesList(list);
    }
  }, [list]);

  const toggleFilterMenu = () => {
    setOpen(!open);
  };

  const getRndInteger = (max , min =0)=> Math.floor(Math.random() * (max - min + 1) ) + min;


  useInterval(() => {
        const randomIndex = getRndInteger(list.length-1)
        const newList = list ;
        newList[randomIndex] = {...list[randomIndex], onlineStatus: !list[randomIndex]['onlineStatus']};
        setVehiclesList(newList)
        toggleToast(newList[randomIndex])
  }, 60 *1000);



  const applyFilterMenu = async() => {
    const listFilteredByOwner = personName.length >0  ? list.filter(i => personName.indexOf(i.owner) > -1) :   list
    const listFilteredByStatus =  filterStatus == 'null' || !filterStatus ?  list:  list.filter(i =>  i.onlineStatus === filterStatus);
    console.log('filterStatus', filterStatus)
    console.log('filterStatus', personName  )
    console.log('listFilteredByStatus' , listFilteredByStatus)
    console.log('listFilteredByOwner', listFilteredByOwner)
    const result =  _.intersection(listFilteredByOwner, listFilteredByStatus);
    console.log(' _.intersection(listFilteredByOwner, listFilteredByStatus);' ,  _.intersection(listFilteredByOwner, listFilteredByStatus))
    console.log('result', result)
    setVehiclesList(result);
    toggleFilterMenu();
  };

  const handleChange = event => {
    setPersonName(event.target.value);
  };

  const handleStatus = event => {
    const val = event.target.value;
    setFilterStatus(val);
  };

  const removeAllFilters = e => {
    setVehiclesList(list);
    // console.log(e)
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => toggleFilterMenu()}
      >
        Filter Vehicles
        <FilterListIcon />
      </Button>
      <Grid container className={classes.root} data-test="VehiclesList">
        {/* <Translate id="greeting" /> */}
        <Dialog
        className="filters__dialog--design"
        fullScreen={fullScreen}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => toggleFilterMenu()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Filter Vehicles"}
          </DialogTitle>
          <DialogContent>
      <Grid>

            {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}

                <FormControl variant="outlined"
                className={classes.formControl1}>
  {/* <FormControlLabel label="Small" /> */}
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Status
                  </InputLabel>
                  <Select
                style={{width: '100%'}}
                    value={filterStatus}
                    onChange={handleStatus}
                    // onChange={()=> setFilterStatus(event.target.value)}
                    labelWidth={labelWidth}
                    inputProps={{
                      name: "age",
                      id: "outlined-age-simple"
                    }}
                  >
                    <MenuItem value="null">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value={true}>Online</MenuItem>
                    <MenuItem value={false}>Offline</MenuItem>
                  </Select>
                </FormControl>
            <FormControl className={classes.formControl2}>
              <InputLabel htmlFor="select-multiple-chip">
                Select Owner:
              </InputLabel>
              <Select
                multiple
                value={personName}
                style={{width: '80%'}}
                onChange={handleChange}
                placeholder={"None"}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em> {`List of owners`}</em>
                </MenuItem>
                {customers &&
                  customers.map(customer => (
                    <MenuItem
                      key={customer.name}
                      value={customer.name}
                      // style={getStyles(customer.name, theme)}
                    >
                      {customer.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="secondary"
            onClick={() => removeAllFilters()}
             className={classes.button}>
        {`Remove Filters`}
      </Button>
      </Grid>

            </DialogContent>

          <DialogActions>
            <Button onClick={toggleFilterMenu} color="primary">
              Cancel
            </Button>
            <Button onClick={() => applyFilterMenu()} color="primary">
              Filter
            </Button>
          </DialogActions>
        </Dialog>

        {vehiclesList &&
          vehiclesList.map(item => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.vin}>
                <MediaCard data={item} />
              </Grid>
            );
          })}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={isToastOpen}
        onClose={toggleToast}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">
        {/* <WarningIcon /> */}
         {`${changedVehicle.name} is now ${changedVehicle.onlineStatus ? 'online' : 'offline'}`} </span>}
      />
    </>
  );
};

VehiclesList.propTypes ={
  vehiclesReducer : PropTypes.object,
  addTranslationForLanguage :PropTypes.func,
}
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  fetchCustomers: () => dispatch(fetching("customers")),
  changeStatus: () => dispatch(changeStatus("customers"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(VehiclesList));
