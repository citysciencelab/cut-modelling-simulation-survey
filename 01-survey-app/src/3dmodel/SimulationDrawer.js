import * as React from 'react';
import { Drawer, List, ListItemText, ListSubheader, ListItemButton, ListItemIcon, Typography, Grid, IconButton, Button, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Simulations } from "../simulations/SimulationData"
import { colors } from './Legomodel'
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
const StyledBox = styled(Box)(({ colorcode }) => ({
  display: 'inline-block',
  marginRight: '8px', // Add spacing between legend items if needed
  backgroundColor: colorcode,
  width: '20px',
  height: '20px',
}));

function LegendItem({ item }) {
  return (
    <div>
      <StyledBox colorcode={item.colorcode}></StyledBox>
      <span>{item.class}</span>
    </div>
  );
}

function App() {
  return (
    <div>
      {colors.map((item, index) => (
        <LegendItem key={index} item={item} />
      ))}
    </div>
  );
}



export default function SimulationDrawer(props) {


  const handleClose = () => {
    props.onHandleSimulationDrawer(false, {});
  };

  return (
    <div>
      <Drawer anchor={"left"} open={props.open} onClose={handleClose} >
        <Grid container spacing={2} p={4} justifyContent="space-between" alignItems="stretch" sx={{maxWidth:{xs: "100%", md: "750px"}}}>
          <Grid item xs={11}>
            <Typography variant="h3">
              Legende
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton aria-label="delete" size="large" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={11}>
            <App />
          </Grid>

        </Grid>
      </Drawer>

    </div>
  );
}
