import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Carregando...',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        name: user.name,
      });
    });
  }

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {name}
        </p>

        <ul>
          <li>
            <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
          </li>
          <li>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
          </li>
          <li>
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
