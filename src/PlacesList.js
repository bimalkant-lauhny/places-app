import React from 'react';

function ListItem(props) {
    return (
        <li className="list-group-item">
            <p>{props.name}</p>
            <p>{props.address}</p>
        </li>
    );
}

function PlacesList(props) {
    const places = props.places;
    console.log("Places: ", places);
    return (
        <div className="row" id='places-list'>
            <ul className="list-group">
                {
                    places.map((place, index) => {
                        return (
                            <ListItem key={index.toString()}
                                name={place.name}
                                address={place.formatted_address}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default PlacesList;