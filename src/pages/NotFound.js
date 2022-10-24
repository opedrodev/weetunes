import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.scss';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <div>
          <p>404 Page Not Found</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
