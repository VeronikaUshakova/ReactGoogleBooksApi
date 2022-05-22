import './SearchForm.css'
import React from "react";

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="search__form">
        <input onChange={this.props.handleSearch} type="text" className="search__field" />
        <button className="search__button">Search</button>
      </form>
    )
  }
}

export default SearchForm;
