import React from 'react';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 51.482578,
        long: -0.007659
      }
    }
  }
  
  render() {
    return (
      <div id='map'></div>
    );
  }
}

export default Map;
