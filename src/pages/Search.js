import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value, disabled: value.length < 2 });
  };

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
      <div data-testid="page-search">
        <Header />

        <SearchForm
          search={ search }
          disabled={ disabled }
          handleInputChange={ this.handleInputChange }
          handleSearchButtonClick={ this.handleSearchButtonClick }
        />

        {
          showInfo && (
            <p>
              Resultado de álbuns de:
              &nbsp;
              {searched}
            </p>
          )
        }

        {
          noResults && searchResults.length === 0 ? <p>Nenhum álbum foi encontrado</p>
            : (
              searchResults.map((item) => (
                <div key={ item.collectionId }>
                  <img src={ item.artworkUrl100 } alt={ item.collectionName } />
                  <p>{ item.collectionName }</p>
                  <p>{ item.artistName }</p>
                  <Link
                    to={ `/album/${item.collectionId}` }
                    data-testid={ `link-to-album-${item.collectionId}` }
                  >
                    Ver Detalhes
                  </Link>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default Search;
