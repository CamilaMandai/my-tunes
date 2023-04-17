import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    const headerComponent = (
      <div>
        <p data-testid="header-user-name">{user.name}</p>
        <ul>
          <Link to="/search">
            <li data-testid="link-to-search"> Pesquisar </li>
          </Link>
          <Link to="/favorites">
            <li data-testid="link-to-favorites"> Favoritos </li>
          </Link>
          <Link to="/profile">
            <li data-testid="link-to-profile"> Perfil </li>
          </Link>
        </ul>
      </div>
    );
    return (
      <div data-testid="header-component">
        {loading ? <p>Carregando...</p>
          : headerComponent}
        {/* <p>{user.name}</p> */}
      </div>
    );
  }
}

export default Header;
