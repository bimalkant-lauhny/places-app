import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SearchLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '', 
      location: {} 
    };
    this.getCurrentLocation();
  }
  
  setFallbackAddress = () => {
    this.setState({
      address: 'Greenwich, London, UK', 
      location: {
        lat: 51.482578,
        long: -0.007659
      },
    });
    this.props.updateLocationAddress(this.state);
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

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      let successCallback = (position) => {
        console.log("position: ", position);
        let location = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
          address = 'UNKNOWN ADDRESS!';

        let { google } = this.props;
        let geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(location.lat, location.lng);
        this.findLatLang(latlng, geocoder)
          .then(result => {
            address = result;
            this.props.updateLocationAddress({
              location: location,
              address: address
            })
            console.log("Found Address: ", this.state);
          })
          .catch(error => {
            this.props.updateLocationAddress({
              location: location,
              address: address
            })
            console.error(error, this.state);
          });
      };

      let errorCallback = (err) => {
        console.log("Geolocation Navigator Error", err);
        if (err.code === 1) {
          alert("Geolocation Permission Denied! Choose your location manually.")
        }
        this.setFallbackAddress();
      }

      let options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    } else {
      // alert if geolocation is not supported
      alert('Geolocation is not supported by this browser! Manually enter your location.');
      this.setFallbackAddress();
    }
  }

  handleChange = address => {
    this.setState({ address: address });
  };
 
  handleSelect = address => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          location: latLng
        });
        this.props.updateLocationAddress(this.state);
      })
      .catch(error => {
        console.error("Geocode Error: ", error);
        alert('Geocode API Error! Request Quota Exceeded. Add your own API key to index.html to use this app.');
        this.props.updateLocationAddress(this.state);
      });
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div id='search-location'>
            <div id="search-location-form-group" className='d-flex align-items-center justify-content-center'>
              <input
                {...getInputProps({
                  placeholder: 'Select Your Location',
                  className: 'location-search-input',
                })}
              />
              <button className="btn btn-danger" type="submit">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default SearchLocation;