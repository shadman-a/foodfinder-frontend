import React, { Component } from "react";
import Card from 'react-bootstrap/Card'



const YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY;

export default class Favorites extends Component {
  state = {
    business: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    fetch(
      `https://mysterious-bayou-17398.herokuapp.com/https://api.yelp.com/v3/businesses/${this.props.location.state.yelp}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          business: result,
        })
      );
  };

  render() {
    return (
      <div>
        <h1>{this.state.business.name}</h1>
        <Card style={{ width: '50rem' }}>
          <Card.Img variant="top" src={this.state.business.image_url} />
          <Card.Header as="h5">{this.state.business.display_phone}</Card.Header>
          <Card.Body>
            <Card.Title>Rating: {this.state.business.rating}</Card.Title>
            <Card.Title>Price: {this.state.business.price}</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
        </Card> 
      </div>
    );
  }
}
