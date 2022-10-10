import { useState, useEffect } from "react";
import { Grid, Slider, Typography, IconButton } from "@mui/material"


export default function RainHandler(props) {



    const marks = [
        {
            value: 2.5,
            label: '2.5',
        },
        {
            value: 15,
            label: '15',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 50,
            label: '50',
        },
    ];


    const handleSliderChange = (event, newValue) => {
        props.onHandlePrecipitationChange(newValue);
    };



    return (
        <Grid container justifyContent="space-evenly" alignItems="center" >
            <Grid item xs={12}>
                <Typography variant="h6" p={1}>
                    Niederschlagsmenge
                </Typography>
            </Grid>
            <Grid item xs={12} ml={3} mr={3} mt={4}>
                <Slider color="primary" sx={{ width: "100%" }} marks={true} value={props.precipitation} onChange={handleSliderChange} max={55} step={5} valueLabelDisplay="on"/>
            </Grid>
            <Grid item >
                    <Typography variant="overline" p={1}>
                        Milliliter pro Stunde
                    </Typography>
                </Grid>


        </Grid>
    )
}