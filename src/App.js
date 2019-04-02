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
    let map = this.state.map;
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

  findLatLang = (latLng, geocoder) => {
    return new Promise(function (resolve, reject) {
      geocoder.geocode({ 'latLng': latLng }, function (results, status) {
        console.log("Printing Result anyways: ", results);
        if (status === window.google.maps.GeocoderStatus.OK) {
          console.log(results);
          resolve(results[0].formatted_address);
        } else {
          alert("Geocode API Error: " + status);
          reject(new Error('Couldnt\'t find address'));
        }
      })
    });
  } 

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position: ", position);
        let location = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
          address = 'UNKNOWN ADDRESS!';

        let { google } = this.state;
        let geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(location.lat, location.lng);
        this.findLatLang(latlng, geocoder)
          .then(result => {
            address = result;
            this.updateLocationAddress({
              location: location,
              address: address
            })
            console.log("Found Address: ", this.state);
          })
          .catch(error => {
            this.updateLocationAddress({
              location: location,
              address: address
            })
            console.error(error, this.state);
          });
      });
    } else {
      // alert if geolocation is not supported
      alert('Geolocation is not supported by this browser! Manually enter your location.');
    }    
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

