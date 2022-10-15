import React, { Component } from 'react';
import { HiHeart, HiOutlineUserCircle, HiSearch } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import logo from '../assets/weetunes-logo.png';
import '../styles/Header.scss';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        name: user.name,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header className="header">
        <figure>
          <NavLink to="/search">
            <img src={ logo } alt="weetunes logo" className="header__logo" />
          </NavLink>
        </figure>

        <nav className="header__nav">
          <NavLink
            to="/search"
            activeClassName="header__nav--active"
          >
            <HiSearch />
            Search

          </NavLink>

          <NavLink
            to="/favorites"
            activeClassName="header__nav--active"
          >
            <HiHeart />
            Favorites

          </NavLink>

          <NavLink
            to="/profile"
            activeClassName="header__nav--active"
          >
            <HiOutlineUserCircle />
            Perfil

          </NavLink>
        </nav>

        {
          loading ? <Loading />

            : (
              <div className="header__profile">
                {/* <img src="" alt="" /> */}

                <NavLink to="/profile">
                  { name }
                </NavLink>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
