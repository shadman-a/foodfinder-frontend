import React, { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default class Favorites extends Component {
  state = {
    business: [],
  };

  componentDidMount() {
    this.fetchJava();
  }

  componentDidUpdate() {
    this.fetchJava();
  }

  fetchJava = () => {
    const jwtToken = sessionStorage.getItem("jwt");
    fetch(`http://localhost:8081/places/`, {
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
    fetch(`http://localhost:8081/places/${id}`, {
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
