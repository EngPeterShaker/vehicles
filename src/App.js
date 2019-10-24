import React from "react";
import { connect } from "react-redux";
import { LocalizeProvider  , withLocalize} from "react-localize-redux";
// import { withLocalize } from "react-localize-redux";

import logo from "./logo.svg";
import "./App.css";
import { simpleAction } from "./actions/simpleAction";
import VehiclesList from "./components/VehiclesList";
import NavBar from "./components/NavBar";

function App(props) {

  const simpleAction = event => {
    props.simpleAction();
  };

  props.initialize({
    languages: [
      { name: "English", code: "en" },
      { name: "French", code: "fr" }
    ],
    // translation: globalTranslations,
    options: { 'renderToStaticMarkup' : true }
  });
// }
console.log('props', props)

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
      <LocalizeProvider>
      <NavBar />
      <VehiclesList />
        </LocalizeProvider>
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
export default withLocalize(App);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
