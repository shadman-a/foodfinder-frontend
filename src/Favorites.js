import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Favorites extends Component {
  state = {
    business: [],
  };

  componentDidMount() {
    this.fetchJava();
  }

  // componentDidUpdate() {
  //   this.fetchJava();
  // }

  fetchJava = () => {
    const jwtToken = sessionStorage.getItem("jwt");
    fetch(`https://foodfinder-backend.onrender.com/places/`, {
      headers: { Authorization: jwtToken, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          business: result,
        })
      );
  };

  deleteJava = (id) => {
    const jwtToken = sessionStorage.getItem("jwt");
    fetch(`https://foodfinder-backend.onrender.com/places/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: jwtToken,
        "Content-Type": "application/json",
      }),
    });
  };

  render() {
    const favoriteList = this.state.business.map((obj) => {
      if (obj.user === sessionStorage.getItem('username')) 
        return (
      <ListItem>
        <ListItemText primary={obj.name} secondary={obj.address} />
        <Link
          to={{
            pathname: "/fav",
            state: { yelp: obj.yelpid },
          }}
        >
          <Button>More Info</Button>
        </Link>
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              this.deleteJava(obj.id);
            }}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>)
           else return (null)})
    if (sessionStorage.getItem("jwt") === null) {
      return <h1>Please Log in to see Favorites</h1>;
    } else {
      return (
        <div>
          <Typography variant="h6">Favorites</Typography>
          <div>
            <List dense={false}>{favoriteList}</List>
          </div>
        </div>
      );
    }
  }
}
