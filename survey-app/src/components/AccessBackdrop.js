import { Backdrop, Paper, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export default function AccessBackdrop(props) {

    const [accessCode, setAccessCode] = useState("")

    const handleChange = (e) => {
        setAccessCode(e.target.value)
    }

    function loadRecipient() {
        setAccessCode("")
        props.onLoadRecipient(accessCode)

    }

    return (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }}
            open={props.open}>
            <Paper sx={{ padding: 5 }}>
                <Typography variant="h5">
                    Bitte Zugangscode eingeben
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Code"
                    variant="outlined"
                    sx={{ marginTop: 3 }}
                    value={accessCode}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => { loadRecipient() }}
                                    
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    onChange={handleChange} 
                    onKeyPress={(event) => {
                        if (event.key === 'Enter')
                            loadRecipient()
                    }}
                    />
            </Paper>
        </Backdrop>
    )
}