import React from "react";
import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
import { simpleAction } from "./actions/simpleAction";
import VehiclesList from "./components/VehiclesList";

function App(props) {

  const simpleAction = event => {
    props.simpleAction();
  };

  return (
    <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <VehiclesList />
      {/* <button onClick={() => simpleAction()}>Test redux action</button> */}
      {/* <pre>{JSON.stringify(props)}</pre> */}
    </div>
  );
}
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
