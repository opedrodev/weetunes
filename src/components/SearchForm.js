import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  render() {
    const { search, handleInputChange, disabled, handleSearchButtonClick } = this.props;

    return (
      <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Nome do Artista"
          autoComplete="off"
          value={ search }
          onChange={ handleInputChange }
          data-testid="search-artist-input"
        />

        <button
          type="button"
          disabled={ disabled }
          onClick={ handleSearchButtonClick }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
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
