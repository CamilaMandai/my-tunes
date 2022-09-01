import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import MusicCard from './MusicCard';
import FavoriteCard from './FavoriteCard';

class Favorites extends React.Component {
  state = {
    savedFavoriteSongs: [],
    loading: true,
  };

  async componentDidMount() {
    const favoriteList = await getFavoriteSongs();
    this.setState({ loading: false, savedFavoriteSongs: favoriteList });
  }

  async componentDidUpdate() {
    // this.setState({ loading: true});
    const favoriteList = await getFavoriteSongs();
    this.setState({ loading: false, savedFavoriteSongs: favoriteList });
  }

  render() {
    const { savedFavoriteSongs, loading } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <p>Carregando...</p>
        </div>
      );
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <ul>
          {/* {console.log(savedFavoriteSongs)}
          {savedFavoriteSongs.map((element, index) => (<MusicCard
            key={ index }
            element={ element }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            savedFavorites={ savedFavoriteSongs }
          />))} */}
          {savedFavoriteSongs.map((element, index) => (<FavoriteCard
            key={ index }
            element={ element }
          />))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
