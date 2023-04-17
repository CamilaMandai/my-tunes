import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isFavorite: false,
  };

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  handleChange = async () => {
    this.setState({ loading: true });
    const { isFavorite } = this.state;
    if (isFavorite) {
      const { removeSong, song } = this.props;
      await removeSong(song);
      this.setState({ loading: false, isFavorite: false });
    } else {
      const { song } = this.props;
      await addSong(song);
      this.setState({ loading: false, isFavorite: true });
    }
  };

  render() {
    const { song: { trackName, previewUrl, trackId } } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              checked={ isFavorite }
            />
            Favorita
          </label>
        </div>
        {loading && <p>Carregando...</p>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  removeSong: PropTypes.func.isRequired,
};
