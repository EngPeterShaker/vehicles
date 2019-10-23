import React from "react";
import { connect } from "react-redux";

import { Provider, updateIntl } from "react-intl-redux";
import { IntlProvider ,addLocaleData} from 'react-intl';
import PropTypes from 'prop-types';


import logo from "./logo.svg";
import "./App.css";
// import { simpleAction } from "./actions/simpleAction";
import NavBar from "./components/NavBar";
import VehiclesList from "./components/VehiclesList";
import languageObject from './translations';
import store from "./store";
import en from 'react-intl/locale-data/en';
import sw from 'react-intl/locale-data/sw';


addLocaleData(en);
addLocaleData(sw);

// import messages_sw from "./translations/sw.json";
// import messages_en from "./translations/en.json";

// const messages = {
//     'sw': messages_sw,
//     'en': messages_en
// };
// const language = navigator.language ? navigator.language.split(/[-_]/)[0] : 'en';  // language without region code



function App(props) {
  console.log('props', props)

  // const simpleAction = event => {
  //   props.simpleAction();
  // };

  return (
    <div className="App">
     <Provider store={store}>


        {/* <IntlProvider locale={language} defaultLocale={'es'}> */}
        {/* <IntlProvider locale={props.locale} messages={languageObject[props.locale]}> */}
            <NavBar />
           <VehiclesList />
           </Provider>
        {/* </IntlProvider> */}

      {/* <button onClick={() => simpleAction()}>Test redux action</button> */}
      {/* <pre>{JSON.stringify(props)}</pre> */}
    </div>
  );
}

// const mapStateToProps = state => ({ locale: state.localeReducer.locale });

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  // simpleAction: () => dispatch(simpleAction())
});

App.propTypes = {
  locale: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
