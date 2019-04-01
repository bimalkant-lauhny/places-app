import React from 'react';
import PlacesList from './PlacesList';

class Map extends React.Component {
  render() {
    return (
      <div id='map'></div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      places: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let google = this.props.google,
        map = this.props.map,
        location = this.props.location;
    let currentLocation = new google.maps.LatLng(location.lat, location.long);
    let request = {
      location: currentLocation,
      radius: '500',
      query: this.state.query
    };

    let service = new google.maps.places.PlacesService(map);

    let callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          // create a marker for each place in result
          let marker = new google.maps.Marker({
            map: map,
            position: results[i].geometry.location
          });
          // click on marker to zoom
          marker.addListener('click', () => {
            map.setZoom(30);
            map.setCenter(marker.getPosition());
          });
          // add marker to result (passing to PlacesList)
          results[i].marker = marker;
        }
      }

      this.setState({
        places: results
      });
    }

    service.textSearch(request, callback);
  }

  render() {
    return (
      <div>
        <div className="row" id="search-bar">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.query} onChange={this.handleChange} />
            <button className="btn btn-primary" type="submit" onSubmit={this.handleSubmit}><i className="fa fa-search"></i></button>
          </form>
        </div>
        <div className="row">
          <div className="col">
            <Map
              location={this.props.location}
              map={this.props.map}
            />
          </div>
          <div className="col">
            <PlacesList places={this.state.places} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

