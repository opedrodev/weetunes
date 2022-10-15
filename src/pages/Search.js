import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import '../styles/Search.scss';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searched: '',
      disabled: true,
      showInfo: false,
      noResults: false,
      searchResults: [],
    };
  }

  /**
   * Captures the input value and updates the state.
   * @param {Object} event - Input change event.
   */
  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value, disabled: value.length < 2 });
  };

  /**
   * Get the search results from the API and updates the state.
   */
  handleSearchButtonClick = () => {
    const { search } = this.state;

    searchAlbumsAPI(search).then((response) => {
      if (response.length === 0) this.setState({ noResults: true });

      this.setState({ searchResults: response });
    });

    this.setState({ search: '', searched: search, showInfo: true, disabled: true });
  };

  render() {
    const { search, searched, disabled, searchResults, showInfo, noResults } = this.state;
    return (
      <div className="search">
        <Header />

        <main className="search__main">
          <SearchForm
            search={ search }
            disabled={ disabled }
            handleInputChange={ this.handleInputChange }
            handleSearchButtonClick={ this.handleSearchButtonClick }
          />

          {!showInfo && (
            <p className="search__main__no-search">
              You didn&apos;t search anything yet
            </p>
          )}

          {showInfo && (
            <p className="search__main__results">
              Album results from:
              &nbsp;
              {searched}
            </p>
          )}

          <div className="search__main__albums">
            {noResults && searchResults.length === 0 ? <p>Nenhum álbum foi encontrado</p>
              : (
                searchResults.map((item) => (
                  <Link
                    key={ item.collectionId }
                    to={ `/album/${item.collectionId}` }
                    className="album"
                  >
                    <img
                      src={ item.artworkUrl100 }
                      alt={ item.collectionName }
                      className="album__image"
                    />
                    <p className="album__collection-name">{ item.collectionName }</p>
                    <p className="album__artist-name">{ item.artistName }</p>
                  </Link>
                ))
              )}
          </div>
        </main>
      </div>
    );
  }
}

export default Search;
