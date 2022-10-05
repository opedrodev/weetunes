import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import Audio from './Audio';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.retrieveFavoriteSongs();
  }

  handleFavoriteInputClick = () => {
    const { checked } = this.state;
    const { song } = this.props;
    this.setState({ loading: true });

    if (checked) {
      removeSong(song)
        .then(() => this.setState({ checked: false, loading: false }));
    } else {
      addSong(song)
        .then(() => this.setState({ checked: true, loading: false }));
    }
  };

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
    const { loading, checked } = this.state;
    const { song: { trackName, previewUrl, trackId } } = this.props;

    if (loading) return <Loading />;

    return (
      <div>
        { trackName }
        <Audio previewUrl={ previewUrl } />

        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavoriteInputClick }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
