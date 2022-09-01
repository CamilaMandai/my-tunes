import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    check: false,
  };

  componentDidMount() {
    const { savedFavorites, trackId } = this.props;

    savedFavorites.map((element) => {
      // if(index===1){
      if (element.trackId === trackId) {
        this.setState({ check: true });
      }
      return null;
      // }
    });
  }

  handleCheck = async (element) => {
    this.setState({ loading: true });
    await addSong(element);
    this.setState({ loading: false, check: true });
  };

  render() {
    const { trackName, previewUrl, trackId, element } = this.props;
    const { loading, check } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    return (
      <li>
        <label htmlFor="favoriteCheck">
          Favorita
          <input
            id="favoriteCheck"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ () => {
              this.handleCheck(element);
            } }
            checked={ check }
          />
        </label>
        {trackName}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
