import React from "react";
import {Box, Button, Typography, Grid} from "@mui/material";
import theme from "../../theme/theme";
import { fontWeight } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default props => {
    return (
        <Box p={4} sx={{border: "1px solid #e8e8e8", cursor: "pointer", transition: ".3s", "&:hover": {boxShadow: "0px 5px 25px rgba(0,0,0,0.1)", borderLeft: "4px solid #3f51b5",},}}>
            <Grid container alignItems="center">
                <Grid item xs mr={2} >
                    <Typography variant="h6">{props.nombre}</Typography>
                    <Typography variant="subtitle1">{props.empresa}</Typography>
                    <Grid container mt={1} ml={-0.5}>
                        <Grid item m={0.5} px={1} py={0.2} sx={{borderRadius: "5px", backgroundColor: theme.palette.secondary.main, color: "#fff"}}>
                            <Typography variant="caption">Clave {props.clave}</Typography>
                        </Grid>
                        <Grid item m={0.5} px={1} py={0.2} sx={{borderRadius: "5px", backgroundColor: theme.palette.secondary.main, color: "#fff"}}>
                            <Typography variant="caption">CRN {props.crn}</Typography>
                        </Grid>
                        <Grid item m={0.5} px={1} py={0.2} sx={{borderRadius: "5px", backgroundColor: theme.palette.secondary.main, color: "#fff"}}>
                            <Typography variant="caption">Grupo {props.grupo}</Typography>
                        </Grid>
                    </Grid>
                </Grid>    
                <Grid item container xs={6} px={2}>
                    <Typography variant="body2">{props.objetivo}</Typography>
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs={2} ml={2} mr={2}>
                    <Grid item>
                        <Typography variant="caption">{props.duracion}  |  {props.horas} horas</Typography>
                    </Grid>
                    <Grid item mt={1}>
                        <Typography variant="h4">{props.cupo2}/{props.cupo}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2} sx={{ display: 'flex'}}>
                            <Box mr={1}><Button onClick={props.open} variant="outlined"><AddIcon fontSize="small"></AddIcon></Button></Box>
                            <Box mr={1}><Button onClick={props.open2} variant="outlined" color="success"><GroupOutlinedIcon fontSize="small"></GroupOutlinedIcon></Button></Box>
                            <Box><Button onClick={props.open3} variant="outlined" color="error"><DeleteOutlineIcon fontSize="small"></DeleteOutlineIcon></Button></Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}