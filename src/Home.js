import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default class Home extends Component {
  state = {
    lng: this.props.lng,
    lat: this.props.lat,
    showHide: false,
  };

  postToJava = (id, name, address) => {
    const jwtToken = sessionStorage.getItem("jwt");
    fetch("https://infinite-river-88630.herokuapp.com/places/", {
      method: "post",
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        yelpid: id,
      }),
    }).then(this.setState({
      objName: name,
      objLocation: address
    }));
    this.handleModalShowHide()
  };

  handleModalShowHide = () => {
    this.setState({
      showHide: !this.state.showHide,
    })
  }

  modal = () => {
    return (
      <Modal show={this.state.showHide}>
        <Modal.Header>
          <Modal.Title>Would you like an email confirmation?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Would you like an email confirmation?</Modal.Body> */}
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.sendEmail()}>
            Yes
          </Button>
          <Button variant="primary" onClick={() => this.handleModalShowHide()}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  sendEmail = () => {
      const jwtToken = sessionStorage.getItem("jwt");
      fetch("https://infinite-river-88630.herokuapp.com/send/", {
      method: "post",
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_address: "shadman@outlook.com",
        subject: "FoodFinder-New Resturant Added",
        body: `You have added ${this.state.objName} to your favorites located at ${this.state.objLocation}`
      }),
    }).then((response) => {});
    this.handleModalShowHide()
  }

  render() {
    const card = this.props.buisnessArray.map((obj) => (
      <Card style={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            style={{ height: 140 }}
            image={obj.image_url}
            title={obj.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {obj.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {obj.location.address1}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button href={obj.url} size="small" color="primary">
            See on yelp
          </Button>
          {sessionStorage.getItem("jwt") === null ? (
            <Link to={{ pathname: "/login" }}>
              <Button size="small" color="primary">
                Log in to ❤️
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => this.postToJava(obj.id, obj.name, obj.location.address1)}
              size="small"
              color="primary"
            >
              Add to favorites
            </Button>
          )}
        </CardActions>
      </Card>
    ));
    return (
      <>
      {this.modal()}
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={0.5}>
            {card}
          </Grid>
        </div>
      </>
    );
  }
}
