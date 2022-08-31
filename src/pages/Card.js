import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { albuns, loaded } = this.props;
    if (!loaded) {
      return <div />;
    }
    if (albuns[0] === undefined) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <div>
        <h3>
          Resultado de álbuns de:
          <span>
            {' '}
            {albuns[0].artistName}
            {' '}
          </span>
        </h3>
        {albuns.map((element) => (
          <Link key={ element.collectionId } to={ `/album/${element.collectionId}` }>
            <div
              key={ element.collectionId }
              data-testid={ `link-to-album-${element.collectionId}` }
            >
              <img src={ element.artworkUrl100 } alt={ element.collectionName } />
              <h4>{element.collectionName}</h4>
              <p>{element.artistName}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

Card.propTypes = {
  albuns: PropTypes.arrayOf,
  loaded: PropTypes.bool,
}.isRequired;

export default Card;
