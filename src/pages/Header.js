import React from 'react';
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
    // return user.name;
  };

  render() {
    //   const {loading} = this.state;
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component">
        { loading ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{user.name}</p>}
        {/* <p>{user.name}</p> */}
      </div>
    );
  }
}

export default Header;
