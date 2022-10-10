import { useState, useEffect } from "react";
import { Grid, Slider, Typography, Button } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

export default function TimeHandler(props) {


    const [play, setPlay] = useState(false)


    const marks = [
        {
            value: 0,
            label: '0:00 Uhr',
        },
        {
            value: 25,
            label: '6:00 Uhr',
        },
        {
            value: 50,
            label: '12:00 Uhr',
        },
        {
            value: 75,
            label: '18:00 Uhr',
        },
        {
            value: 100,
            label: '24:00 Uhr',
        },
    ];

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => setTime(Date.now()), 200);
            if (props.simulationTime <= 100) {
                handleSimulationTime(props.simulationTime + 2)
            } else {
                handleSimulationTime(0)
            }

            return () => {
                clearInterval(interval);
            };
        }

    }, [time])

    function handleSimulation(start) {
        setPlay(start)
        setTime(Date.now())

        if (start) {
            handleSimulationPlay()
        }
    }

    const handleSliderChange = (event, newValue) => {
        handleSimulationTime(newValue);
    };

    function handleSimulationTime(time) {
        props.onHandleSimulationTime(time)
    }

    function handleSimulationPlay() {
        props.onHandleSimulationPlay()
    }

    function getSimulationButton(play) {
        if (play) {
            return (<PlayCircleOutlineIcon />)
        } else {
            return (<PauseCircleFilledIcon />)
        }
    }

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center" pr={1} pl={1}>
                <Grid item xs={6}>
                    <Typography variant="h6" p={1}>
                        Uhrzeit
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                    <Button startIcon={getSimulationButton(!play)} onClick={(event) => { handleSimulation(!play) }} size={"small"} sx={{ lineHeight: 1 }} variant="contained">
                        Simulation
                        {!play && " starten"}
                        {play && " stoppen"}
                    </Button>

                </Grid>
            </Grid>
            <Grid container justifyContent="center" pl={5} pr={5}>
                <Grid item xs={12}>
                    <Slider color="primary" sx={{ width: "100%" }} marks={marks} value={props.simulationTime} onChange={handleSliderChange} />
                </Grid>
                <Grid item >
                    <Typography variant="overline" p={1}>
                        Zeit
                    </Typography>
                </Grid>

            </Grid>
        </>
    )
}