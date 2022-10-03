import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
