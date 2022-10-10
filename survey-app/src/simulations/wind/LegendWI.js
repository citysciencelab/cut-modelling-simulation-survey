import { Box, Grid, Typography} from "@mui/material"

export default function LegendWI() {
    return (
        <Grid container sx={{textAlign: "center"}}>
            <Grid item xs={12} >
                <Typography variant="h6" sx={{textAlign: "left"}} p={1}>
                    Turbulenz
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: "100%", height: "25px", background: "linear-gradient(270deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 33%, rgba(0,255,0,1) 66%, rgba(0,255,255,1) 100%)" }}>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="overline">Wenig</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="overline">Mittel</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="overline">Viel</Typography>
            </Grid>
        </Grid>

    )
}