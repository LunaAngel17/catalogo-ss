import React from 'react';
import {Box, Grid, Typography, Button, CardMedia } from "@mui/material";
import logo from '../Header/tecLogo.png';

export default (props) => (
    <Box py={10} bgcolor="secondary.main" color="white">
        <Grid container justifyContent="center">
            <Grid item mt={-4} mr={1} xs={1}>
                <img src={logo} width="100"/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h4">Proyectos de Servicio Social</Typography>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" disableElevation>Nuevo Proyecto</Button>
            </Grid>
        </Grid>
    </Box>
);