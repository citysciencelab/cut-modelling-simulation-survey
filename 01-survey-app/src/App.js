import './App.css';
import { Routes, Route, useSearchParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SurveyView from './survey/SurveyView';
import Twin from './3dmodel/TwinView';
import WelcomeView from './welcome/WelcomeView';
import { useState, useEffect, createContext } from 'react';
import { config } from './config';

import AccessBackdrop from './components/AccessBackdrop';
import TwinTutorial from './3dmodel/tutorial/TwinTutorial';

import CenturyGothic from './fonts/Century Gothic.ttf'

const theme = createTheme({
  palette: {
    primary: {
      main: "#465166",
    },
    secondary: {
      main: '#A3C4FF',
    },
    info: {
      main: "#FFAD33",
    },
    trafficSensor: {
      main: "#434343",
    },
    white: {
      main: "#FFFFFF"
    },
    grey: {
      main: "#d3d3d3"
    }
  },
  typography: {
    fontFamily: [
      'Century Gothic',
      'Didact Gothic',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Century Gothic';
          font-style: normal;
          font-display: swap;
          src: local('CenturyGothic'), local('Century Gothic'), url(${CenturyGothic}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});


export const AppContext = createContext(null)

function App() {

  let [searchParams, setSearchParams] = useSearchParams();

  const [recipient, setRecipient] = useState({
    recipient_id: null,
    recipient_name: "",
    recipient_type: "",
    recipient_institution: "",
    recipient_superordinate_department: "",
    sendAnonymous: false
  })


  const [comments, setComments] = useState(null)
  const [tutorialActive, setTutorialActive] = useState(true)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  // Load data from the backend
  useEffect(() => {

    //loadRecipient("")


  }, []);


  function loadComments(category, recipient_hash = "") {

    fetch(config.api + "/comments" + "?c=" + category + "&h=" + recipient_hash)
      .then((response) => {

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(
        (response) => {

          setComments(response);

        },
        (error) => {

          setError(error);
        }
      )
  }


  function loadRecipient(hash) {
    //Specify a default recipient
    let recipient_hash = hash

    //Override if any other hash is provided
    if (searchParams.get("h") !== null) {
      recipient_hash = searchParams.get("h")
    }

    //Load the specific recipient based on the hash in the url
    if (recipient_hash != "") {
      fetch(config.api + "/recipient/" + recipient_hash)
        .then((response) => {

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json();
        })
        .then(
          (response) => {
            setIsLoaded(true);
            setRecipient({ ...response, sendAnonymous: false });

          },
          (error) => {
            setIsLoaded(false);
            setError(error);
          }
        ).then(
          loadComments("none", recipient_hash)
        )
    }
  }



  function addComment(comment) {
    setComments([comment, ...comments])
  }

  function setSendAnonymous(anonymous) {
    setRecipient({ ...recipient, sendAnonymous: anonymous });
  }

  function handleTutorialActive (active) {
    setTutorialActive(active)
  }



  return (
    <div className="App">

      <AppContext.Provider value={[comments, loadComments, recipient, setSendAnonymous, loadRecipient]}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<WelcomeView recipient={recipient} />} />
            {isLoaded &&
              <>
                <Route path="survey" element={<SurveyView recipient={recipient} />} />
                <Route path="twin" element={
                  <>
                  <Twin recipient={recipient} comments={comments} onHandleTutorialActive={handleTutorialActive}/>
                  </>
                } />
              </>

            }
          </Routes>

        </ThemeProvider>
      </AppContext.Provider>




    </div>
  );
}

export default App;
