import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HiSearch } from 'react-icons/hi';

class SearchForm extends Component {
  render() {
    const { search, handleInputChange, disabled, handleSearchButtonClick } = this.props;

    return (
      <div className="Search__main__search-form">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Artist Name"
          autoComplete="off"
          value={ search }
          onChange={ handleInputChange }
        />

        <button
          type="button"
          disabled={ disabled }
          onClick={ handleSearchButtonClick }
        >

          <HiSearch />
        </button>
      </div>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleSearchButtonClick: PropTypes.func.isRequired,
};

export default SearchForm;
