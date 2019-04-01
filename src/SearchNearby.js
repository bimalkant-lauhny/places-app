import React from 'react';

class SearchNearby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getPlacesFromAPI(this.state.query);
  }

  render() {
    return (
      <div id="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.query} onChange={this.handleChange} />
          <button className="btn btn-primary" type="submit" onSubmit={this.handleSubmit}><i className="fa fa-search"></i></button>
        </form>
      </div>
    );
  }
}

export default SearchNearby;

