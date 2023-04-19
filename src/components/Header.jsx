import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/navbar.sass';
import logo from '../images/logo.png';

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
      <div className="nav-bar">
        <Link to="/search" className="logo-nav">
          <img className="logo" src={ logo } alt="logo" />
        </Link>
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
        <div className="profile-info">
          <img src={ user.image } alt="user" />
          <p data-testid="header-user-name">{user.name}</p>
        </div>
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
