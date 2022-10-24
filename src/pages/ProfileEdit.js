import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileEditForm from '../components/ProfileEditForm';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.scss';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      disabled: true,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  /**
   * Get user data from API
   */
  getUserData = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description });
  };

  /**
   * Handle the input change and update the state
   * @param {Object} event - Event object
   */
  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateForm());
  };

  /**
   * Validate the form and enable the button if all fields are filled
   */
  validateForm = () => {
    const { name, email, image, description } = this.state;

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const nameCheck = name.trim().length > 0;
    const emailCheck = emailRegex.test(email);
    const imageCheck = image.trim().length > 0;
    const descriptionCheck = description.trim().length > 0;

    if (nameCheck && emailCheck && imageCheck && descriptionCheck) {
      this.setState({ disabled: false });
      return;
    }

    this.setState({ disabled: true });
  };

  /**
   * Update user data in API and redirect to Profile page
   */
  onUpdateUser = () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;

    updateUser({ name, email, image, description }).then(() => history.push('/profile'));
  };

  render() {
    const { name, email, image, description, disabled } = this.state;

    return (
      <div className="ProfileEdit">
        <Header />

        <ProfileEditForm
          name={ name }
          email={ email }
          image={ image }
          description={ description }
          disabled={ disabled }
          onChangeHandler={ this.onChangeHandler }
          onUpdateUser={ this.onUpdateUser }
        />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
