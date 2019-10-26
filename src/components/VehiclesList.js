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
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  100: {
    height: "100%",
    width: "100%"
  },
  control: {
    padding: theme.spacing(2)
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
  const [values, setValues] = useState({
    status: "",
    name: "hai"
  });

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

  setInterval(() => {
    // call Action to change db
    const customersLength = customers? customers.length :0;
    const vehiclesLength = list? list.length :0;
    // getRandomCustomer()
    if(customers && list){

      // const rndCust = getRndInteger(customers.length)
      // const CustomerVehiclesLength =  customers[rndCust]? customers[rndCust]['vehicles'].length:null;
      // const rndvehicle = CustomerVehiclesLength ? getRndInteger(CustomerVehiclesLength) : null;
      // if (!rndvehicle){
        // const randomVehicle = customers[rndCust]['vehicles'][rndvehicle];
        // const changedCustomer = customers[rndCust]['vehicles'][rndvehicle]
        // props.changeStatus(rndCust , rndvehicle ,changedVehicle )
        // return ;
      // }else {
        // const randomVehicle = list[randomIndex]
        // const changedVehicle  = {...randomVehicle , onlineStatus: !randomVehicle.onlineStatus}
        const randomIndex = getRndInteger(list.length-1)
        const newList = list ;
        newList[randomIndex] = {...list[randomIndex], onlineStatus: !list[randomIndex]['onlineStatus']};
        setVehiclesList([])
        setVehiclesList(newList)
      // }
    }
  }, 20*1000);


  const applyFilterMenu = async() => {
    const listFilteredByOwner = personName.length >0  ? list.filter(i => personName.indexOf(i.owner) > -1) :   list
    const listFilteredByStatus =  filterStatus !=='null' ? list.filter(i =>  i.onlineStatus === filterStatus):  list;
    const result = await _.intersection(listFilteredByOwner, listFilteredByStatus);
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

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => toggleFilterMenu()}
      >
        Filter Vehicles
      </Button>
      <Grid container className={classes.root}>
        {/* <Translate id="greeting" /> */}
        <Dialog
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
            {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">
                Select Owner:
              </InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                placeholder={"hello"}
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
                  <em>Placeholder</em>
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

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Status
              </InputLabel>
              <Select
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
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>Online</MenuItem>
                <MenuItem value={false}>Offline</MenuItem>
              </Select>
            </FormControl>
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
    </>
  );
};

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
