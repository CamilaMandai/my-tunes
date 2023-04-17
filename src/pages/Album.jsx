import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    musicList: [],
    artist: '',
    album: '',
    favoriteList: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      musicList: songs.filter((_, index) => index !== 0),
      artist: songs[0].artistName,
      album: songs[0].collectionName,
      favoriteList: favorites,
    });
  }

  removeFavorite = async (song) => {
    await removeSong(song);
    const { favoriteList } = this.state;
    const newList = favoriteList.filter((music) => music.trackName !== song.trackName);
    this.setState({ favoriteList: newList });
  };

  render() {
    const { musicList, artist, album, favoriteList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{artist}</h3>
        <h3 data-testid="album-name">{album}</h3>
        {
          musicList.map((music, index) => (<MusicCard
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
