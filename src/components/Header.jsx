import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import '../styles/navbar.sass';
import logo from '../images/logo.png';

class Header extends React.Component {
  state = {
    loading: true,
    user: {},
    page: '',
  };

  componentDidMount() {
    this.gettingUser();
    const { page } = this.props;
    this.setState({ page });
  }

  gettingUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading, page } = this.state;
    const activePage = 'active-page';
    const headerComponent = (
      <div className="nav-bar">
        <Link to="/search" className="logo-nav">
          <img className="logo" src={ logo } alt="logo" />
        </Link>
        <ul>
          <Link to="/search">
            <li
              data-testid="link-to-search"
              className={ page === 'pesquisar' && activePage }
            >
              Pesquisar
            </li>
          </Link>
          <Link to="/favorites">
            <li
              data-testid="link-to-favorites"
              className={ page === 'favorites' && activePage }
            >
              Favoritos
            </li>
          </Link>
          <Link to="/profile">
            <li
              data-testid="link-to-profile"
              className={ page === 'profile' && activePage }
            >
              Perfil
            </li>
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

Header.propTypes = {
  page: PropTypes.string,
}.isRequired;
