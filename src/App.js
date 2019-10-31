import React ,{useState} from "react";
import { connect } from "react-redux";
import { LocalizeProvider  , withLocalize} from "react-localize-redux";
// import translations from "./translations";
import logo from "./logo.svg";
import "./App.css";
import { simpleAction } from "./actions/simpleAction";
import VehiclesList from "./components/VehiclesList";
import NavBar from "./components/NavBar";
import Button from "@material-ui/core/Button";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Fullscreen from 'react-full-screen';
import configureStore from "./store";

function App(props) {

  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false)
const fullscreenBtn ={
  bottom: '3em',
  float: 'right',
 right: '3em',
 backgroundColor: 'white',
 position: 'fixed',
 height: '3em',
}


  return (
    <div className="App" data-test="AppComponent">

      <LocalizeProvider >
      <NavBar />
      <Fullscreen
          enabled={isFullscreenEnabled}
          onChange={isFullscreenEnabled => setIsFullscreenEnabled(isFullscreenEnabled)}
          style={{'overflow': 'overlay'}}
        >
      <VehiclesList />
      </Fullscreen>
      <Button
      variant="outlined"
      color="secondary"
      // classes={{fullscreen-btn}}
      // className="fullscreen-btn"
      style={fullscreenBtn}
      onClick={() => setIsFullscreenEnabled(true)}>
        <FullscreenIcon />
        Go FullScreen
      </Button>
        </LocalizeProvider>
    </div>
  );
}


export default withLocalize(App);
