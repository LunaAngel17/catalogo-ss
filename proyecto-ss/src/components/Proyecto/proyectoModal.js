import react from "react";
import {Box, Grid, Typography, Button, Dialog, DialogTitle, IconButton, DialogContent, DialogActions} from "@mui/material";
import {Close as CloseIcon} from '@mui/icons-material';
import { Stack } from "@mui/system";

export default props => (
    <Dialog open={!!Object.keys(props.proyecto).length} fullWidth>
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack>
                    <Typography variant="h6">{props.proyecto.nombre}</Typography>
                    <Typography variant="subtitle2">{props.proyecto.empresa}</Typography>    
                </Stack> 
                <IconButton onClick={props.closeModal}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent dividers>
            <Box mt={1} mr={4}>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Fecha: </Typography>
                    <Typography variant="caption">{props.proyecto.fecha}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Inscripción: </Typography>
                    <Typography variant="caption">{props.proyecto.inscripcion}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Modalidad: </Typography>
                    <Typography variant="caption">{props.proyecto.modalidad}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Ubicación: </Typography>
                    <Typography variant="caption">{props.proyecto.ubicacion}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Conoce a la OSF: </Typography>
                    <Typography variant="caption">{props.proyecto.url}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Responsable: </Typography>
                    <Typography variant="caption">{props.proyecto.responsable}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Contacto: </Typography>
                    <Typography variant="caption">{props.proyecto.contacto}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Carreras: </Typography>
                    <Typography variant="caption">{props.proyecto.carreras}</Typography>
                </Box>
                <Box display="flex" mb={1}>
                    <Typography mr={1} fontWeight={700} variant="caption">Requisitos: </Typography>
                    <Typography variant="caption">{props.proyecto.requisitos}</Typography>
                </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Box mr={3} my={1}>
                <Button variant="outlined" onClick={event =>{props.closeModal(); props.proyecto.inscripcion=="Entrevista" ?  props.handleClick() : props.handleClick2()}}>Aplicar</Button> 
            </Box>
        </DialogActions>
    </Dialog>
)