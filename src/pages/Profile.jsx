import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/profile.sass';

export default class Profile extends Component {
  state = {
    user: {},
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          {loading && <p>Carregando...</p>}
          <div>
            <img data-testid="profile-image" src={ user.image } alt="sua foto" />
          </div>
          <div>
            <h2>{user.name}</h2>
            <h4>Email</h4>
            <p>{user.email}</p>
            <h4>Descrição</h4>
            <p>{user.description}</p>
            <Link to="/profile/edit" className="link">Editar perfil</Link>
          </div>
        </div>
      </div>
    );
  }
}
