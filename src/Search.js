import React from 'react';
import PlacesList from './PlacesList';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            query: '',
            places: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // set current user location in state
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState ({
                    location: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }
                });
                let google = window.google;
                let currentLocation = new google.maps.LatLng(this.state.location.lat, this.state.location.long);
                let mapDiv = document.getElementById('map');
                this.map = new google.maps.Map(mapDiv, {
                    center: currentLocation,
                    zoom: 15
                });
            });
        } else {
            // alert if geolocation is not supported
            alert("Geolocation is not supported by this browser! App will not work correctly.");
        }
    }

    componentDidMount() {
        
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let google = window.google;
        let currentLocation = new google.maps.LatLng(this.state.location.lat, this.state.location.long);
        let request = {
            location: currentLocation,
            radius: '500',
            query: this.state.query 
        };

        let service = new google.maps.places.PlacesService(this.map);

        let callback = (results, status) => {
            this.setState({
                places: results
            });
            let createMarker = (place) => {
                new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location
                });
            }

            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }

        }

        service.textSearch(request, callback);
    }

    render() {
        return (
            <div>
                <div className="row" id="search-bar">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.query} onChange={this.handleChange} />
                        <button className="btn btn-primary" type="submit" onSubmit={this.handleSubmit}><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div className="row">
                    <div className="col" id="map"></div>
                    <div className="col">
                        <PlacesList places={this.state.places} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;

