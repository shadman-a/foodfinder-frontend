import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Button
} from "@material-ui/core";
import { FaLocationArrow } from 'react-icons/fa'

import Home from './Home'
import Favorites from './Favorites';
import Mapa from './Map'
import FavoritesView from './FavoritesView'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Login from './components/Login';



const YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY;

export default class App extends React.Component{

  state = {
    search: "",
    locationSearch: "",
    buisnessArray: [],
    lng: -122.431297,
    lat: 37.773972,
  };

  componentDidMount(){
    this.getLocation()
    this.fetchApi()
  }

  getLocation=()=>{
    navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude
          let lng = position.coords.longitude
          console.log("getCurrentPosition Success " + lat + lng) 
          this.setState({
            lat: lat,
            lng: lng
          })
        },
        (error) => {
          console.error(JSON.stringify(error))
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
  }

  fetchApi=()=>{
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${this.state.search}&latitude=${this.state.lat}&longitude=${this.state.lng}`,{
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${YELP_API_KEY}`
        },
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(result => this.setState({
        buisnessArray: result.businesses
    }),
    this.setState({
        search: ""
    })
)}

  handleChange = (event) => {
    this.setState({ search: event.target.value }); 
  };

  render() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">🍔Food Finder</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/map">Map</Nav.Link>
      <Nav.Link href="/favorites">Favorites</Nav.Link>
      <Nav.Link href="/login">
        {sessionStorage.getItem("jwt") === null ? ("Log In"):("Log out")}
        </Nav.Link>
    </Nav>
    <Form inline>
      <Form.Control type="text" placeholder="Search" className="mr-sm-2" 
      value={this.state.search}
      onChange={(event) => this.handleChange(event)}/>
      <Button variant="outline-info" onClick={() => this.fetchApi()}>Search</Button>
      <Button>
      <FaLocationArrow onClick={()=>this.getLocation()} style={{fontSize: 16}} />
      </Button>
    </Form>
  </Navbar>
    <Router>
          <Route exact path="/" render={() => <Home lng={this.state.lng} lat={this.state.lat} buisnessArray={this.state.buisnessArray}/>}  />
          <Route exact path="/map" render={() => <Mapa lng={this.state.lng} lat={this.state.lat} buisnessArray={this.state.buisnessArray}/>} />
          <Route exact path="/favorites" render={() => <Favorites />}/>
          <Route exact path="/fav" component={FavoritesView}/>
          <Route exact path="/login" component={Login}/>
      </Router>

  </div>

    
  );
}
}

