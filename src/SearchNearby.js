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

