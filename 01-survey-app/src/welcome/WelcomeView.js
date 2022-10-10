import React, { useState } from "react";
import { Paper, Grid, Typography, Button, Stepper, Step, StepLabel, StepContent, Divider, useMediaQuery, useTheme, Box } from "@mui/material";

import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CircularProgress } from "@mui/material";
import { Stage } from "@react-three/drei";
import RotateModel from "./RotateModel";
import { experimentalStyled as styled } from '@mui/material/styles';
import {
    Link as RouterLink
} from "react-router-dom";
import Link from '@mui/material/Link';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { NoToneMapping } from "three";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


function getGreeting(recipient) {
    if (recipient.recipient_name == "") {
        return "liebe*r Teilnehmer*in"
    } else if (recipient.recipient_type == "Abteilung") {
        return ("Abteilung " + recipient.recipient_name)
    } else if (recipient.recipient_type == "Stabsstelle") {
        return ("Stabsstelle " + recipient.recipient_name)
    } else {
        return recipient.recipient_name
    }
}




function WelcomeView(props) {


    const theme = useTheme();
    function getCanvasHeight(smallScreen) {
        if (smallScreen) {
            return ({ height: "60vh" })
        } else {
            return ({ height: "30vh" })
        }
    }

    const [infoView, setInfoView] = useState(false)

    function getButtonIcon(infoView) {
        if(infoView) {
            return (<KeyboardReturnIcon/>)
        } else {
            return (<InfoIcon />)
        }
    }

    return (
        <>
            <div style={{ width: "100%", height: "100%", position: "absolute", top: 0 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ width: "100%", height: "100%", textAlign: "left" }}>
                    <Grid item xs={0} md={6} lg={4}>
                        <div style={getCanvasHeight(useMediaQuery(theme.breakpoints.up('md')))}>
                            <Suspense fallback={<CircularProgress />}>
                                <Canvas camera={{ position: [0, 0, 250] }}>
                                    <RotateModel />
                                </Canvas>
                            </Suspense>
                        </div>

                    </Grid>
                    <Grid item xs={11} md={6} lg={5}>

                        <img src="logos/Logo_bar.png" style={{ width: "70%", maxHeight: { xs: 233 }, maxWidth: { xs: 350 } }} alt="Logo des Connected Urban Twin Projekts" />
                        <br />
                        <Typography variant="overline" sx={{ lineHeight: 1 }}>
                            Studie Modelle und Simulationen in digitalen Stadtzwillingen
                        </Typography>
                        <Typography variant="h4" mb={2}>
                            Herzlich Willkommen, {getGreeting(props.recipient)}!

                        </Typography>
                        {!infoView && <StepList recipient={props.recipient} />}
                        {infoView && <StudyInformation  />}

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                        <Button startIcon={getButtonIcon(infoView)} variant="contained" size="normal" color="white" sx={{ marginBottom: 5 }} onClick={() => {setInfoView(!infoView)}}>
                        {!infoView && "Mehr Informationen zur Studie" }
                        {infoView && "Zurück zur Übersicht" }
                        </Button>

                    </Grid>


                </Grid>
            </div>
            <div style={{ position: "fixed", bottom: 0, width: "100%", paddingBottom: 15, paddingTop: 15, backgroundColor: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.1)", textAlign: "center" }}>
                <Typography variant="caption">
                    © 2022 City Science Lab @ HafenCity Universität Hamburg | <a href="/datenschutz/Datenschutzerklärung_CUT Studie.pdf" target="_blank" style={{ textDecoration: "none", color: "#000000" }}>Datenschutzerklärung</a>
                </Typography>
            </div>
        </>

    );

}


function StepList(props) {
    function getCurrentStep() {
        if (props.recipient.recipient_survey_answers > 0) {
            return 2
        } else {
            return 1
        }
    }

    function handleCurrentStep(newStep, stepClick) {
        
        if (newStep == "survey" ) {
            setCurrentStep(1)
        } else if (newStep == "twin" && props.recipient.recipient_survey_answers > 0) {
            setCurrentStep(2)
        } else if (!stepClick) {
            setCurrentStep(newStep)
        }
        
    }

    const [currentStep, setCurrentStep] = React.useState(getCurrentStep())

    const steps = [
        {
            key: "lego",
            title: "Lego-Modell bauen und QR-Code scannen",
            description: "oder Code eingeben unter www.studie.cut.hcu-hamburg.de",
            action: <></>
        },
        {
            key: "survey",
            title: "Umfrage ausfüllen",
            description: "Dauer: ca. 5 Minuten",
            action: <>
                <Link to="/survey" component={RouterLink} style={{ textDecoration: 'none' }}>
                    <Button color="primary" variant="contained">Zur Umfrage</Button>
                </Link>
                {
                    props.recipient.recipient_survey_answers > 0 && <Button onClick={() => handleCurrentStep(2, false)}>Weiter zum Digitalen Zwilling</Button>
                }
            </>
        },
        {
            key: "twin",
            title: 'Beiträge schreiben im Digitalen Zwilling',
            description: "Welche Modelle und Simulationen würden Sie sich für die Zukunft wünschen? Zu welchem Zweck?",
            action: <>
                <Link to="/twin" component={RouterLink} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Zum digitalen Zwilling</Button>
                </Link>
                <Button onClick={() => handleCurrentStep(1, false)}>Zurück zur Umfrage</Button>
            </>
        },
        {
            key: "forward",
            title: "Weiterleiten",
            description: "Sprechen Sie gerne mit Ihren Kolleg*innen und geben das Paket an die jeweiligen Personen weiter",
            action: <></>
        },
    ]

    React.useEffect(() => {

        setCurrentStep(getCurrentStep())

    }, []);


    return (
        <>
            <Stepper activeStep={currentStep} orientation="vertical" >

                {
                    steps.map((step) => {
                        return (
                            <Step key={step.key} >
                                <StepLabel onClick={()=>{handleCurrentStep(step.key, true)}}>
                                    <Typography variant="h5">
                                        {step.title}
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body2">
                                        {step.description}
                                    </Typography> <br />
                                    {step.action}
                                </StepContent>
                            </Step>
                        )
                    })
                }

            </Stepper>

        </>
    )
}


function StudyInformation() {
    return (
        <>
        <Typography variant="body2">
            Diese Studie ist Teil der transformativen Forschung des City Science Labs der HafenCity Universität im Projekt "Connected Urban Twins". Ziel des Projekts ist die Erforschung und Erprobung von digitalen Stadtzwillingen für integrierte und nachhaltige Stadtentwicklung. Zweck der Studie ist es empirisch herauszufinden, welche digitalen (Simulations-)Modelle bereits heute Eingang in (stadt)raumrelevante Entscheidungen finden und welche Wünsche für zukünftige (Simulations-)Modelle vorhanden sind. Ergebnis der Studie ist ein erster Überblick über verschiedene bereits verwendete und gewünschte (Simulations-)modelle aus der Perspektive der Forschung.
        </Typography>
        <Typography variant="body2">
        Weitere Informationen zum Projekt und zum City Science Lab finden Sie auf der <a href="https://connectedurbantwins.de" target="_blank" style={{textDecoration: "none", color: "#388DE1"}}>Projekthomepage</a> und der <a href="https://citysciencelab.hamburg" target="_blank" style={{textDecoration: "none", color: "#388DE1"}}>Website des City Science Labs</a>. 
        </Typography>
        <Box
            component="img"
            sx={{
                width: 350,
                maxHeight: { xs: 250, md: 150 },
                maxWidth: { xs: 250, md: 350 },
                background: "rgba(0,0,0,0)",
            }}
            src="./logos/funders.jpg"
            mt={2}
        />
        </>

    )
}


export default WelcomeView;