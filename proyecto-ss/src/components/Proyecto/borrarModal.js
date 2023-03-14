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
                <Typography variant="h6">¿Estas seguro que quieres eliminar este proyecto?</Typography>
            </Box>
        </DialogContent>
        <DialogActions>
            <Box mr={3} my={1}>
                <Button variant="outlined" color="error">Borrar</Button> 
            </Box>
        </DialogActions>
    </Dialog>
)