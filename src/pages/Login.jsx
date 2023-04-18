// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import '../styles/login.sass';
import logo from '../images/logo.png';

export default class Login extends Component {
  state = {
    username: '',
    disabledBtn: true,
    loading: false,
    loaded: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const MINLENGTH = 3;
    this.setState({ [name]: value, disabledBtn: value.length < MINLENGTH });
  };

  handleClick = async () => {
    this.setState({ loading: true });
    const { username } = this.state;
    await createUser({ name: username });
    this.setState({ loading: false, loaded: true });
  };

  render() {
    const { username, disabledBtn, loading, loaded } = this.state;
    return (
      <div data-testid="page-login" className="login-background">

        <div className="circle">
          {loading ? <p className="loading">Carregando...</p>
            : (
              <form className="login-form">
                <div className="logo">
                  <img src={ logo } alt="Logo" />
                </div>
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="username"
                  value={ username }
                  onChange={ this.handleChange }
                  placeholder="Qual o seu nome"
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  onClick={ this.handleClick }
                  disabled={ disabledBtn }
                >
                  Entrar

                </button>
              </form>)}

          {loaded && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}
