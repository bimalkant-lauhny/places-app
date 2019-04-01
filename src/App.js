import React, { Component } from 'react';
import './App.css';
import Search from './Search';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {},
      map: null,
      google: null
    };
  }

  componentWillMount() {
    // set current user location in state
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            long: position.coords.longitude
          },
          google: window.google
        });
        let google = this.state.google;
        let currentLocation = new google.maps.LatLng(this.state.location.lat, this.state.location.long);
        let mapDiv = document.getElementById('map');
        this.setState({
          map: new google.maps.Map(mapDiv, {
          center: currentLocation,
          zoom: 15
        })});
      });
    } else {
      // alert if geolocation is not supported
      alert("Geolocation is not supported by this browser! App will not work correctly.");
    }
  }

  render() {
    return (
      <div className="App">
        <Search
          location={this.state.location}
          map={this.state.map}
          google={this.state.google}
        />
      </div>
    );
  }
}

export default App;

