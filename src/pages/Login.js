import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabled: true,
      loading: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const MIN_LENGTH = 3;
    this.setState({
      [name]: value,
      disabled: value.length < MIN_LENGTH,
    });
  };

  handleButtonClick = () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });

    createUser({ name })
      .then(() => history.push('/search'));
  };

  render() {
    const { disabled, loading } = this.state;

    if (loading) return <p>Carregando...</p>;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          onChange={ this.handleInputChange }
          data-testid="login-name-input"
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleButtonClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
