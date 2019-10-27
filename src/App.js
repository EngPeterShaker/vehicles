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


  // const simpleAction = event => {
  //   props.simpleAction();
  // };

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
      onClick={() => setIsFullscreenEnabled(true)}>
        <FullscreenIcon />
        Go FullScreen
      </Button>
        </LocalizeProvider>
    </div>
  );
}
// const mapStateToProps = state => ({
//   ...state
// });
// const mapDispatchToProps = dispatch => ({
//   simpleAction: () => dispatch(simpleAction())
// });
// export default withLocalize(App);

export default withLocalize(App);
