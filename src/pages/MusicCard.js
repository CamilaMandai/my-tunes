import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

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

  handleCheck = async () => {
    this.setState({ loading: true });
    const { element } = this.props;
    console.log(element);
    const { check } = this.state;
    if (check) {
      await removeSong(element);
      this.setState({ loading: false, check: false });
    } else {
      await addSong(element);
      this.setState({ loading: false, check: true });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
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
            // onChange={ () => {
            //   this.handleCheck(element);
            // } }
            onChange={ this.handleCheck }
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
