import { Box, Grid, Typography} from "@mui/material"

export default function LegendRA() {
    return (
        <Grid container sx={{textAlign: "left", lineHeight: 1}} alignItems="center">
            <Grid item xs={12} >
                <Typography variant="h6" p={1}>
                    Mengen
                </Typography>
            </Grid>
            <Grid item xs={4}  >
                <Typography variant="overline" p={1} sx={{textAlign: "left", lineHeight: 1.1}}>2.5 mm/h</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body" p={1}>Leichter Regen</Typography>
            </Grid>
            <Grid item xs={4} mt={1}>
                <Typography variant="overline" p={1} sx={{textAlign: "left", lineHeight: 1.1}} >15 mm/h</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body" p={1}>Mäßiger Regen</Typography>
            </Grid>
            <Grid item xs={4} mt={1}>
                <Typography variant="overline" p={1} sx={{textAlign: "left", lineHeight: 1.1}} >30 mm/h</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body" p={1}>Starker Regen</Typography>
            </Grid>
            <Grid item xs={4} mt={1}>
                <Typography variant="overline" p={1} sx={{textAlign: "left", lineHeight: 1.1}} >> 50 mm/h</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body" p={1}>100-Jähriger Starkegen</Typography>
            </Grid>
        </Grid>

    )
}