import React, {useState, useEffect} from "react";
import { Box, CircularProgress, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme/theme";
import Header from "./components/Header/index";
import Header2 from "./components/Header/index2";
import SearchBar from "./components/SearchBar/index";
import SearchBar2 from "./components/SearchBar/index2";
import Proyecto from "./components/Proyecto/proyecto";
import Proyecto2 from "./components/Proyecto/proyecto2";
import ProjectData from "./dummyData";
import {db, app} from "./firebase/config";
import { collection, Firestore, getDocs, query, where } from "firebase/firestore";
import ProyectoModal from "./components/Proyecto/proyectoModal";
import ProyectoModal2 from "./components/Proyecto/proyectoModal2";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Proyecto/login";
import EstudiantesModal from "./components/Proyecto/estudiantesModal";
import BorrarModal from "./components/Proyecto/borrarModal";
import NuevoProyectoModal from "./components/Proyecto/nuevoProyectoModal";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectosOSF, setProyectosOSF] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewProyecto, setViewProyecto] = useState({});
  const [viewEstudiantes, setViewEstudiantes] = useState({});
  const [viewBorrar, setViewBorrar] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [newProyectoModal, setNewProyectoModal] = useState(false);

  const handleClick = () => {
    setOpen(true); 
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const newProyecto = async proyectoFormulario => {
    await Firestore.collection('proyectos').add(proyectoFormulario);
    fetchProyectosOSF();
  }

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
    // console.log(data); 
    setProyectos(data);
    setLoading(false);
  }

  const fetchProyectosOSF = async () => {
    setLoading(true);
    let conditions = [];
    conditions.push(where("contacto", "==", "osf@gmail.com"));
    let q = query(collection(db, "proyectos"), ...conditions);
    const qSnap = await getDocs(q);
    const data = qSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    // console.log(data); 
    setProyectosOSF(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProyectos();
    fetchProyectosOSF();
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
            <Header2></Header2>
            <NuevoProyectoModal closeModal={() => setNewProyectoModal(false)} newProyectoModal={newProyectoModal} newProyecto={newProyecto}></NuevoProyectoModal>
            <ProyectoModal2 proyecto={viewProyecto} closeModal={() => setViewProyecto({})} handleClick={() => handleClick()} handleClick2={() => handleClick2()}></ProyectoModal2>
            <EstudiantesModal proyecto={viewEstudiantes} closeModal={() => setViewEstudiantes({})}></EstudiantesModal>
            <BorrarModal proyecto={viewBorrar} closeModal={() => setViewBorrar({})}></BorrarModal>
            <Box mb={3}>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SearchBar2 openNewProyectoModal={() => setNewProyectoModal(true)}></SearchBar2>
                  {
                    loading ? <Box mt={5} display="flex" justifyContent="center"><CircularProgress/></Box> : proyectosOSF.map(proyecto => <Proyecto2 open={() => setViewProyecto(proyecto)} open2={() => setViewEstudiantes(proyecto)} open3={() => setViewBorrar(proyecto)} key={proyecto.id} {...proyecto}></Proyecto2>)
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
