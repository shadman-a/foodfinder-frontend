import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Button,
  InputBase,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { FaLocationArrow } from 'react-icons/fa'

import Home from './Home'
import Favorites from './Favorites';
import Mapa from './Map'
import FavoritesView from './FavoritesView'
import Login from './components/Login';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [buisnessArray, setBuisnessArray] = useState([]);
  const [lng, setLng] = useState(-73.935242);
  const [lat, setLat] = useState(40.730610);
  const [darkTheme, setDarkTheme] = useState(createTheme({
    palette: {
      mode: 'dark',
    },
  }));

  const url = "https://foodfinder-backend.onrender.com/";

  useEffect(() => {
    getLocation();
    fetchApi();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        setLat(lat);
        setLng(lng);
      },
      (error) => {
        console.error(JSON.stringify(error))
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  const fetchApi = () => {
    fetch(url + `yelp`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        term: search.replace(/\s/g, ''),
        lat: lat,
        long: lng
      }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        setBuisnessArray(result.businesses);
        setSearch("");
      });
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{color: "white", textDecoration: "none"}}>
                  🍔Food Finder
                </Link>
              </Typography>
              <Button color="inherit">
                <Link to="/map" style={{color: "white", textDecoration: "none"}}>
                  Map
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/favorites" style={{color: "white", textDecoration: "none"}}>
                  Favorites
                </Link>
              </Button>
              {sessionStorage.getItem("jwt") === null ?
                <Button color="inherit">
                  <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                    Log In
                  </Link>
                </Button>
          : <Button color="inherit">
          <Link to="/login" style={{color: "white", textDecoration: "none"}}>
            {sessionStorage.getItem("username")}
          </Link>
        </Button>}
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <InputBase
          placeholder="Search"
          value={search}
          onChange={(event) => handleChange(event)}
          sx={{ ml: 1, color: 'inherit', flexGrow: 1 }}
        />
        <IconButton onClick={() => fetchApi()} sx={{ p: '10px' }} color="inherit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10.706 2.292c-2.681 2.681-2.681 7.025 0 9.706s7.025 2.681 9.706 0c2.681-2.681 2.681-7.025 0-9.706s-7.025-2.681-9.706 0zm.708 8.998c-1.941 0-3.5-1.559-3.5-3.5s1.559-3.5 3.5-3.5 3.5 1.559 3.5 3.5-1.559 3.5-3.5 3.5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </IconButton>
        <IconButton onClick={() => getLocation()} sx={{ p: '10px' }} color="inherit">
          <FaLocationArrow style={{ fontSize: 16 }} />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"/>
          </svg>
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
  <Toolbar />
  <Route exact path="/" render={() => <Home lng={lng} lat={lat} buisnessArray={buisnessArray} url={url}/>} />
  <Route exact path="/map" render={() => <Mapa lng={lng} lat={lat} buisnessArray={buisnessArray} url={url}/>} />
  <Route exact path="/favorites" render={() => <Favorites url={url}/>} />
  <Route exact path="/fav" render={() => <FavoritesView url={url}/>} />
  <Route exact path="/login" render={() => <Login url={url}/>} />
</Router>
<BottomNavigation
  showLabels
>
  <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
  <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
</BottomNavigation>
</>
</ThemeProvider>
  )
}