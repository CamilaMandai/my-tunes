import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    // const { loadingUser } = this.props;
    // if (loadingUser) {
    //   return (<div>Carregando</div>);
    // }
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
      </div>
    );
  }
}

export default Search;
