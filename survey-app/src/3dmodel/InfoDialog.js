import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SensorsIcon from '@mui/icons-material/Sensors';
import CommentIcon from '@mui/icons-material/Comment';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { Slider, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Drawer, Tabs, Tab, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import RecipientAvatar from '../components/RecipientAvatar';
//import {  Label} from 'devextreme-react/chart';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function InfoDialog(props) {

  const [iconTab, setIconTab] = React.useState(0);

  const handleClose = () => {
    props.onHandleDialog(false, {});
    setIconTab(0)
  };

  const d = new Date();
  let time = d.getHours();

  function valuetext(value) {
    return `${value} `;
  }

  const handleIconTab = (event, newValue) => {
    setIconTab(newValue);
  };

  useEffect(() => {
    if (props.dialogContent["sensorData"] !== undefined) { setIconTab(0) }
    else if (props.dialogContent["citizenComments"] !== undefined) { setIconTab(1) }
    else if (props.dialogContent["data"] !== undefined) { setIconTab(2) }
  }, [])


  return (
    <div>
      <Drawer anchor={"bottom"} open={props.open} onClose={handleClose}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item  m={3} mb={1}>
            <Typography variant="h3">
              {props.dialogContent.title}
            </Typography>
          </Grid>
          <Grid item  m={1}>
            <IconButton size="large" onClick={handleClose} align="right">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>

          <Grid item xs={12} ml={3} mr={3} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={iconTab} onChange={handleIconTab} aria-label="icon label tabs example">
              <Tab icon={<InfoIcon />} label="Beschreibung" key="Beschreibung" />
              <Tab icon={<SensorsIcon />} label="Sensoren" key="sensor" disabled={props.dialogContent["sensorData"] == undefined} />
              <Tab icon={<CommentIcon />} label="Partizipation" key="comment" disabled={props.dialogContent["citizenComments"] == undefined} />
              <Tab icon={<AnalyticsIcon />} label="Daten" key="data" disabled={props.dialogContent["data"] == undefined} />
            </Tabs>
          </Grid>

          <Grid item xs={12} ml={1} mr={1}>
            <TabPanel value={iconTab} index={0}>
              <Typography gutterBottom>
                {props.dialogContent.text}
              </Typography>
            </TabPanel>
            {props.dialogContent["sensorData"] !== undefined &&
              <TabPanel value={iconTab} index={1}>
                <Grid container spacing={2} alignItems="center">
                  {
                    Object.entries(props.dialogContent.sensorData).map(([key, sensor]) => (


                      <Grid item xs>
                        <Paper>
                          <Chart data={(sensor.data).slice(time + 1, -1).concat((sensor.data).slice(0, time + 1))} height={250}>
                            <ValueAxis />
                            <ArgumentAxis title="Axis Title">
                            </ArgumentAxis>
                            <LineSeries name="name" valueField="value" argumentField="argument" />
                            <Title text={sensor.titel}>
                            </Title>
                          </Chart>
                        </Paper>
                      </Grid>

                    ))
                  }
                </Grid>

              </TabPanel>
            }

            {props.dialogContent["citizenComments"] !== undefined &&
              <TabPanel value={iconTab} index={2}>
                {
                  Object.entries(props.dialogContent.citizenComments).map(([key, comment]) => (

                    <Grid container mb={2}>
                      <Grid item >
                        <RecipientAvatar writer={comment.contributor} />
                      </Grid>
                      <Grid item xs={11} ml={1}>
                        <Typography variant="body2" sx={{ display: "inline-block", lineHeight: 1, fontWeight: "bold" }}>{comment.contributor}  </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{comment.comment} </Typography>
                      </Grid>


                    </Grid>


                  ))

                }
              </TabPanel>
            }

            {props.dialogContent["data"] !== undefined &&
              <TabPanel value={iconTab} index={3}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Datensatz</TableCell>
                        <TableCell align="right">Wert</TableCell>
                        <TableCell>Einheit</TableCell>
                        <TableCell>Referenz</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        Object.entries(props.dialogContent.data).map(([key, data]) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              {key}
                            </TableCell>
                            <TableCell align="right">{data.value}</TableCell>
                            <TableCell >{data.unit}</TableCell>
                            <TableCell >{data.reference}</TableCell>
                          </TableRow>
                        ))

                      }

                    </TableBody>




                  </Table>

                </TableContainer>




              </TabPanel>
            }
          </Grid>
        </Grid>
      </Drawer>

    </div>
  );
}
