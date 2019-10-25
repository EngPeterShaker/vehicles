import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withLocalize, Translate } from "react-localize-redux";
import en from "../translations/en.translations.json";
import fr from "../translations/fr.translations.json";
import { fetching } from "../actions/fetchVehicles";
import MediaCard from "./MediaCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  100: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const VehiclesList = props => {
  const classes = useStyles();

  const {
    vehiclesReducer = {},
    languages,
    activeLanguage,
    addTranslationForLanguage,
    setActiveLanguage
  } = props;
  const { vehicles = [], customers = null } = vehiclesReducer;
  let vehiclesList = [];
  console.log("customers", customers);

  useEffect(() => {
    getCustomers();
    addTranslationForLanguage(en, "en");
    addTranslationForLanguage(fr, "fr");
  }, []);
  // }

  const getCustomers = () => {
    // props.fetchVehicles();
    props.fetchCustomers();
  };

  if (customers && customers.length > 0) {
    vehiclesList = customers.reduce(
      (acc, item) => [...acc, ...item.vehicles],
      []
    );
  }
  console.log("vehiclesList", vehiclesList);
  return (
    <Grid container className={classes.root} spacing={2}>
      {/* <Translate id="greeting" /> */}
      {/* <button onClick={() => setActiveLanguage("fr")}>change lang</button> */}

      {vehiclesList &&
        vehiclesList.map(item => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.vin}>
              <MediaCard data={item} />
            </Grid>
          );
        })}
    </Grid>
  );
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  // fetchVehicles: () => dispatch(fetching("vehicles")),
  fetchCustomers: () => dispatch(fetching("customers"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(VehiclesList));
