import React, {useState, useEffect} from "react";
import { Box, CircularProgress, Grid, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Proyecto from "./components/Proyecto/proyecto";
import ProjectData from "./dummyData";
import {db, app} from "./firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";


export default () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return <ThemeProvider theme={theme}>
    <Header></Header>
    <Box mb={3}>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <SearchBar fetchProyectosFiltrados={fetchProyectosFiltrados}></SearchBar>
          {
            loading ? <Box mt={5} display="flex" justifyContent="center"><CircularProgress/></Box> : proyectos.map(proyecto => <Proyecto key={proyecto.id} {...proyecto}></Proyecto>)
          }
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>;
};
