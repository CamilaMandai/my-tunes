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
  };

  checkInputLength = ({ target }) => {
    const { value, name } = target;
    const MIN_SIZE = 2;
    this.setState({ [name]: value, disabledBtn: (value.length < MIN_SIZE) });
  };

  handleClick = () => {
    this.setState({ loadingSearch: true }, async () => {
      const { artistName } = this.state;
      // console.log(artistName);
      const artistAlbuns = await searchAlbumsAPI(artistName);
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
    const { disabledBtn, artistName, loadingSearch, albuns, albumLoaded } = this.state;
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
        {/* { albuns[0] ? <div>Resultado de álbuns de: {albuns.map((element)
          => <span>{element.artistName}</span>)}</div> : <div></div>} */}
        {/* <div>Resultado de álbuns de: {albuns[0].artistName} </div> */}

        <Card albuns={ albuns } loaded={ albumLoaded } />

        {
          // albuns[0] ?
          // <div>
          //   Resultado de álbuns de:
          //   <Card albuns={ albuns[0].artistName } />
          //   </div>
          // : <p>Nenhum álbum foi encontrado</p>
        }
        {
          // albuns[0] ? <div>Resultado de álbuns de: {albuns[0].artistName}</div> : <div></div>
        }
      </div>
    );
  }
}

export default Search;
