// import React, { Component } from 'react'
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


// const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


// class Mapa extends Component {

//   state = {
//     activeMarker: {},
//     selectedPlace: {},
//     showingInfoWindow: false
//   };

//   onMarkerClick = (props, marker) =>
//     {this.setState({
//       activeMarker: marker,
//       selectedPlace: props,
//       showingInfoWindow: true
      
//     });
//   }

//   onInfoWindowClose = () =>
//    { this.setState({
//       activeMarker: null,
//       showingInfoWindow: false
//     });
//   }

//   onMapClicked = () => {
//     if (this.state.showingInfoWindow)
//       this.setState({
//         activeMarker: null,
//         showingInfoWindow: false
//       });
//   };

//   displayMarkers = () => {
//     return this.props.buisnessArray.map((store, index) => {
//       return  <Marker key={index} title={store.name} link={store.url} id={store.id} position={{
//        lat: store.coordinates.latitude,
//        lng: store.coordinates.longitude
//      }}
//      onClick={this.onMarkerClick} > 
//      </Marker>
//     })
//   }
//   render() {
//     return (
//       <div >
//         <Map
//         google={this.props.google}
//         zoom={13}
//         style={mapStyles}
//         onClick={this.onMapClicked}
//         initialCenter={{ lat: this.props.lat, lng: this.props.lng}}
//         >          
//         {this.displayMarkers()}
//         <InfoWindow
//      marker={this.state.activeMarker}
//      onClose={()=>this.onInfoWindowClose}
//      visible={this.state.showingInfoWindow}
//     >
//       <div>
//     <h3 style={{color: "black"}} >{this.state.selectedPlace.title}</h3>
//     <a style={{color: "black"}} href={this.state.selectedPlace.link}>
//             See on Yelp
//           </a>
//       </div>
//   </InfoWindow>
//         </Map>
//       </div>
//     );
//   }
// }

// const mapStyles = {
//   width: '100%',
//   height: '92.5%',
// };

// export default (
//   GoogleApiWrapper({
//       apiKey: GOOGLE_API_KEY
//   })(Mapa)
// )
