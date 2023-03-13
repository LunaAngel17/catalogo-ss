import React, { useState} from 'react'
import { Grid, Paper, Avatar, TextField, Checkbox, FormControlLabel, Button, InputAdornment, IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import LoginIcon from '@mui/icons-material/Login';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const paperStyle = {padding: 20, height: '50vh', width: 280, margin: "auto"};
    const avatarStyle = {backgroundColor:"#4D64E4"}
    const iconStyle = {color:"#0B0B15"}
    const buttonStyle = {backgroundColor: "#4D64E4"}
    const pageStyle = {
        // backgroundImage: `url(${require('../images/backgroundLogin.jpg').default})`,
        backgroundColor: "#4D64E4",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
    }

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignIn = async () => {
        try {
            // Get the user document from the "users" collection with the provided email
            const userDocRef = doc(collection(db, "users"), username);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.password === password) {
                    console.log('Successfully signed in');
                    if (userData.userType === 'socioformador'){
                        navigate('/socioformador', { state: {userData}});
                    }
                    else if (userData.userType === 'estudiante'){
                        navigate('/estudiante', { state: {userData}});
                    }
                } else {
                    console.error('Incorrect password');
                }
            } else {
                console.error('User does not exist');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    }

  return (
    <div style={pageStyle}>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LoginIcon style={iconStyle}/></Avatar>
                    <h2> Sign In </h2>
                    <TextField label='Username' placeholder='Enter username' sx={{marginBottom:1}} fullWidth required value={username} onChange={handleUsernameChange} />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        type={showPassword ? 'text': 'password'}
                        fullWidth
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={buttonStyle} fullWidth onClick={handleSignIn} >Sign in</Button>
                </Grid>
            </Paper>
        </Grid>
    </div>
  )
}
