import { Grid, IconButton, Typography, Box, Collapse, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { keyframes } from "@mui/material";

import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import MapIcon from '@mui/icons-material/Map';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';

export default function TwinNavBar(props) {

    const [expand, setExpand] = useState(false)
    const navigate = useNavigate()

    const spin = keyframes`from {transform: rotate(0deg); } to { transform: rotate(360deg); }`;
    const grow = keyframes`from {transform: scale(0.2); } to { transform: scale(1); }`;

    const theme = useTheme();

    const [currentView, setCurrentView] = useState("normal")

    const menuItems = [


        /*{
            name: "Ausklappen",
            icon: <ExpandMoreIcon fontSize="large" sx={{ transform: "rotate(0deg)", ...(expand && { transform: "rotate(180deg)" }) }} />,
            onClick: () => { setExpand(!expand) }
        },*/
        {
            name: "Legende",
            icon: <LegendToggleIcon fontSize="large" />,
            onClick: () => { handleSimulationDrawer() }
        },
        {
            name: "Bausteinliste",
            icon: <FormatListBulletedIcon fontSize="large" />,
            onClick: () => { handleCommentDrawer() }
        },
        
        {
            name: "Startseite",
            icon: <HomeIcon fontSize="large" />,
            onClick: () => { navigate("/") }
        }
    ]


    function handleSimulationDrawer() {
        props.onHandleSimulationDrawer(true)
    }

    function handleCommentDrawer() {
        props.onHandleCommentDrawer(true)
    }

    function handleViewChange() {

        if (currentView == "normal") {
            setCurrentView("map")
            props.onHandleViewChange("map")
        }
        else if (currentView == "map") {
            setCurrentView("pedestrian")
            props.onHandleViewChange("pedestrian")
        }
        else if (currentView == "pedestrian") {
            setCurrentView("normal")
            props.onHandleViewChange("normal")
        }

    }

    function getCurrentViewIcon() {

        if (currentView == "normal") {
            return (<CameraswitchIcon fontSize="large" />)
        }
        else if (currentView == "map") {
            return (<MapIcon fontSize="large" />)
        }
        else if (currentView == "pedestrian") {
            return (<CameraFrontIcon fontSize="large" />)
        }


    }



    return (

        <div style={{ position: "absolute", top: "0px", width: "100%" }}>

            <Grid container justifyContent="space-around" alignItems="stretch" sx={{ width: "100%", textAlign: "center" }} p={2}>

                {
                    menuItems.map((menuItem) => {
                        return (
                            <Grid item xs={2} lg={2} key={menuItem.name}>


                                <IconButton onClick={menuItem.onClick} aria-label={menuItem.name} size="large" sx={{ backgroundColor: "#FFFFFF", boxShadow: '0px 0px 3px 2px rgba(0,0,0,.1)', animation: `${grow} 1s ease` }}>
                                    {menuItem.icon}
                                </IconButton>

                                <Box pt={1} pb={2} >
                                    <Typography variant="overline" sx={{ lineHeight: 1 }}>
                                        {menuItem.name}
                                    </Typography>
                                </Box>


                            </Grid>
                        )
                    })
                }


            </Grid>


        </div>
    )
}

