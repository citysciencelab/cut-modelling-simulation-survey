import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PresentationControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import { CircularProgress, IconButton, Snackbar, Alert } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { useSearchParams } from "react-router-dom";

import TwinNavBar from "../components/TwinNavBar";
import { daytimeLighting, nighttimeLighting, shadowLighting, LightSetup } from "./LightData";

import LegoModel from "./Legomodel";
import InfoDialog from "./InfoDialog";
import MaterialUISwitch from "./DayNightSwitch"
import { CameraControls, view_map, view_normal, view_pedestrian } from "./CameraControls";
import SimulationDrawer from "./SimulationDrawer";
import SimulationPanel from "./SimulationPanel";
import CommentDrawer from "../comments/CommentDrawer";

import Airquality from "../simulations/air-quality/Airquality";
import Shadow from "../simulations/shadow/Shadow";
import Wind from "../simulations/wind/Wind";
import Rain from "../simulations/rain/Rain";


export default function Twin(props) {
    //Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams();

    // Lighting setup
    const [nighttime, setNighttime] = useState(false);
    const [lighting, setLighting] = useState(daytimeLighting);
    const [dialogOpen, setDialog] = useState(false);

    // Interaction Panels
    const [dialogContent, setDialogContent] = useState({});
    const [simulationDrawerOpen, setSimulationDrawer] = useState(false);
    const [commentDrawerOpen, setCommentDrawer] = useState(false);

    // Camera setup
    const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(0, 0, 250))
    const [lookAt, setLookAt] = useState(new THREE.Vector3(0, 0, 0))
    const [view, setView] = useState(view_normal)

    // Simulation Setups
    const [activeSimulation, setActiveSimulation] = useState(null)
    const [simulationTime, setSimulationTime] = useState(0)
    const [windDirection, setWindDirection] = useState(0)
    const [precipitation, setPrecipitation] = useState(0)




    const handleDaytimeChange = (event, newValue) => {
        if (newValue) {
            setLighting(nighttimeLighting)
            setNighttime(true)
        } else {
            setLighting(daytimeLighting)
            setNighttime(false)
        }
    };

    function handleDialog(visible, data) {
        if (activeSimulation == null && view.name != "pedestrian") {
            setDialog(visible)
            setDialogContent(data)
        }
    }

    function handleSimulationDrawer(visible) {
        setSimulationDrawer(visible)
    }

    function handleCommentDrawer(visible) {
        setCommentDrawer(visible)
    }

    function handleViewChange(v) {

        if (v == "normal") {
            setView(view_normal)
        } else if (v == "map") {
            setView(view_map)
        } else if (v == "pedestrian") {
            setView(view_pedestrian)
        }

        //setCameraPosition(view.cameraPosition)
        //setLookAt(view.lookAt)

    }

    function handleActiveSimulation(simulation) {

        setActiveSimulation(simulation)

        if (simulation == "shadow") {
            setLighting(shadowLighting)
        } else {
            setLighting(daytimeLighting)
        }
    }

    function handleSimulationTime(time) {
        setSimulationTime(time)
    }

    function handleWindDirection(direction) {
        setWindDirection(direction)
    }

    function handlePrecipitationChange(precipitation) {
        setPrecipitation(precipitation)
    }

    function shadowZoom() {
        if (activeSimulation == "shadow") {
            return 1
        } else {
            return 1.25
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };

      useEffect(() => {
        if (searchParams.get("success") == "true") {
            setSnackbarOpen(true)
          }
      }, [])


    return (

        <>
            <div style={{ width: "100%", height: "100vh", background: nighttime ? "#232323" : "#FEFEFE" }}>
                <Suspense fallback={<CircularProgress />}>
                    <Canvas shadows colorManagement>

                        <CameraControls lookAt={view.lookAt} cameraPosition={view.cameraPosition} />
                        <OrthographicCamera makeDefault={view.name == "map"} position={[0, 100, 0]} rotation={[0, 0, Math.PI]} zoom={3} near={-50} />
                        <PerspectiveCamera makeDefault={view.name == "normal"} position={[0, 0, 250]} fov={90} />
                        <PerspectiveCamera makeDefault={view.name == "pedestrian"} position={[0, -70, 0]} fov={60} />

                        <PresentationControls
                            global={true} // Spin globally or by dragging the model
                            cursor={true} // Whether to toggle cursor style on drag
                            snap={view.snap} // Snap-back to center (can also be a spring config)
                            speed={view.speed} // Speed factor
                            zoom={shadowZoom()} // Zoom factor when half the polar-max is reached
                            rotation={view.rotation} // Default rotation
                            polar={view.polar} // Vertical limits
                            azimuth={[-Infinity, Infinity]} // Horizontal limits
                            config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                        >

                            <LightSetup lighting={lighting} activeSimulation={activeSimulation} />

                            {activeSimulation == "shadow" && <Shadow simulationTime={simulationTime} />}

                            <LegoModel
                                position={[-0, -100, -0]}
                                scale={1}
                                rotation={[0, -Math.PI / 2, 0]}
                                onHandleDialog={handleDialog}
                                activeSimulation={activeSimulation}
                                windDirection={windDirection}
                                view={view}
                            />

                            {activeSimulation == "air-quality" && <Airquality simulationTime={simulationTime} />}
                            {activeSimulation == "wind" && <Wind position={[-0, -100, -0]} windDirection={windDirection} />}
                            {activeSimulation == "rain" && <Rain precipitation={precipitation} />}


                        </PresentationControls>

                    </Canvas >
                </Suspense>

            </div>
            { /*
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 999 }}>

                <Grid container spacing={2} m={2}>
                    <ButtonGroup variant="outlined" sx={{ m: 1 }} size="small">
                        <Button>
                            <FormControlLabel control={<MaterialUISwitch onChange={handleDaytimeChange} checked={nighttime} />} />
                        </Button>
                    </ButtonGroup>
                </Grid>
            </div>
                        */}

            <TwinNavBar
                onHandleSimulationDrawer={handleSimulationDrawer}
                onHandleCommentDrawer={handleCommentDrawer}
                onHandleViewChange={handleViewChange}
            />

            <InfoDialog open={dialogOpen} onHandleDialog={handleDialog} dialogContent={dialogContent} />

            <SimulationDrawer open={simulationDrawerOpen} onHandleSimulationDrawer={handleSimulationDrawer} activeSimulation={activeSimulation} onChangeActiveSimulation={handleActiveSimulation} />

            <CommentDrawer open={commentDrawerOpen} onHandleCommentDrawer={handleCommentDrawer} comments={props.comments} />

            {
                activeSimulation != null &&
                <SimulationPanel
                    activeSimulation={activeSimulation}
                    simulationTime={simulationTime}
                    windDirection={windDirection}
                    precipitation={precipitation}
                    onHandleWindDirection={handleWindDirection}
                    onHandleSimulationTime={handleSimulationTime}
                    onChangeActiveSimulation={handleActiveSimulation}
                    onHandleSimulationDrawer={handleSimulationDrawer}
                    onHandlePrecipitationChange={handlePrecipitationChange}
                />
            }


            <div style={{ position: "absolute", top: 5, right: 5 }}>
                <IconButton onClick={() => props.onHandleTutorialActive(true)}>
                    <HelpIcon color="grey" />
                </IconButton>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                    Umfrage erfolgreich abgesendet
                </Alert>
            </Snackbar>


        </>
    );

}