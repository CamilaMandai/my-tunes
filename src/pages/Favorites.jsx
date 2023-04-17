import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    favoriteList: [],
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites });
  }

  removeFavorite = async (song) => {
    await removeSong(song);
    const newList = await getFavoriteSongs();
    this.setState({ favoriteList: newList });
  };

  render() {
    const { favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favoriteList.map((music, index) => (<MusicCard
            key={ index }
            song={ music }
            isFavorite={ favoriteList.some((song) => song.trackName === music.trackName) }
            removeSong={ this.removeFavorite }
          />
          ))
        }
      </div>
    );
  }
}
