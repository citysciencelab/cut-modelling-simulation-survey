import { Grid, Collapse, Paper, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Close from '@mui/icons-material/Close';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import { Simulations } from "../simulations/SimulationData"

import RainHandler from '../simulations/parameter-handlers/RainHandler';
import TimeHandler from '../simulations/parameter-handlers/TimeHandler';
import WindHandler from '../simulations/parameter-handlers/WindHandler';

import CommentForm from '../comments/CommentForm';

function getCurrentSimulation(key) {
    let currentCategory, currentSimulation = null
    Object.entries(Simulations).map(([k, value]) => {
        value.map((simulation) => {
            if (simulation.key === key) {
                currentSimulation = simulation
                currentCategory = k
            }
        })
    })
    return [currentCategory, currentSimulation]
}



export default function SimulationPanel(props) {

    const [collapsed, setCollapsed] = useState(true)

    const current = getCurrentSimulation(props.activeSimulation)
    const currentCategory = current[0]
    const currentSimulation = current[1]

    function handleSimulationTime(time) {
        props.onHandleSimulationTime(time)
    }

    function handleSimulationPlay() {
        setCollapsed(false)
    }

    function handleStopSimulation() {
        props.onChangeActiveSimulation(null)
        props.onHandleSimulationDrawer(true)
        props.onHandleSimulationTime(0)
    }

    function handleWindDirection(direction) {
        props.onHandleWindDirection(direction)
    }

    function handlePrecipitationChange(precipitation) {
        props.onHandlePrecipitationChange(precipitation)
    }

    return (
        <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
                <Grid item xs={12} md={9} lg={8}>
                    <Collapse in={collapsed} collapsedSize={120}>
                        <Paper elevation={4} sx={{ background: "#465166", color: "#FFFFFF" }}>
                            <Grid container justifyContent="space-between" alignItems="flex-start" pr={3} pl={3} pt={3}>
                                <Grid item xs={10} sx={{ textAlign: "left" }}>
                                    <Typography variant="overline" gutterBottom>

                                        <IconButton color="white" onClick={() => { handleStopSimulation() }} size="small">
                                            <KeyboardReturnIcon />
                                        </IconButton>
                                        {currentCategory}
                                    </Typography>
                                    <Typography variant="h4" gutterBottom>
                                        {currentSimulation.name}


                                    </Typography>

                                </Grid>

                                <Grid item xs={2} sx={{ textAlign: "right" }}>
                                    <IconButton aria-label="delete" size="large" onClick={() => { setCollapsed(!collapsed) }}>
                                        <ExpandCircleDownIcon color="white" size="large" sx={{ transform: "rotate(180deg)", ...(collapsed && { transform: "rotate(0)" }) }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" alignItems="flex-start" spacing={2} p={3}>
                                <Grid item xs={12} md={8} lg={5}>
                                    <Paper elevation={4} sx={{ background: "#FFFFFF", color: "#465166", textAlign: "left" }} >
                                        {props.activeSimulation == "air-quality" && <TimeHandler onHandleSimulationTime={handleSimulationTime} onHandleSimulationPlay={handleSimulationPlay} simulationTime={props.simulationTime} />}
                                        {props.activeSimulation == "shadow" && <TimeHandler onHandleSimulationTime={handleSimulationTime} onHandleSimulationPlay={handleSimulationPlay} simulationTime={props.simulationTime} />}
                                        {props.activeSimulation == "wind" && <WindHandler onHandleWindDirection={handleWindDirection} windDirection={props.windDirection} />}
                                        {props.activeSimulation == "rain" && <RainHandler onHandlePrecipitationChange={handlePrecipitationChange} precipitation={props.precipitation} />}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper elevation={4} sx={{ background: "#FFFFFF", color: "#465166", textAlign: "left" }} >
                                        {currentSimulation.legend}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={4}>
                                    <Paper elevation={4} sx={{ background: "#FFFFFF", color: "#465166", textAlign: "left" }} >
                                        
                                        <CommentForm type="Beitrag" size={3} sx={{margin: 2}} simulationReference={props.activeSimulation}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Collapse>
                </Grid>
            </Grid>
        </div>
    )
}