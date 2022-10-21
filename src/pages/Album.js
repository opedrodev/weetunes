import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

import '../styles/Album.scss';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id).then((data) => {
      this.setState({ album: data, loading: false });
    });
  }

  render() {
    const { album, loading } = this.state;

    return (
      <div className="Album">
        <Header />

        <main className="Album__main">
          {loading ? <Loading />
            : (
              <div className="album">
                <img src={ album[0].artworkUrl100 } alt={ album[0].collectionName } />
                <h1>{album[0].collectionName}</h1>
                <h3>{album[0].artistName}</h3>
              </div>
            )}

          {album.filter((song) => song.kind === 'song')
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
              />
            ))}

        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
