import React from "react";
import { useCallback } from "react";
import { Grid, Paper } from "@mui/material";
import CloseButton from "../components/CloseButton";
import { config } from '../config';
import { Navigate, useNavigate } from 'react-router-dom';

import "./survey.css";
// import 'survey-react/survey.min.css';



import { Survey, StylesManager, Model } from "survey-react";
import surveyJson from './Survey.json';
import { AppContext } from "../App";

StylesManager.applyTheme("modern");

function SurveyView() {

  const [comments, loadComments, recipient, setSendAnonymous, loadRecipient] = React.useContext(AppContext);


  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  const navigate = useNavigate()


  const blanko = {
    "Datenschutz": ["ja"],
    "Berufsabschluss": "",
    "Dienststelle": "",
    "Dienstbezeichnung": "",
    "Diensttätigkeit": "",
    "Berufserfahrung": null,
    "System": [""],
    "System-Comment": "",
    "Raumrelevanz": "",
    "Modelliste": [
      {
        "Art-Comment": "",
        "Zweck-Comment": "",
        "Name": "",
        "Beschreibung": "",
        "Art": "",
        "Zweck": "",
        "Verwendung": "",
        "Verwendung-Comment": ""
      }],
    "Kontaktaufnahme": "",
    "question1": {
      "Name": "",
      "Mail": "",
      "Telefon": ""
    }
  }

  const alertResults = useCallback((sender) => {

    let results = Object.assign({}, blanko, sender.data)
    results = { ...results, survey_recipient: recipient.recipient_id };
    // alert(results);
    // console.log(results)
    fetch(config.api + "/add/survey_answer", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(results),
    })
      .then((response) => {
        response.json()
        loadRecipient(recipient.recipient_hash)
        navigate("/twin?success=true")

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);



  survey.onComplete.add(alertResults);

  var myCss = {
    question: {
      pageTitle: "sd-title title-new",
      questionTitle: "sv-question__title question-title-new"
    }
  };



  return (
    <>

      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{background: "#465166" }}>
        <Grid item xs={12} md={10} lg={8} m={{lg: 5, md: 2, sm: 1}} >
          <Paper elevation={4} sx={{ pl: 4, pr: 4, pb: {lg: 15, md: 5}, textAlign: "justify" }} >
            {/*<Button onClick={() => testAPI()}>Test abschicken</Button>*/}
            <Survey model={survey} css={myCss} />
          </Paper>
        </Grid>
      </Grid>
      <CloseButton color="primary" backgroundColor="#FFFFFF" />
    </>

  );

}

export default SurveyView;