import { useState, useEffect, useRef } from "react"
import { Stack, Chip } from "@mui/material"
import { config } from "../config";


export default function Reactions(props) {

    const reactionTypes = ["👍", "💡", "🤔"]
    const [reactions, setReactions] = useState(getInitialState())
    const reactionsRef = useRef()

    function getInitialState() {
        let state = []
        reactionTypes.map((t) => {
            state.push({ type: t, count: 0, clicked: false })
        })
        return state
    }

    function handleReactionCount(t, click, c = 0) {
        let newReactions = []
        reactions.map((reaction) => {
            if (reaction.type == t && !reaction.clicked && click) {
                newReactions.push({ type: reaction.type, count: parseInt(reaction.count) + 1, clicked: true })
            } else if (reaction.type == t && reaction.clicked && click) {
                newReactions.push({ type: reaction.type, count: parseInt(reaction.count) - 1, clicked: false })
            } else if (reaction.type == t && !click) {

                newReactions.push({ type: reaction.type, count: c, clicked: false })
            } else {
                newReactions.push(reaction)
            }
        })
        setReactions(newReactions)
        reactionsRef.current = newReactions
    }

    function getReactionCount(number) {
        if (number < 1) {
            return ("")
        } else {
            return (number)
        }

    }


    function loadReactions() {
        fetch(config.api + "/reactions?cId=" + props.cId)
            .then((response) => {

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then(
                (response) => {

                   try {
                        let typesNotContained = reactionTypes
                        response.map((reaction) => {
                            if (typesNotContained.includes(reaction.type)) {
                                typesNotContained= typesNotContained.filter(function(value,index,array){return value != reaction.type})
                            }
                        })
 

                        let responsePlusReactions = response
                        typesNotContained.map((t) => {
                            responsePlusReactions.push({type: t, count: 0, clicked: false})
                        })
 
                        setReactions(responsePlusReactions)
                    } catch (err) {
                        console.log(err)
                    }

                },
                (error) => {
                    console.log(error);
                }
            )
    }

    function submitReactions(r) {

        if (r != undefined) {
            r.map((reaction) => {
                //Only submit if a reaction is clicked

                if (reaction.clicked) {

                    let reaction_json = {
                        contribution_reaction_type: reaction.type,
                        comment_reference: props.cId,
                        contribution_reactor_id: props.rId
                    }

                    //console.log(reaction_json)

                    fetch(config.api + "/add/reaction", {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reaction_json),
                    })
                }
            })
        }

    }


    function getReactionVariant(clicked) {
        if (clicked) {
            return "filled"
        } else {
            return "outlined"
        }
    }

    //Load reactions for the first time
    useEffect(() => {

        loadReactions()

        return () => {
            submitReactions(reactionsRef.current)
        }

    }, []);





    return (
        <Stack direction="row">
            {
                reactions.map((reaction) => {
                    return (
                        <Chip key={reaction.type} label={reaction.type + " " + getReactionCount(reaction.count)} size="small" variant={getReactionVariant(reaction.clicked)} onClick={() => handleReactionCount(reaction.type, true)} sx={{fontSize: 14}} />
                    )
                })
            }
        </Stack>
    )
}