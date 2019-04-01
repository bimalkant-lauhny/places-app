import React from 'react';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      focusLocation: null
    }
  }

  render() {
    return (
      <div id='map'></div>
    );
  }
}

export default Map;
