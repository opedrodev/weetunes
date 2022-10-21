import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Audio from './Audio';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    this.retrieveFavoriteSongs();
  }

  /**
   * Add or remove the song from the favorite songs list.
   */
  favoriteButtonClickHandler = () => {
    const { checked } = this.state;
    const { song } = this.props;

    if (checked) {
      removeSong(song)
        .then(() => this.setState({ checked: false }));
      return;
    }

    addSong(song)
      .then(() => this.setState({ checked: true }));
  };

  /**
   * Retrieve the favorite songs list from the API.
   */
  retrieveFavoriteSongs = async () => {
    const { song } = this.props;
    const res = await getFavoriteSongs();

    if (res.some((s) => s.trackId === song.trackId)) {
      this.setState({ checked: true });
      return;
    }

    this.setState({ checked: false });
  };

  render() {
    const { checked } = this.state;
    const { song: { trackName, previewUrl }, onRemoveFavorite } = this.props;

    return (
      <div className="MusicCard">
        <div
          onClick={ onRemoveFavorite || this.favoriteButtonClickHandler }
          aria-hidden
        >
          {checked ? <HiHeart /> : <HiOutlineHeart />}
        </div>

        <p>{trackName}</p>

        <Audio previewUrl={ previewUrl } />
      </div>
    );
  }
}

MusicCard.defaultProps = {
  onRemoveFavorite: null,
};

MusicCard.propTypes = {
  song: PropTypes.instanceOf(Object).isRequired,
  onRemoveFavorite: PropTypes.func,
};

export default MusicCard;
