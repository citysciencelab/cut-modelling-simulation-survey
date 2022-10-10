import { useState, useContext } from 'react';
import { Drawer, Pagination, Stack, Switch, Divider, ToggleButton, ToggleButtonGroup, Typography, Grid, IconButton, Button, Collapse, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { AppContext } from '../App';



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

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event, filter) => {
    setActiveFilter(filter);
    setShowFilter(false)
    loadComments(filter, recipient.recipient_hash)
  };

  function calculateNumberPages() {
    if (comments != null) {
      return (Math.ceil(comments.length / number_comments_per_page))
    } else {
      return 1
    }

  }

  function getInstitutionType(type) {
    if (type == "Abteilung") {
      return ("Abteilung ")
    } else {
      return("")
    }
  }


  function getFilterLayout(smallScreen) {
    if (smallScreen) {
      return "vertical"
    } else {
      return "horizontal"
    }
  }

  return (
    <div>
      <Drawer anchor={"right"} open={props.open} onClose={handleClose} >
        <Grid container spacing={2} p={{ xs: 4, lg: 4 }} justifyContent="space-between" alignItems="stretch" sx={{ maxWidth: { xs: "100%", sm: "100%", md: "750px" } }}>
          <Grid item xs={11}>
            <Typography variant="h3">
              Beiträge
            </Typography>

            <Typography variant="subtitle1">
              Welche (Simulations-)modelle wünschen Sie sich in Zukunft? Für welchen Zweck? Hier können Sie Ihre Beiträge und Kommentare eingeben. Nur Sie und andere Studienteilnehmende aus den städtischen Behörden Hamburgs können diesen Bereich sehen. Die Daten werden nicht veröffentlicht. Diskutieren Sie mit!
            </Typography>




          </Grid>

          <Grid item xs={1}>
            <IconButton size="large" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setShowFilter(!showFilter)} endIcon={<ExpandMoreIcon fontSize="large" sx={{ transform: "rotate(0deg)", ...(showFilter && { transform: "rotate(180deg)" }) }} />}>
              Filtern {activeFilter != "alle" && "(1)"}
            </Button>
            <Collapse in={showFilter} >
              <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                <Grid item sm={12}>
                  <ToggleButtonGroup
                    orientation={getFilterLayout(useMediaQuery(theme.breakpoints.down('sm')))}
                    value={activeFilter}
                    exclusive
                    onChange={handleFilterChange}
                    size="small"
                    sx={{ marginTop: 1 }}
                  >
                    <ToggleButton value="alle" aria-label="alle">
                      Alle
                    </ToggleButton>
                    <ToggleButton value="allgemein" aria-label="allgemein">
                      Allgemein
                    </ToggleButton>
                    <ToggleButton value="wunsch" aria-label="wunsch">
                      Wunsch
                    </ToggleButton>
                    <ToggleButton value="idee" aria-label="idee">
                      Idee
                    </ToggleButton>
                    <ToggleButton value="frage" aria-label="frage">
                      Frage
                    </ToggleButton>

                  </ToggleButtonGroup>
                </Grid>
                {/*
                <Grid item sm={12}>
                  <Switch defaultChecked />
  </Grid>*/}
              </Grid>
            </Collapse>

          </Grid>
          <Grid item xs={12}>

            <Stack spacing={2}  >
              {
                comments != null && comments.length == 0 && <Typography variant="body">Es sind noch keine Kommentare vorhanden. Schreiben Sie den ersten! 😊</Typography>
              }
              {
                comments != null && comments.slice(number_comments_per_page * (page - 1), number_comments_per_page * (page - 1) + number_comments_per_page).map((comment) => {
                  return (
                    <CommentItem comment={comment} key={comment.id} recipient={recipient} />
                  )
                })
              }

            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Pagination count={calculateNumberPages()} page={page} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <CommentForm size={4} type="Beitrag" />
            <Switch
              checked={!recipient.sendAnonymous}
              size="small"
              onChange={(event) => { setSendAnonymous(!recipient.sendAnonymous) }}
            />
            <Typography variant="body2" mt={2} sx={{ lineHeight: 1, display: "inline-block" }}>
              {!recipient.sendAnonymous && "Für andere Teilnehmende sichtbar posten als \"Mitarbeiter*in " + getInstitutionType(recipient.recipient_type) + recipient.recipient_name + "\""}
              {recipient.recipient_name == "" || recipient.sendAnonymous && "Anonym posten"}
            </Typography>

          </Grid>




        </Grid>
      </Drawer>

    </div >
  );
}
