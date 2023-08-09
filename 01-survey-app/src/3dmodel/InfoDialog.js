import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SensorsIcon from '@mui/icons-material/Sensors';
import LinkIcon from '@mui/icons-material/Link';
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
 
  function handleIconButtonClick () {
      if (props.dialogContent['link']) {
        window.open(props.dialogContent['link'], '_blank');
      }
    };
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
      <Drawer anchor="bottom" open={props.open} onClose={handleClose}>
      <div style={{ padding: "16px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
          <Typography variant="h6" align="left"> 
                {props.dialogContent["tool_name"]}
              </Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton size="large" onClick={handleIconButtonClick} align="right">
              <LinkIcon />
            </IconButton>
            <IconButton size="large" onClick={handleClose} align="right">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* Left side content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Description */}
              <Typography variant="body1">
                {props.dialogContent["description"]}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Right side content */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Picture */}
              <img
                src={props.dialogContent["picture_url"]}
                alt="Picture"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>

    </div>
  );
}
