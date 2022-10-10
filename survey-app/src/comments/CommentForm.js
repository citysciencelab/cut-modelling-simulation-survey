import { Grid, Stack, TextField, Chip, Paper, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material"
import { useState, useContext } from "react";
import { config } from '../config';

import SendIcon from '@mui/icons-material/Send';

import { AppContext } from "../App";
import RecipientAvatar from "../components/RecipientAvatar";
import { Simulations } from "../simulations/SimulationData";
import { ColorManagement } from "three/src/math/ColorManagement";

export default function CommentForm(props) {

    const [comments, loadComments, recipient, setSendAnonymous, loadRecipient] = useContext(AppContext);

    const defaultValues = {
        writer_id: recipient.recipient_id,
        comment_title: "",
        comment_text: "",
        comment_category: null,
        comment_reference: props.commentReference,
        simulation_reference: null,
        comment_anonymous: false
    };

    //Categories are dependent on the Simulations that are already there
    const contributionCategories = ["Allgemein", "Wunsch", "Idee", "Frage"]

    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState(false)
    const [currentCategory, setCurrentCategory] = useState("Allgemein")
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setError(false)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        //Make sure to include the simulation reference, if any is given
        let survey_answers = ({
            ...formValues,
            simulation_reference: props.simulationReference,
            comment_category: currentCategory,
            comment_anonymous: false
        });


        //Check if there is text, if not, don't submit
        if (survey_answers.comment_text.length < 2) {
            setError(true)
        } else {

            //Make sure to post anonymous, if wished for
            if (recipient.sendAnonymous) {
                survey_answers = ({
                    ...survey_answers,
                    comment_anonymous: true,
                });
            }


            //Try to send the data to the database
            fetch(config.api + "/add/comment", {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(survey_answers),
            })
                .then((response) => response.json())
                .then((data) => {
                    //console.log('Success:', data);
                    loadComments("none", recipient.recipient_hash);
                    if (props.type == "Kommentar") {
                        props.onHandleReplyLoad(props.commentReference, true)
                    }
                    setError(false)
                    setSnackbarOpen(true)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            //Clear the form
            setFormValues(defaultValues);
            setError(false)

        }

    };

    function getSender() {
        if (recipient.sendAnonymous) {
            return ("")
        } else {
            return recipient.recipient_name
        }
    }

    function handleCategorySelection(category) {
        setCurrentCategory(category)
    }

    function getColor(category) {
        if (category == currentCategory) {
            return "secondary"
        }
    }

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                    Beitrag erfolgreich abgesendet
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit}>
                <Paper variant="outlined" >
                    <Grid container spacing={1} alignItems="center" justifyContent="space-between" m={0.5} mb={1} sx={{ width: "95%" }}>
                        {props.commment_only && <Grid item xs={12}>
                            <TextField
                                id="title-input"
                                name="comment_title"
                                label="Titel"
                                type="text"
                                value={formValues.comment_title}
                                onChange={handleInputChange}
                                sx={{ width: "95%" }}
                            />
                        </Grid>}

                        <Grid item xs={12}>
                            <TextField
                                id="comment-input"
                                name="comment_text"
                                label=""
                                variant="standard"
                                type="text"
                                value={formValues.comment_text}
                                onChange={handleInputChange}
                                multiline
                                minRows={props.size}
                                maxRows={7}
                                placeholder={"Hier Ihren " + props.type + " eingeben"}
                                error={error}
                                helperText={error && props.type + " zu kurz"}
                                sx={{ width: "100%", border: 0 }}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RecipientAvatar writer={getSender()} pr={2} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="submit"
                                                edge="end"
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}


                            />
                        </Grid>
                        {
                            props.type == "Beitrag" &&
                            <>

                                <Grid item xs={12}>

                                    {
                                        contributionCategories.map((category) => {
                                            return (
                                                <Chip label={category} key={category} onClick={() => { handleCategorySelection(category) }} color={getColor(category)} sx={{ margin: 0.3 }} />
                                            )
                                        })
                                    }

                                </Grid>
                            </>
                        }

                    </Grid>
                </Paper>
            </form>
        </>
    )
}