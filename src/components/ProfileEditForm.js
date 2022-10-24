import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/ProfileEditForm.scss';

class ProfileEditForm extends Component {
  render() {
    const {
      name,
      email,
      image,
      description,
      disabled,
      onChangeHandler,
      onUpdateUser,
    } = this.props;

    return (
      <div className="ProfileEditForm">
        <label htmlFor="firstName">
          <p className="label">Name</p>
          <input
            type="text"
            name="name"
            id="firstName"
            placeholder="First Name"
            value={ name }
            onChange={ onChangeHandler }
          />
        </label>

        <label htmlFor="email">
          <p className="label">Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={ email }
            onChange={ onChangeHandler }
          />
        </label>

        <label htmlFor="image">
          <p className="label">Image URL</p>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Photo"
            value={ image }
            onChange={ onChangeHandler }
          />
        </label>

        <label htmlFor="description">
          <p className="label">Description</p>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            cols="30"
            rows="5"
            value={ description }
            onChange={ onChangeHandler }
          />
        </label>

        <button
          type="button"
          onClick={ onUpdateUser }
          disabled={ disabled }
        >
          Update Profile

        </button>
      </div>
    );
  }
}

ProfileEditForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

export default ProfileEditForm;
