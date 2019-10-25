import React from "react";
import { connect } from "react-redux";
import { LocalizeProvider  , withLocalize} from "react-localize-redux";
// import translations from "./translations";
import logo from "./logo.svg";
import "./App.css";
import { simpleAction } from "./actions/simpleAction";
import VehiclesList from "./components/VehiclesList";
import NavBar from "./components/NavBar";

function App(props) {

  const simpleAction = event => {
    props.simpleAction();
  };

  // props.initialize({
  //   languages: [
  //     { name: "English", code: "en" },
  //     { name: "French", code: "fr" }
  //   ],
  //   // translation: globalTranslations,
  //   translation: translations,
  //       options: {
  //         renderToStaticMarkup : false,
  //         renderInnerHtml: true,
  //         defaultLanguage: "en"
  //       }
  // });
// }

  return (
    <div className="App">

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
// export default withLocalize(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(App));
