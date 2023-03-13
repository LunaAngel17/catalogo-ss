import {React, useState, useEffect, oldState, persist} from "react";
import {Box, Button, CircularProgress, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

// const useStyles = makeStyles({
//     wrapper: {
//         backgroundColor: "#fff",
//         display: "flex",
//         boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
//         borderRadius: "5px",
//         "& > *": {
//             flex: 1,
//             height: "45px",
//             margin: "8px",
//         },
//     },
// })

export default (props) => {
    const [loading, setLoading] = useState(false);
    const [proyectoSearch, setProyectoSearch] = useState({
        tipo: "",
        horas: "",
    });

    function handleChange(evt) {
        const value = evt.target.value; 
        setProyectoSearch({
          ...proyectoSearch,
          [evt.target.name]: value
        })
    };

    const search = async () => {
        setLoading(true);
        // console.log(proyectoSearch.horas);
        await props.fetchProyectosFiltrados(proyectoSearch);
        setLoading(false);
    }

    // const classes=useStyles();
    return (
        // <Box className={classes.wrapper}>
        <Box p={2} mt={-5} mb={2} sx={{backgroundColor: "#fff", display: "flex", boxShadow: "0px 1px 5px rgba(0,0,0,0.1)", borderRadius: "5px", "& > *": {flex: 1, height: "45px", margin: "8px"}}}>
            <FormControl variant="filled" sx={{ mx: 1, mt: 0 }} size="small"> 
                <InputLabel id="filter1">Horas</InputLabel>
                <Select labelId="filter1" label="Horas" disableUnderline name="horas" value={proyectoSearch.horas} onChange={handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="60">60 Horas</MenuItem>
                    <MenuItem value="80">80 Horas</MenuItem>
                    <MenuItem value="120">120 Horas</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ mx: 1, mt: 0 }} size="small"> 
                <InputLabel id="filter2">Modalidad</InputLabel>
                <Select labelId="filter2" label="Modalidad" disableUnderline name="tipo" value={proyectoSearch.tipo} onChange={handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="remoto">Remoto</MenuItem>
                    <MenuItem value="presencial">Presencial</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={search} disabled={loading} variant="contained" color="primary" disableElevation>
                {loading ? (
                    <CircularProgress color="secondary" size={22}></CircularProgress>
                ) : (
                    "buscar"
                )}
            </Button>
        </Box>
    )
}