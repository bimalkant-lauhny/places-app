import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.handlePlaceSelect(this.props.place);
  }

  render() {
    return (
      <li className={this.props.classes} onClick={this.handleClick}>
        <p>{this.props.place.name}</p>
        <p>{this.props.place.formatted_address}</p>
      </li>
    );
  }
}

class PlacesList extends React.Component {
  render() {
    const places = this.props.places;
    console.log("Places: ", places);
    return (
      <div className="row" id='places-list'>
        <ul className="list-group">
          {
            places.map((place, index) => {
              let classes = "list-group-item";
              if (this.props.selectedPlace === place) {
                classes += " active";
              }
              return (
                <ListItem
                  key={index.toString()}
                  place={place}
                  handlePlaceSelect={this.props.handlePlaceSelect}
                  classes={classes}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default PlacesList;