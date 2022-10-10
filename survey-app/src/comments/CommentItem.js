import { Paper, Grid, Typography, Divider, Button, Collapse, Stack, Box } from "@mui/material"
import RecipientAvatar from '../components/RecipientAvatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { config } from "../config";
import CommentForm from "./CommentForm";
import Reactions from "./Reactions";


const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _today = new Date()

function formatDate(date) {

    let d = new Date(date)
    try {
        let date_diff = Math.floor((_today - d) / _MS_PER_DAY)
        if (date_diff < 1) {
            return ("heute")
        } else if (date_diff < 2) {
            return ("vor einem Tag")
        } else if (date_diff < 8) {
            return ("vor " + date_diff + " Tagen")
        } else {
            return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
        }
    } catch (err) {
        return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
    }


}

function getSimulationReference(reference) {
    switch (reference) {
        case "wind":
            return " • Windsimulation"
        case "shadow":
            return " • Verschattungssimulation"
        case "rain":
            return " • Starkregensimulation"
        case "air-quality":
            return " • Luftqualitätssimulation"
        default:
            return ""
    }
}


export default function CommentItem(props) {

    const [replies, setReplies] = useState([])
    const [repliesLoaded, setRepliesLoaded] = useState(false)
    const [showReplies, toggleReplies] = useState(false)
    const [error, setError] = useState(null);


    function handleReplyLoad(commentId, refresh) {
        if (!repliesLoaded || refresh) {
            // If no replies are loaded yet or another reply is submitted, load Replies from the database
            fetch(config.api + "/replies?commentId=" + commentId + "&h=" + props.recipient.recipient_hash)
                .then((response) => {

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    return response.json();
                })
                .then(
                    (response) => {
                        setReplies(response);
                        setRepliesLoaded(true);
                        toggleReplies(true)

                    },
                    (error) => {
                        setRepliesLoaded(false);
                        setError(error);
                    }
                )
        } else {
            toggleReplies(!showReplies)
        }
    }

    function getInstitutionType(type) {
        if (type == "Abteilung") {
          return ("Abteilung ")
        }
      }
    

    return (
        <Paper elevation={2} sx={{ padding: 2 }}>
            <Grid container alignItems="center">
                <Grid item mr={1}>
                    <RecipientAvatar writer={props.comment.writer} />
                </Grid>

                <Grid item >
                    <Typography variant="body2" sx={{ display: "inline-block", lineHeight: 1, fontWeight: "bold" }}>
                        {props.comment.writer != null && "Mitarbeiter*in "}
                        {getInstitutionType(props.comment.writer_type)}
                        {props.comment.writer}
                        {props.comment.writer && " "}
                        {props.comment.writer == null && "Anonym"}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "inline-block", lineHeight: 1, opacity: 0.5 }} ml={1}>
                        {" • " + formatDate(props.comment.date)}
                    </Typography> <br />
                    <Typography variant="body2" sx={{ lineHeight: 1, opacity: 0.5 }}>
                        {props.comment.category} {getSimulationReference(props.comment.simulation_reference)}
                    </Typography>

                </Grid>

                <Grid item xs={12} mt={1} mb={1}>
                    <Typography variant="body">{props.comment.text}</Typography>

                </Grid>
                <Grid item xs={12}>
                    <Divider variant="left" />
                </Grid>

                <Grid item xs={4}>
                    <Button
                        size="small"
                        endIcon={<ExpandMoreIcon
                            sx={{ transform: "rotate(0deg)", ...(showReplies && { transform: "rotate(180deg)" }) }}
                        />}
                        onClick={() => handleReplyLoad(props.comment.id, false)}>
                        Kommentare ({props.comment.number_replies})
                    </Button>

                </Grid>
                <Grid item xs={8} >
                    <Box display="flex" justifyContent="flex-end" m={1}>
                        <Reactions cId={props.comment.id} rId={props.recipient.recipient_id} />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Collapse in={showReplies}>
                        <Stack>
                            {

                                replies.map((reply) => {
                                    
                                    return (
                                        <Grid container ml={1} mb={1} alignItems="center" key={reply.reply_id}>
                                            <Grid item mr={0.5}>
                                                <RecipientAvatar writer={reply.reply_writer} size="small" />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" sx={{ display: "inline-block", fontSize: "small", fontWeight: "bold" }} >
                                                    {reply.reply_writer != null && "Mitarbeiter*in "}
                                                    {getInstitutionType(reply.reply_writer_type)}
                                                    {reply.reply_writer}
                                                    {reply.reply_writer && " "}
                                                    {reply.reply_writer == null && "Anonym "}
                                                </Typography>
                                                <Typography variant="body2" sx={{ display: "inline-block", fontSize: "small", opacity: 0.5 }} ml={1} >
                                                    {" • " + formatDate(reply.reply_date)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body" sx={{ fontSize: "small" }} mt={1}>
                                                    {reply.reply_text}
                                                </Typography>
                                            </Grid>
                                            <Divider ml={2} />

                                        </Grid>
                                    )

                                })
                            }
                        </Stack>
                        <CommentForm size={1} commentReference={props.comment.id} onHandleReplyLoad={handleReplyLoad} type="Kommentar" />
                    </Collapse>
                </Grid>

            </Grid>



        </Paper>
    )
}