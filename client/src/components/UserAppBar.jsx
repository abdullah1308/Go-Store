import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from '../axios';
import requests from "../request";
import { AppContext } from "../contexts/AppContext";

export default function UserAppBar() {
  const {user, setUser} = useContext(AppContext);

  const logout = () => {
    axios
        .get(requests.logout)
        .then((res) => {
            setUser(null);
        })
  };   

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{mx: 4}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Button color="inherit" sx={{m: 2}}>My Ads</Button>
          <Button color="inherit" variant="outlined">Place an Ad</Button>
          <Button color="inherit" sx={{m: 2}} onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}