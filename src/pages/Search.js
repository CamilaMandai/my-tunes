import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';

class Search extends React.Component {
  state = {
    disabledBtn: true,
    artistName: '',
    albuns: [],
    loadingSearch: false,
    albumLoaded: false,
    artist: '',
  };

  checkInputLength = ({ target }) => {
    const { value, name } = target;
    const MIN_SIZE = 2;
    this.setState({
      [name]: value,
      disabledBtn: (value.length < MIN_SIZE),
      artist: value });
  };

  handleClick = () => {
    this.setState({ loadingSearch: true, albumLoaded: false }, async () => {
      const { artistName } = this.state;
      // console.log(artistName);
      const artistAlbuns = await searchAlbumsAPI(artistName);
      // console.log(artistAlbuns);
      this.setState({
        artistName: '',
        albuns: artistAlbuns,
        loadingSearch: false,
        albumLoaded: true,
      });
      // console.log(artistAlbuns)
    });
  };

  render() {
    const { disabledBtn,
      artistName,
      loadingSearch,
      albuns,
      albumLoaded,
      artist } = this.state;
    if (loadingSearch) {
      return (
        <div>
          <Header />
          <p>Carregando...</p>
        </div>
      );
    }
    return (
      <div data-testid="page-search">
        <Header />
        <p>Pesquisar</p>
        <form>
          <input
            name="artistName"
            value={ artistName }
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
          onClick={ () => {
            this.handleClick();
          } }
        >
          pesquisar
        </button>

        {/* Resultado de álbuns de: - Refatorado com ajuda de Anderson Nunes, que mostra o valor mesmo quando a Api nao retorna nada */}
        <h3>
          Resultado de álbuns de:
          {' '}
          {artist}
        </h3>

        <Card albuns={ albuns } loaded={ albumLoaded } />

      </div>
    );
  }
}

export default Search;
