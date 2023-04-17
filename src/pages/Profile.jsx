import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

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
        {loading && <p>Carregando...</p>}
        <h4>Nome</h4>
        <p>{user.name}</p>
        <h4>Email</h4>
        <p>{user.email}</p>
        <h4>Descrição</h4>
        <p>{user.description}</p>
        <img data-testid="profile-image" src={ user.image } alt="sua foto" />

        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}
