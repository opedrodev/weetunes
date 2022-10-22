import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userDefaultLogo from '../assets/user-default.png';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.scss';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const userData = await getUser();
    this.setState({ userData, loading: false });
    console.log(userData);
  };

  render() {
    const { loading, userData: { name, email, image, description } } = this.state;

    return (
      <div className="Profile">
        <Header />

        <main>
          {loading && <div className="Profile__loading"><Loading /></div>}

          {!loading && (
            <div>
              <div className="Profile__container">
                <img src={ image || userDefaultLogo } alt={ name } />

                <div className="data">
                  <div className="name-container">
                    <span className="label">Name</span>
                    <p className="name" id="name">{name}</p>
                  </div>

                  <div className="email-container">
                    <span className="label">Email</span>
                    <p>{email || 'None'}</p>
                  </div>

                  <div className="description-container">
                    <span className="label">Description</span>
                    <p>{description || 'None'}</p>
                  </div>
                </div>
                <Link to="/profile/edit">Edit Profile</Link>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Profile;
