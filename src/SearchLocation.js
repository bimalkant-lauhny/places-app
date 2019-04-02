import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SearchLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: 'Greenwich, London, UK', 
      location: {
        lat: 51.482578,
        long: -0.007659
      }
    };
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
      .catch(error => console.error('Error', error));
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