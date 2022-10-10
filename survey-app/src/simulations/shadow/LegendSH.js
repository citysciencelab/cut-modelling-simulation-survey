import { Box, Grid, Typography} from "@mui/material"

export default function LegendSH() {
    return (
        <Grid container sx={{textAlign: "left"}} alignItems="center">
            <Grid item xs={12} >
                <Typography variant="h6" p={1}>
                    Informationen
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="overline" p={1}>Ort</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body" p={1}>Twin City</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="overline" p={1}>Datum</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body" p={1}>{new Date(Date.now()).toLocaleDateString('de-DE')}</Typography>
            </Grid>
        </Grid>

    )
}