import { useEffect, useState, useContext } from 'react';
import { Drawer, Pagination, Stack, Switch, Divider, ToggleButton, ToggleButtonGroup, Typography, Grid, IconButton, Button, Collapse, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PocketBase from 'pocketbase';
import 'cross-fetch/dist/node-polyfill.js'
import { AppContext } from '../App';
import { records } from '../3dmodel/Legomodel'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
function MyList() {
  const maxTextLength = 50; // Maximum number of characters to display

  const [expandedDescription, setExpandedDescription] = useState({});

  const toggleDescription = (recordId) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [recordId]: !prevState[recordId],
    }));
  };

  const truncateText = (text) => {
    if (text.length <= maxTextLength) {
      return text;
    }
    return `${text.slice(0, maxTextLength)}...`;
  };

  return (
    <div>
      <List>
        {records.map((record, index) => (
          <div key={record.id}>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ListItemText
                    primary={truncateText(record.tool_name)}
                    secondary={truncateText(record.tool_category)}
                  />
                </Grid>
                <Grid item xs={4}>
                  {expandedDescription[record.id] ? (
                    <ListItemText primary={record.description} />
                  ) : (
                    <ListItemText primary={truncateText(record.description)} />
                  )}
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    onClick={() => toggleDescription(record.id)}
                  >
                    {expandedDescription[record.id] ? 'Hide' : 'Show More'}
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            {index !== records.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
}


export default function CommentDrawer(props) {

  const number_comments_per_page = 4

  const [comments, loadComments, recipient, setSendAnonymous, loadRecipient] = useContext(AppContext);

  const handleClose = () => {
    props.onHandleCommentDrawer(false, {});
  };

  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false)
  const [activeFilter, setActiveFilter] = useState("alle")


  return (
    
    <div>
      <Drawer anchor={"right"} open={props.open} onClose={handleClose}>
        <Grid container spacing={2} p={{ xs: 4, lg: 4 }} justifyContent="space-between" alignItems="stretch" sx={{ maxWidth: { xs: "100%", sm: "100%", md: "750px" } }}>
          <Grid item xs={11}>
            <Typography variant="h3">
              Bausteine
            </Typography>
          </Grid>

          {/* Include the MyList component here */}
          <Grid item xs={11}>
            <MyList />
          </Grid>
          
          <Grid item xs={1}>
            <IconButton size="large" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "right" }}>

          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
