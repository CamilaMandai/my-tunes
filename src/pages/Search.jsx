import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import '../styles/search.sass';

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
        <Header page="pesquisar" />
        <form className="search">
          <input
            className="__name"
            type="text"
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            onChange={ this.handleChange }
            placeholder="nome de um artista ou banda"
          />
          <button
            className="__button"
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledBtn }
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </form>
        <div className="albuns">
          {loading && <p>Carregando...</p>}
          {
            albuns.length === 0 && artist ? <p>Nenhum álbum foi encontrado</p>
              : (
                <div>
                  { albuns.length > 0 && resultado }
                  {albuns.map((album, index) => (
                    <AlbumCard
                      key={ index }
                      searchResult={ album }
                    />
                  ))}
                </div>
              )
          }
        </div>
      </div>
    );
  }
}
