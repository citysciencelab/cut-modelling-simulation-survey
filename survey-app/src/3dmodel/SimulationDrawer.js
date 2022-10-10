import * as React from 'react';
import { Drawer, List, ListItemText, ListSubheader, ListItemButton, ListItemIcon, Typography, Grid, IconButton, Button, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Simulations } from "../simulations/SimulationData"


export default function SimulationDrawer(props) {


  const handleClose = () => {
    props.onHandleSimulationDrawer(false, {});
  };

  function handleSimulationSelection(simulation) {
    props.onChangeActiveSimulation(simulation)
    props.onHandleSimulationDrawer(false, {})
  }

  return (
    <div>
      <Drawer anchor={"left"} open={props.open} onClose={handleClose} >
        <Grid container spacing={2} p={4} justifyContent="space-between" alignItems="stretch" sx={{maxWidth:{xs: "100%", md: "750px"}}}>
          <Grid item xs={11}>
            <Typography variant="h3">
              Modelle & Simulationen
            </Typography>
            <Typography variant="subtitle1">
              Dieser Bereich zeigt mögliche Modelle und Simulationen in einem digitalen Urbanen Zwilling. Natürlich ist die Liste nicht vollständig und die (Simulations-)Modelle nur exemplarisch umgesetzt. 
              Experimentieren Sie gerne mit den vorhandenen Simulationen und lassen Sie uns durch die Kommentarfeldern wissen, welche Simulationen und Modelle Sie sich wünschen würden.
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <IconButton aria-label="delete" size="large" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>


          <Grid item xs={12}>
            <List
              sx={{
                bgcolor: 'background.paper',
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {

                Object.entries(Simulations).map(([category, simulation_list]) => {
                  return (
                    <li key={category}>
                      <ul>
                        <ListSubheader>{category}</ListSubheader>
                        {
                          simulation_list.map((simulation) => {
                            return (
                              <ListItemButton disabled={!simulation.preview} key={simulation.key} selected={props.activeSimulation === simulation.key} sx={{cursor: 'default'}}>
                                <ListItemIcon>
                                  {simulation.icon}
                                </ListItemIcon>
                                <ListItemText primary={simulation.name} secondary={
                                  <React.Fragment>
                                    {simulation.description} <br />
                                    
                                  </React.Fragment>
                                } />
                                {props.activeSimulation === simulation.key && <Chip label="Simulation stoppen" color="error" onClick={() => { handleSimulationSelection(null) }} sx={{cursor: 'pointer'}}/>}
                                {props.activeSimulation != simulation.key && <PlayCircleOutlineIcon onClick={() => { handleSimulationSelection(simulation.key) }} sx={{cursor: 'pointer'}}/>}
                              </ListItemButton>
                            )
                          })
                        }
                      </ul>
                    </li>
                  )
                })
              }
            </List>
          </Grid>
        </Grid>
      </Drawer>

    </div>
  );
}
