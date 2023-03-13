import React, {useState, useEffect} from "react";
import { Box, CircularProgress, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Proyecto from "./components/Proyecto/proyecto";
import ProjectData from "./dummyData";
import {db, app} from "./firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProyectoModal from "./components/Proyecto/proyectoModal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Proyecto/login";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewProyecto, setViewProyecto] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpen2(false);
  };

  const fetchProyectos = async () => {
    setLoading(true);
    const req = await getDocs(collection(db, "proyectos"));
    const tempProyectos = req.docs.map((proyecto) => ({...proyecto.data(), id: proyecto.id}));
    // console.log(tempProyectos);
    setProyectos(tempProyectos);
    setLoading(false);
  }

  const fetchProyectosFiltrados = async proyectoSearch => {
    setLoading(true);
    let conditions = [];
    if (proyectoSearch.horas !== "") conditions.push(where("horas", "==", proyectoSearch.horas));
    if (proyectoSearch.tipo !== "") conditions.push(where("tipo", "==", proyectoSearch.tipo));
    let q = query(collection(db, "proyectos"), ...conditions);
    const qSnap = await getDocs(q);
    const data = qSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(data); 
    setProyectos(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProyectos();
  }, [])

  return (

    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/estudiante' element={
          <ThemeProvider theme={theme}>
            <Header></Header>
            <Snackbar open={open} autoHideDuration={null} onClose={handleClose} sx={{ height: "100%", maxWidth: 400 }} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{"& .MuiAlert-icon": { fontSize: 40 }}}>
                  <AlertTitle variant="h4">Listo!</AlertTitle>
                  La Organización Socio Formadora se pondra en contacto contigo a través de tu correo del TEC para realizar el proceso de entrevista.
                </Alert>
            </Snackbar>

            <Snackbar open={open2} autoHideDuration={null} onClose={handleClose} sx={{ height: "100%", maxWidth: 400 }} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} variant="filled" severity="info" color="warning" sx={{"& .MuiAlert-icon": { fontSize: 40 }}}>
                  <AlertTitle variant="h4">Un paso más!</AlertTitle>
                  En la plataforma de IRIS busca la CLAVE, CRN y GRUPO de este proyecto e inscribelo.
                </Alert>
            </Snackbar>

            <ProyectoModal proyecto={viewProyecto} closeModal={() => setViewProyecto({})} handleClick={() => handleClick()} handleClick2={() => handleClick2()}></ProyectoModal>
            <Box mb={3}>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SearchBar fetchProyectosFiltrados={fetchProyectosFiltrados}></SearchBar>
                  {
                    loading ? <Box mt={5} display="flex" justifyContent="center"><CircularProgress/></Box> : proyectos.map(proyecto => <Proyecto open={() => setViewProyecto(proyecto)} key={proyecto.id} {...proyecto}></Proyecto>)
                  }
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        }/>
        <Route exact path='/socioformador' element={
          <ThemeProvider theme={theme}>
            <Header></Header>
            <Snackbar open={open} autoHideDuration={null} onClose={handleClose} sx={{ height: "100%", maxWidth: 400 }} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{"& .MuiAlert-icon": { fontSize: 40 }}}>
                  <AlertTitle variant="h4">Listo!</AlertTitle>
                  La Organización Socio Formadora se pondra en contacto contigo a través de tu correo del TEC para realizar el proceso de entrevista.
                </Alert>
            </Snackbar>

            <Snackbar open={open2} autoHideDuration={null} onClose={handleClose} sx={{ height: "100%", maxWidth: 400 }} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert onClose={handleClose} variant="filled" severity="info" color="warning" sx={{"& .MuiAlert-icon": { fontSize: 40 }}}>
                  <AlertTitle variant="h4">Un paso más!</AlertTitle>
                  En la plataforma de IRIS busca la CLAVE, CRN y GRUPO de este proyecto e inscribelo.
                </Alert>
            </Snackbar>

            <ProyectoModal proyecto={viewProyecto} closeModal={() => setViewProyecto({})} handleClick={() => handleClick()} handleClick2={() => handleClick2()}></ProyectoModal>
            <Box mb={3}>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SearchBar fetchProyectosFiltrados={fetchProyectosFiltrados}></SearchBar>
                  {
                    loading ? <Box mt={5} display="flex" justifyContent="center"><CircularProgress/></Box> : proyectos.map(proyecto => <Proyecto open={() => setViewProyecto(proyecto)} key={proyecto.id} {...proyecto}></Proyecto>)
                  }
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        }/>

        </Routes>
      </Router>

  )
};
