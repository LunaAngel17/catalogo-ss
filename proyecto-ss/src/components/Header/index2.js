import React from 'react';
import {Box, Grid, Typography, Stack } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import logo from '../Header/tecLogo.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}

function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
export default (props) => (
    <Box py={10} bgcolor="secondary.main" color="white">
        <Grid container justifyContent="center">
            <Grid item mt={-4} mr={1} xs={1}>
                <img src={logo} width="100"/>
            </Grid>
            <Grid item xs={6}>
                <Typography fontWeight={700} variant="h4">Creación de Proyectos Solidarios</Typography>
            </Grid>
            <Grid item xs={2} >
                <Box alignItems="center" mt={-1} p={1} sx={{ display: 'flex'}} >
                    <Avatar {...stringAvatar('AEDO MEX')} />
                    <Stack mt={-0.5} spacing={0.5} ml={2}>
                    <Typography fontWeight={700}>AEDOMEX</Typography>
                    <Typography variant="body2" >osf@gmail.com</Typography>
                    </Stack>
                    <Box ml={1}>
                        <MoreVertIcon ></MoreVertIcon>
                    </Box>  
                </Box>
            </Grid>
        </Grid>
    </Box>
);