import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

import logo from '../assets/weetunes-logo.png';
import Loading from '../components/Loading';
import '../styles/Login.scss';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disabled: true,
      loading: false,
    };
  }

  /**
   * Verify if the input length is greater than 2 and set the state `disabled` to false if it is.
   * @param {Object} event - Input change event.
   */
  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const MIN_LENGTH = 2;
    this.setState({
      [name]: value,
      disabled: value.length <= MIN_LENGTH,
    });
  };

  /**
   * Create a new user and save it in the localStorage. And redirect to the search page.
   */
  handleButtonClick = () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });

    createUser({ name })
      .then(() => history.push('/search'));
  };

  render() {
    const { disabled, loading } = this.state;

    return (
      <section className="Login">
        <div className="Login__card">
          <div className="Login__card__logo">
            <img src={ logo } alt="trybetunes logo" />
            <h1>weeTunes</h1>
          </div>

          {
            loading ? <Loading /> : (
              <>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  placeholder="What's your name?"
                  onChange={ this.handleInputChange }
                />
                <button
                  type="button"
                  disabled={ disabled }
                  onClick={ this.handleButtonClick }
                >
                  Join
                </button>
              </>
            )
          }

        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
