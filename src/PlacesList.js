import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            active: true
        });
    }

    render() {
        let classes = "list-group-item";
        if (this.state.active)
            classes += " active";
        return (
            <li className={classes} onClick={this.handleClick}>
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
                            return (
                                <ListItem key={index.toString()}
                                    place={place}
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