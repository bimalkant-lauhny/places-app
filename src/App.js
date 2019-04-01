import React, { Component } from 'react';
import './App.css';
import Autocomplete from 'react-google-autocomplete';
import SearchNearby from './SearchNearby';
import Map from './Map';
import PlacesList from './PlacesList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {},
      map: null,
      google: null,
      places: [],
      selectedPlace: null
    };
    this.handleFoundLocation = this.handleFoundLocation.bind(this);
    this.zoomLocation = this.zoomLocation.bind(this);
    this.getPlacesFromAPI = this.getPlacesFromAPI.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  zoomLocation(marker) {
    let map = this.state.map;
    map.setZoom(30);
    map.setCenter(marker.getPosition());
  }

  getPlacesFromAPI(query) {
    let google = this.state.google,
        map = this.state.map,
        location = this.state.location;
    let currentLocation = new google.maps.LatLng(location.lat, location.long);
    let request = {
      location: currentLocation,
      radius: '500',
      query: query
    };

    let service = new google.maps.places.PlacesService(map);

    let callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          // create a marker for each place in result
          results[i].marker = new google.maps.Marker({
            map: map,
            position: results[i].geometry.location
          });
          // click on marker to zoom
          results[i].marker.addListener('click', () => {
            this.zoomLocation(results[i].marker);
          });
        }
      }

      this.setState({
        places: results
      });
    };

    service.textSearch(request, callback);
  }

  handlePlaceSelect(selectedPlace) {
    this.setState({
      selectedPlace: selectedPlace
    });
    this.zoomLocation(selectedPlace.marker);
  }

  handleFoundLocation() {
    let google = this.state.google;
    let currentLocation = new google.maps.LatLng(this.state.location.lat, this.state.location.long);
    let mapDiv = document.getElementById('map');
    this.setState({
      map: new google.maps.Map(mapDiv, {
        center: currentLocation,
        zoom: 15
      })
    });
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
        this.handleFoundLocation();
      });
    } else {
      // alert if geolocation is not supported
      alert('Geolocation is not supported by this browser! App will not work correctly.');
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='row'>
          <div className='col'>
            <Autocomplete
              style={{ width: '90%' }}
              onPlaceSelected={(place) => {
                console.log("Location: ", place);
              }}
              types={['(regions)']}
            />
          </div>

          <div className='col'>
            <SearchNearby
              location={this.state.location}
              map={this.state.map}
              google={this.state.google}
              getPlacesFromAPI={this.getPlacesFromAPI}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Map />
          </div>
          <div className='col'>
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

