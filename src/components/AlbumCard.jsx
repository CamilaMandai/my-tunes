import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { searchResult } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = searchResult;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>{collectionName}</h3>
        <h4>{artistName}</h4>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Acesse aqui
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  searchResult: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
