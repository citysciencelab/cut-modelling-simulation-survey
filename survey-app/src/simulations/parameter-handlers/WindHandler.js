import { useState, useEffect } from "react";
import { Grid, Slider, Typography, IconButton } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import CircularSlider from '@fseehawer/react-circular-slider';

export default function WindHandler(props) {


    function handleWindDirection(direction) {
        props.onHandleWindDirection(direction)
    }

    function getWindDirection(grad) {
        
        let divider = 45
        let offset = 22.5
        let adjusted = divider - offset //Adjust for offset
        
        if (grad < (1 * divider - offset)) {
            return "Nord"
        } else if (grad < (2 * divider - offset)) {
            return "Nord-Ost"
        } else if (grad < (3 * divider - offset)) {
            return "Ost"
        } else if (grad < (4 * divider - offset)) {
            return "Süd-Ost"
        } else if (grad < (5 * divider - offset)) {
            return "Süd"
        } else if (grad < (6 * divider - offset)) {
            return "Süd-West"
        } else if (grad < (7 * divider - offset)) {
            return "West"
        } else if (grad < (8 * divider - offset)) {
            return "Nord-West"
        } else {
            return "Nord"
        }
    }

    

    return (
        <Grid container justifyContent="space-evenly" alignItems="center" >

            <Grid item p={2}>
                <CircularSlider
                    width={150}
                    label={getWindDirection(props.windDirection)}
                    labelColor="#005a58"
                    knobColor="#A4C6FF"
                    progressColorFrom="#EEEEEE"
                    progressColorTo="#EEEEEE"
                    progressSize={24}
                    trackColor="#eeeeee"
                    trackSize={24}
                    //data={["Nord", "Nord-Ost", "Ost", "Süd-Ost", "Süd", "Süd-West", "West", "Nord-West"]} 
                    dataIndex={props.windDirection}
                    onChange={value => { handleWindDirection(value) }}
                    appendToValue="°"
                    valueFontSize="2rem"
                />
            </Grid>
            
        </Grid>
    )
}