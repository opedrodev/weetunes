import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleFavorite = ({ target: { checked } }) => {
    const { song } = this.props;
    this.setState({ loading: true });
    addSong(song).then(() => {
      this.setState({ loading: false });
      this.setState({ checked });
    });
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    if (loading) return <Loading />;

    return (
      <div>
        { trackName }
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          &nbsp;
          &nbsp;
          <code>audio</code>
          .
        </audio>

        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            defaultChecked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
