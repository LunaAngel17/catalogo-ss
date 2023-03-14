import React, {useState, useEffect} from "react";
import {Box, Grid, Typography, Button, Dialog, DialogTitle, IconButton, DialogContent, DialogActions, FilledInput, Select, CircularProgress} from "@mui/material";
import {Close as CloseIcon} from '@mui/icons-material';
import { Stack } from "@mui/system";
import TextField from '@mui/material/TextField'; 
import MenuItem from '@mui/material/MenuItem';

const initState = {
    carreras: "",
    clave: "",
    contacto: "osf@gmail.com",
    crn: "",
    cupo: 0,
    cupo2: 0,
    duracion: "",
    empresa: "",
    fecha: "",
    grupo: "",
    horas: "",
    inscripcion: "",
    modalidad: "",
    nombre: "",
    objetivo: "",
    requisitos: "",
    responsable: "",
    tipo: "",
    ubicacion: "",
    url: "",
};

export default props => {
    const [loading, setLoading] = useState(false);
    const [proyectoFormulario, setProyectoFormulario] = useState(initState);

    function handleChange(evt) {
        const value = evt.target.value; 
        setProyectoFormulario({
          ...proyectoFormulario,
          [evt.target.name]: value
        })
    };

    const handleSubmit = async() => {
        setLoading(true);
        await props.newProyecto(proyectoFormulario);
        closeModal();
    }

    const closeModal = () => {
        setProyectoFormulario(initState);
        setLoading(false);
        props.closeModal();
    }

    console.log(proyectoFormulario);
    return (
    <Dialog open={props.newProyectoModal} fullWidth>
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack>
                    <Typography variant="h6">Nuevo Proyecto</Typography>
                    <Typography variant="subtitle2">Complete el siguiente formulario para agregar un nuevo proyecto.</Typography>    
                </Stack> 
                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent dividers>
            <Box mt={1} mr={4}>
                <Typography variant="subtitle2">1.</Typography>    

                <Box display="flex" mb={1}>
                    <TextField onChange={handleChange} name="nombre" value={proyectoFormulario.nombre} size="small" id="1" label="Nombre" variant="outlined" />
                    <Box display="flex" ml={1}>
                        <TextField onChange={handleChange} name="empresa" value={proyectoFormulario.empresa} size="small" id="2" label="Organización" variant="outlined" />
                    </Box>
                </Box>
                <Box display="flex" mb={3}>
                    <TextField onChange={handleChange} name="clave" value={proyectoFormulario.clave} size="small" id="3" label="Clave" variant="outlined" />
                    <Box display="flex" ml={1}>
                        <TextField onChange={handleChange} name="crn" value={proyectoFormulario.crn} size="small" id="4" label="CRN" variant="outlined" />
                    </Box>
                    <Box display="flex" ml={1}>
                        <TextField onChange={handleChange} name="grupo" value={proyectoFormulario.grupo} size="small" id="5" label="Grupo" variant="outlined" />
                    </Box>
                </Box>
                <Typography variant="subtitle2">2.</Typography>    
                <Box display="flex" mb={3}>
                    <TextField onChange={handleChange} name="objetivo" value={proyectoFormulario.objetivo} size="small" id="6" label="Objetivo" variant="outlined" multiline rows={4}  fullWidth/>
                </Box>

                <Typography variant="subtitle2">3.</Typography>    
                <Box display="flex">
                    <TextField onChange={handleChange} name="duracion" value={proyectoFormulario.duracion} size="small" id="7" label="Duración" variant="outlined" select fullWidth>
                        <MenuItem key={5} value='5 semanas'>5 semanas</MenuItem >
                        <MenuItem key={10} value='10 semanas'>10 semanas</MenuItem >
                        <MenuItem key={15} value='15 semanas'>15 semanas</MenuItem >
                    </TextField>
                    <Box display="flex" mb={1} ml={1}>
                        <TextField onChange={handleChange} name="horas" value={proyectoFormulario.horas} size="small" id="8" label="Horas" variant="outlined" select fullWidth style={{minWidth: 150}}>
                            <MenuItem key={60} value='60 horas'>60 horas</MenuItem >
                            <MenuItem key={80} value='80 horas'>80 horas</MenuItem >
                            <MenuItem key={120} value='150 horas'>150 horas</MenuItem >
                        </TextField>
                    </Box>
                    <Box display="flex" ml={1}>
                        <TextField onChange={handleChange} name="cupo" value={proyectoFormulario.cupo} type="number" size="small" id="9" label="Cupo" variant="outlined" fullWidth/>
                    </Box>
                </Box>
                <Box display="flex" mb={3}>
                    <TextField onChange={handleChange} name="fecha" value={proyectoFormulario.fecha} size="small" id="10" label="Fecha" variant="outlined" select fullWidth >
                        <MenuItem key={1} value='*Semestre* 15 semanas: 13 febrero - 16 junio 2023 (hasta 120 horas) '>*Semestre* 15 semanas: 13 febrero - 16 junio 2023 (hasta 120 horas) </MenuItem >
                        <MenuItem key={2} value='*Semestre* 10 semanas: 13 febrero - 5 mayo 2023 (hasta 80 horas)'>*Semestre* 10 semanas: 13 febrero - 5 mayo 2023 (hasta 80 horas)</MenuItem >
                        <MenuItem key={3} value='*Semestre* 10 semanas: 28 marzo - 16 junio 2023 (hasta 80 horas) '>*Semestre* 10 semanas: 28 marzo - 16 junio 2023 (hasta 80 horas) </MenuItem >
                        <MenuItem key={4} value='*Semestre* 5 semanas: 13 febrero - 17 marzo 2023 (hasta 60 horas) '>*Semestre* 5 semanas: 13 febrero - 17 marzo 2023 (hasta 60 horas) </MenuItem >
                        <MenuItem key={5} value='*Semestre* 5 semanas: 28 marzo - 5 mayo 2023 (hasta 60 horas) '>*Semestre* 5 semanas: 28 marzo - 5 mayo 2023 (hasta 60 horas) </MenuItem >
                        <MenuItem key={6} value='*Semestre* 5 semanas: 15 mayo - 16 junio 2023 (hasta 60 horas) '>*Semestre* 5 semanas: 15 mayo - 16 junio 2023 (hasta 60 horas) </MenuItem >

                    </TextField>
                </Box>

                <Typography variant="subtitle2">4.</Typography>    
                <Box display="flex" mb={1}>
                    <TextField onChange={handleChange} name="inscripcion" value={proyectoFormulario.inscripcion} size="small" id="11" label="Inscripción" variant="outlined" select fullWidth style={{minWidth: 200}}>
                        <MenuItem key={1} value='IRIS'>IRIS</MenuItem >
                        <MenuItem key={2} value='Entrevista'>Entrevista</MenuItem >
                    </TextField>
                <Box display="flex" ml={1}>
                    <TextField onChange={handleChange} name="modalidad" value={proyectoFormulario.modalidad} size="small" id="12" label="Modalidad" variant="outlined" select fullWidth style={{minWidth: 250}}>
                        <MenuItem key={1} value='Remoto'>Remoto</MenuItem >
                        <MenuItem key={2} value='Presencial'>Presencial</MenuItem >
                    </TextField>
                </Box>
                </Box>
                <Box display="flex" mb={1}>
                    <TextField onChange={handleChange} name="ubicacion" value={proyectoFormulario.ubicacion} size="small" id="13" label="Ubicación" variant="outlined" fullWidth/>
                </Box>
                <Box display="flex" mb={3}>
                    <TextField onChange={handleChange} name="url" value={proyectoFormulario.url} size="small" id="14" label="URL" variant="outlined" fullWidth/>
                </Box>

                <Typography variant="subtitle2">5.</Typography>    
                <Box display="flex" mb={1}>
                    <TextField onChange={handleChange} name="responsable" value={proyectoFormulario.responsable} size="small" id="15" label="Responsable" variant="outlined" />
                    <Box display="flex" ml={1}>
                        <TextField onChange={handleChange} name="contacto" value={proyectoFormulario.contacto} size="small" id="16" label="Contacto" variant="outlined" />
                    </Box>
                </Box>
                
                <Box display="flex" mb={1}>
                    <TextField onChange={handleChange} name="carreras" value={proyectoFormulario.carreras} size="small" id="17" label="Carreras" variant="outlined" />
                    <Box display="flex" mb={1} ml={1}>
                        <TextField onChange={handleChange} name="requisitos" value={proyectoFormulario.requisitos} size="small" id="18" label="Requisitos" variant="outlined" />
                    </Box>
                </Box>
                
            </Box>
        </DialogContent>
        <DialogActions>
            <Box mr={3} my={1}>
                <Button onClick={handleSubmit} variant="outlined" disabled={loading}> {loading ? (<CircularProgress color="secondary" size={22} ></CircularProgress>) : "Crear" } </Button> 
            </Box>
        </DialogActions>
    </Dialog>
)};