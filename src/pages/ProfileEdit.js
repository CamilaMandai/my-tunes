import React from 'react';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    notAllFilled: true,
    userName: '',
    email: '',
    image: '',
    description: '',
    isUpdate: this.props,
  };

  async componentDidMount() {
    const user = await getUser();
    // console.log(user);
    this.setState({
      loading: false,
      userName: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  isFilled = () => {
    const { userName, email, image, description } = this.state;
    if (userName && email && image && description) {
      this.setState({ notAllFilled: false });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.isFilled());
  };

  handleClick = async () => {
    const { userName, email, description, image, isUpdate } = this.state;
    const { setUpdate } = isUpdate;
    await updateUser({
      name: userName,
      email,
      image,
      description,
    });
    this.setState({
      userName: '',
      email: '',
      image: '',
      description: '',
    });
    setUpdate(true);
  };

  render() {
    const { loading, notAllFilled, userName, email, description, image } = this.state;
    if (loading) {
      return (
        <div>
          <Header />
          <p>Carregando...</p>
        </div>
      );
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h2>Editar perfil</h2>
        <form action="/profile">

          <input
            type="text"
            name="userName"
            data-testid="edit-input-name"
            value={ userName }
            onChange={ this.handleChange }
          />

          <input
            type="email"
            name="email"
            data-testid="edit-input-email"
            value={ email }
            onChange={ this.handleChange }
          />

          <input
            type="textarea"
            name="description"
            data-testid="edit-input-description"
            value={ description }
            onChange={ this.handleChange }
          />

          <input
            type="text"
            name="image"
            data-testid="edit-input-image"
            value={ image }
            onChange={ this.handleChange }
          />
        </form>
        <button
          type="button"
          data-testid="edit-button-save"
          onClick={ this.handleClick }
          disabled={ notAllFilled }
        >
          Salvar
        </button>

      </div>
    );
  }
}

export default ProfileEdit;
