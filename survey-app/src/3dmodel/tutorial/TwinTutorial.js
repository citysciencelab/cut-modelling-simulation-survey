import { useState } from "react";
import { Backdrop, MobileStepper, Grid, Button, Card, useTheme, Typography, CardMedia, CardContent, CardActions, Box, keyframes, IconButton } from "@mui/material"
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';

export default function TwinTutorial(props) {

    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function handleTutorialActive(active) {
        props.onHandleTutorialActive(active)
    }

    const [tutorialSteps, setTutorialSteps] = useState([
        {
            title: "Tutorial",
            text: "Diese kurze Tutorial zeigt Ihnen die verschiedenen Funktionen des Digitalen Zwillings und erklärt die Oberfläche.",
            image: "./tutorial/einfuehrung.jpg",
            actions: <>
                <Button onClick={() => { setActiveStep(1) }} variant="contained" size="large" sx={{ margin: 1 }}>Tutorial starten</Button><br/>
                <Button onClick={() => { handleTutorialActive(false) }} variant="contained" size="small" color="white" sx={{ margin: 1, boxShadow: 0 }}>Tutorial überspringen</Button>
            </>
        },
        {
            title: "Ansicht",
            text: 'Mit einem Klick auf Ansicht wechseln Sie zwischen Standardansicht, Vogelperspektive und Fußgängeransicht.',
            image: "./tutorial/ansicht.jpg",
            actions: ""
        },
        {
            title: "Modelle und Simulationen",
            text: 'Dieser Bereich zeigt mögliche Modelle und Simulationen in einem digitalen Stadtzwilling. Natürlich ist die Liste nicht vollständig und die Modelle sind nur exemplarisch umgesetzt. Mit einem Klick startet das jeweilige (Simulations-)modell und Sie können bestimmte Parameter verändern. Experimentieren Sie mit den Modellen!',
            image: "./tutorial/modelle.jpg",
            actions: ""
        },
        {
            title: "Beiträge",
            text: "Lassen Sie uns nach dem Experimentieren hier wissen, welche Modelle und Simulationen Sie sich in Zukunft für welche Zwecke wünschen. Interagieren Sie mit den Beiträgen der anderen Studienteilnehmer per Kommentar oder per Emoji. Sie können vorherige Beiträge filtern und auch anonym posten.",
            image: "./tutorial/beitraege.jpg",
            actions: ""
        },
        {
            title: "Startseite",
            text: "Ein Klick auf dieses Feld bringt Sie zurück zur Startseite",
            image: "./tutorial/startseite.jpg",
            actions: ""
        },
        {
            title: "Tutorial abschließen",
            text: "Sie können dieses Tutorial jederzeit wieder aufrufen, indem Sie auf das Fragezeichen in der rechten oberen Ecke klicken. Bei weiteren Fragen wenden Sie sich gerne an rico.herzog@hcu-hamburg.de.",
            image: "./tutorial/einfuehrung.jpg",
            actions: <>
                <Button onClick={() => { handleTutorialActive(false) }} variant="contained" sx={{ margin: 1 }}>Tutorial beenden</Button>
            </>
        },

    ])


    return (
        <Backdrop open={props.tutorialActive}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={11} md={6} lg={4}>

                    <Card >
                        <CardMedia
                            component="img"
                            height="250"
                            image={tutorialSteps[activeStep].image}
                        />
                        <CardContent>
                            <Typography variant="h4" m={3}>
                                {tutorialSteps[activeStep].title}
                            </Typography>
                            <Typography variant="body" sx={{ paddingRight: 4, paddingLeft: 4 }}>
                                {tutorialSteps[activeStep].text}
                            </Typography>
                        </CardContent>

                        <CardActions >
                            <Grid container justifyItems={"center"}>
                                <Grid item xs={12}>
                                    {tutorialSteps[activeStep].actions}
                                </Grid>
                                {activeStep != 0 &&
                                    <Grid item xs={12}>
                                        <MobileStepper
                                            variant="progress"
                                            steps={tutorialSteps.length}
                                            position="static"
                                            activeStep={activeStep}
                                            sx={{ flexGrow: 1 }}
                                            nextButton={
                                                <Button size="small" onClick={handleNext} disabled={activeStep === (tutorialSteps.length - 1)}>

                                                    {theme.direction === 'rtl' ? (
                                                        <KeyboardArrowLeft />
                                                    ) : (
                                                        <KeyboardArrowRight />
                                                    )}
                                                </Button>
                                            }
                                            backButton={
                                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                    {theme.direction === 'rtl' ? (
                                                        <KeyboardArrowRight />
                                                    ) : (
                                                        <KeyboardArrowLeft />
                                                    )}

                                                </Button>
                                            }

                                        />
                                    </Grid>}
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <div style={{ position: "absolute", top: "-40px", width: "100%" }}>

                <Grid container justifyContent="space-around" alignItems="stretch" sx={{ width: "100%", textAlign: "center" }} p={{xs: 1, md:2}}>

                    <Grid item xs={2} lg={2} mt={{xs:5, md: 0}}>
                        {activeStep == 1 && <Highlight />}
                    </Grid>
                    <Grid item xs={2} lg={2} mt={{xs:5, md: 0}}>
                        {activeStep == 2 && <Highlight />}
                    </Grid>
                    <Grid item xs={2} lg={2} mt={{xs:5, md: 0}}>
                        {activeStep == 3 && <Highlight />}
                    </Grid>
                    <Grid item xs={2} lg={2} mt={{xs:5, md: 0}}>
                        {activeStep == 4 && <Highlight />}
                    </Grid>

                </Grid>

            </div>
            <div style={{ position: "absolute", top: "0px", width: "100%" }}>

                <Grid container justifyContent="space-around" alignItems="stretch" sx={{ width: "100%", textAlign: "center" }} p={2}>

                    <Grid item xs={2} lg={2}>
                        {activeStep == 1 && <NavBarItem icon={<CameraswitchIcon fontSize="large"  />} name="Ansicht" />}
                    </Grid>
                    <Grid item xs={2} lg={2}>
                        {activeStep == 2 && <NavBarItem icon={<ModelTrainingIcon fontSize="large"  />} name="Modelle & Simulationen"/>}
                    </Grid>
                    <Grid item xs={2} lg={2}>
                        {activeStep == 3 && <NavBarItem icon={<ForumIcon fontSize="large" />} name="Beiträge"/>}
                    </Grid>
                    <Grid item xs={2} lg={2}>
                        {activeStep == 4 && <NavBarItem icon={<HomeIcon fontSize="large" />} name="Startseite"/>}
                    </Grid>

                </Grid>

            </div>

        </Backdrop>
    )
}

function Highlight() {
    const grow = keyframes`from {transform: scale(0.8) rotate(56deg);} to { transform: scale(1) rotate(78deg); }`;

    return (
        <Box
            component="img"
            sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 80, md: 150 },
                maxWidth: { xs: 80, md: 150 },
                background: "rgba(0,0,0,0)",
                transform: "rotate(78deg)",
                animation: `${grow} 1s ease`
            }}
            src="./tutorial/highlight.png"
        />
    )
}

function NavBarItem(props) {
    return (
        <>
            <IconButton size="large" sx={{ backgroundColor: "#FFFFFF", boxShadow: '0px 0px 3px 2px rgba(0,0,0,.1)' }}>
                {props.icon}
            </IconButton>
            <Box pt={1} pb={2} >
                <Typography variant="overline" sx={{ lineHeight: 1 }}>
                    {props.name}
                </Typography>
            </Box>

        </>


    )
}