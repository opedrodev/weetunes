import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Audio extends Component {
  render() {
    const { previewUrl } = this.props;

    return (
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        &nbsp;
        &nbsp;
        <code>audio</code>
        .
      </audio>
    );
  }
}

Audio.propTypes = {
  previewUrl: PropTypes.string.isRequired,
};

export default Audio;
