import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

export default class Search extends Component {
  state = {
    artistName: '',
    disabledBtn: true,
    loading: false,
    albuns: [],
    artist: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, disabledBtn: value.length < 2 });
  };

  handleClick = async () => {
    const { artistName } = this.state;
    this.setState({ loading: true, artist: artistName });
    const searchedAlbuns = await searchAlbumsAPI(artistName);
    this.setState({ artistName: '', loading: false, albuns: searchedAlbuns });
  };

  render() {
    const { artistName, disabledBtn, loading, albuns, artist } = this.state;
    const resultado = (
      <div>
        <p>
          {' '}
          Resultado de álbuns de:
          {' '}
          { artist }
        </p>
      </div>);

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledBtn }
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </form>
        {loading ? <p>Carregando...</p> : resultado}
        {
          albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p>
            : albuns.map((album, index) => (
              <AlbumCard
                key={ index }
                searchResult={ album }
              />
            ))
        }
      </div>
    );
  }
}
