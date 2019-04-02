import React from 'react';

class SearchNearby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPlacesFromAPI = this.getPlacesFromAPI.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getPlacesFromAPI(this.state.query);
  }

  getPlacesFromAPI(query) {
    let { google, map, location } = this.props; 
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
            this.props.zoomLocation(results[i].marker);
          });
        }
      }

      this.props.updatePlaces(results);
    };

    service.textSearch(request, callback);
  }

  render() {
    return (
      <div id="search-nearby" className='d-flex justify-content-center'>
        <form onSubmit={this.handleSubmit}>
          <div id="search-nearby-form-group" className='d-flex align-items-center justify-content-center'>
            <input type="text" placeholder="Enter Search Criteria"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <button className="btn btn-primary" type="submit"
              onSubmit={this.handleSubmit}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchNearby;

