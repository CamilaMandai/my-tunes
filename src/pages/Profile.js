import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: true,
    userProfile: [],
  };

  async componentDidMount() {
    const user = await getUser();
    // console.log(user);
    this.setState({ loading: false, userProfile: user });
  }

  render() {
    const { loading, userProfile } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <p>Carregando...</p>
        </div>
      );
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <p>{userProfile.name}</p>
        <p>{userProfile.email}</p>
        <p>{userProfile.description}</p>
        <img
          src={ userProfile.image }
          alt={ userProfile.name }
          data-testid="profile-image"
        />
        <Link to="/profile/edit"><p>Editar perfil</p></Link>
      </div>
    );
  }
}

export default Profile;
