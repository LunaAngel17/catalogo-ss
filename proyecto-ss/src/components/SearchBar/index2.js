import {React, useState, useEffect, oldState, persist} from "react";
import {Box, Button, CircularProgress, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default (props) => {

    // const classes=useStyles();
    return (
        // <Box className={classes.wrapper}>
        <Box p={2} mt={-5} mb={2} sx={{backgroundColor: "#fff", display: "flex", boxShadow: "0px 1px 5px rgba(0,0,0,0.1)", borderRadius: "5px", "& > *": {flex: 1, height: "45px", margin: "8px"}}}>
            <Button onClick={props.openNewProyectoModal} variant="contained" color="primary" disableElevation>
                <AddIcon></AddIcon> agregar nuevo proyecto solidario
            </Button>
        </Box>
    )
}