import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    disabledBtn: true,
  };

  checkInputLength = ({ target }) => {
    const { value } = target;
    const MIN_SIZE = 2;
    this.setState({ disabledBtn: (value.length < MIN_SIZE) });
  };

  render() {
    const { disabledBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Pesquisar</p>
        <form>
          <input
            name="artistName"
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            onChange={ this.checkInputLength }
          />
        </form>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabledBtn }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
