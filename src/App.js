import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Paper,
  Button,
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

import Form from 'react-bootstrap/Form'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


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

  useEffect(() => {
    getLocation();
    fetchApi();
  });

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
    fetch(`http://localhost:8081/yelp`, {
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
        <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            🍔Food Finder
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div className="mr-auto">
              <Button href="/">Home</Button>
              <Button  href="/map">Map</Button >
              <Button  href="/favorites">Favorites</Button >
              {sessionStorage.getItem("jwt") === null ?
                <Button  href="/login">Log In</Button > : <Button  href="/login">{sessionStorage.getItem("username")}</Button>}
            </div>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-sm-2"
                value={search}
                onChange={(event) => handleChange(event)} />
              <Button variant="outline-info" onClick={() => fetchApi()}>Search</Button>
              <Button>
                <FaLocationArrow onClick={() => getLocation()} style={{
                  fontSize: 16}}  />
                  </Button>
                </Form>
        </Toolbar>
      </AppBar>
    </Box>
              <Router>
                <Route exact path="/" render={() => <Home lng={lng} lat={lat} buisnessArray={buisnessArray} />} />
                <Route exact path="/map" render={() => <Mapa lng={lng} lat={lat} buisnessArray={buisnessArray} />} />
                <Route exact path="/favorites" render={() => <Favorites />} />
                <Route exact path="/fav" component={FavoritesView} />
                <Route exact path="/login" component={Login} />
              </Router>
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
            >
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
            </Paper>
          </>
        </ThemeProvider>
      );
    }
    