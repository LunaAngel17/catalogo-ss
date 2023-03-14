import react from "react";
import {Box, Grid, Typography, Button, Dialog, DialogTitle, IconButton, DialogContent, DialogActions} from "@mui/material";
import {Close as CloseIcon} from '@mui/icons-material';
import { Stack } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(nombre, email, carrera, semestre) {
    return { nombre, email, carrera, semestre };
  }
  
  const rows = [
    createData('Angel Luna', 'a01177358@tec.mx', 'ITC', 8),
    createData('Andres Guerra', 'a00828452@tec.mx', 'ITC', 8),
    createData('Diego Babb', 'a01720805@tec.mx', 'IFI', 8),
    createData('Dave Camela', 'a01734025@tec.mx', 'IFI', 8),
  ];
  
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre </TableCell>
                        <TableCell align="center">Correo</TableCell>
                        <TableCell align="center">Carrera</TableCell>
                        <TableCell align="center">Semestre</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.nombre}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.carrera}</TableCell>
                        <TableCell align="center">{row.semestre}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
            <Box mr={3} my={1}>
            </Box>
        </DialogActions>
    </Dialog>
)