import { Box, Grid, Typography} from "@mui/material"

export default function LegendAQ() {
    return (
        <Grid container sx={{textAlign: "center"}}>
            <Grid item xs={12} >
                <Typography variant="h6" sx={{textAlign: "left"}} p={1}>
                    Luftqualitäts-Index
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: "100%", height: "25px", background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 50%, rgba(0,255,0,1) 100%)" }}>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="overline">Schlecht</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="overline">Mittel</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="overline">Gut</Typography>
            </Grid>
        </Grid>

    )
}