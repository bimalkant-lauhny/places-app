import React, { Component } from 'react';
import './App.css';
import SearchLocation from './SearchLocation';
import SearchNearby from './SearchNearby';
import Map from './Map';
import PlacesList from './PlacesList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: 'Greenwich, London, UK', 
      location: {
        lat: 51.482578,
        long: -0.007659
      },
      google: window.google,
      map: null,
      places: [],
      selectedPlace: null
    };
    this.handleFoundLocation = this.handleFoundLocation.bind(this);
    this.zoomLocation = this.zoomLocation.bind(this);
    this.updateLocationAddress = this.updateLocationAddress.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  zoomLocation(marker) {
    let { map } = this.state;
    map.setZoom(20);
    map.setCenter(marker.getPosition());
  }

  updatePlaces(places) {
    this.setState({
      places: places,
      selectedPlace: null
    });
  }

  updateLocationAddress(place) {
    this.setState({
      address: place.address,
      location: place.location
    });
    console.log("Reset Location: ", this.state);
    this.handleFoundLocation(document.getElementById('map'));
  }
  
  handlePlaceSelect(selectedPlace) {
    this.setState({
      selectedPlace: selectedPlace
    });
    this.zoomLocation(selectedPlace.marker);
    console.log("After clicking on list item: ", this.state);
  }

  handleFoundLocation(mapElement) {
    let { google, map, location } = this.state;
    let currentLocation = new google.maps.LatLng(location.lat, location.long);
    if (!map) {
      this.setState({
        map: new google.maps.Map(mapElement, {
          center: currentLocation,
          zoom: 10
        })
      });
    } else {
      map.setCenter(currentLocation);
      map.setZoom(10);
    }
    console.log(this.state);
  }

  render() {
    return (
      <div className='App'>
        <div className='row'>
          <div className='col-md-6'>
            <SearchLocation
              map={this.state.map}
              google={this.state.google}
              location={this.state.location}
              address={this.state.address}
              updateLocationAddress={this.updateLocationAddress}
            />
          </div>

          <div className='col-md-6'>
            <SearchNearby
              location={this.state.location}
              map={this.state.map}
              google={this.state.google}
              updatePlaces={this.updatePlaces}
              zoomLocation={this.zoomLocation}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <Map
              map={this.state.map}
              google={this.state.google}
            />
          </div>
          <div className='col-md-6'>
            <PlacesList
              places={this.state.places}
              handlePlaceSelect={this.handlePlaceSelect}
              selectedPlace={this.state.selectedPlace}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

