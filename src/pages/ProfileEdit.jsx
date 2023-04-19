import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/profile.sass';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    notAllFilled: true,
    userName: '',
    email: '',
    image: '',
    description: '',
    parentProps: this.props,
  };

  async componentDidMount() {
    const user = await getUser();
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

  redirectProfile = () => {
    const { parentProps } = this.state;
    const { history: { push } } = parentProps;
    push('/profile');
  };

  handleClick = async () => {
    const { userName, email, description, image } = this.state;
    // const { setUpdate } = isUpdate;
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
      loading: true,
    });
    this.redirectProfile();
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
        <Header page="" />
        <div className="profile edit-profile">
          <h2>Editar perfil</h2>
          <form>
            <img src={ image } alt="profile" />
            <label htmlFor="image">
              Url da imagem:
              <input
                type="text"
                name="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
                placeholder="Imagem (url)"
              />
            </label>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="userName"
                data-testid="edit-input-name"
                value={ userName }
                onChange={ this.handleChange }
                placeholder="Nome"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Email"
              />
            </label>
            <label htmlFor="description">
              Descrição:
              {' '}

            </label>
            <textarea
              rows="5"
              cols="33"
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
              placeholder="Descrição"
            />
          </form>
          <Link to="/profile">
            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ this.handleClick }
              disabled={ notAllFilled }
            >
              Salvar
            </button>
          </Link>

        </div>
      </div>
    );
  }
}

export default ProfileEdit;
