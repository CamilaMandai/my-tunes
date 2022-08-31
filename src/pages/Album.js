import React from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    musicList: [],
    identity: this.props,
    loading: true,
  };

  async componentDidMount() {
    const { identity } = this.state;
    const { match: { params: { id } } } = identity;
    // const list = await getMusics('1440862963');
    const list = await getMusics(id);
    this.setState({ musicList: list, loading: false });
  }

  render() {
    const { musicList, loading } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <p>Carregando...</p>
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        {/* <h2 data-testid="artist-name">{Array.isArray(musicList)}</h2> */}
        {musicList.map((element, index) => {
          if (index === 0) {
            return (
              <div key={ index }>
                <h2 data-testid="artist-name">{element.artistName}</h2>
                <p data-testid="album-name">{element.collectionName}</p>
              </div>
            );
          }
          return null;
        })}
        <ul>
          {musicList.map((element, index) => {
            if (index !== 0) {
              return (<MusicCard
                key={ index }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
              />);
            }
            return null;
          })}
          {/* {musicList.map((element, index) => {
          if(index !==0) {
        return <li key={ index }>{element.trackName}</li>}
        })} */}
        </ul>
      </div>
    );
  }
}

export default Album;
