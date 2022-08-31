import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { handleLogin, handleChange, disabledButton, clicked } = this.props;
    if (clicked) {
      return (<div>Carregando...</div>);
    }

    return (
      <div data-testid="page-login">
        <form>
          <input
            name="userName"
            data-testid="login-name-input"
            placeholder="Nome do Artista"
            onChange={ handleChange }
          />
        </form>
        {/* <Link to="/search"> */}
        <button
          type="button"
          onClick={ handleLogin }
          data-testid="login-submit-button"
          disabled={ disabledButton }
        >
          Entrar
        </button>
        {/* </Link> */}
        {/* {clicked ? <Redirect to="/search" /> : <p>Carregando...</p>} */}
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func,
  handleChange: PropTypes.func,
  disabledButton: PropTypes.bool,
  clicked: PropTypes.bool,
}.isRequired;

export default Login;
