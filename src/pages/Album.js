import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
      console.log(data);
      this.setState({ album: data, loading: false });
    });
  }

  render() {
    const { album, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {
          loading ? <Loading /> : (
            <div>
              <img src={ album[0].artworkUrl100 } alt="" srcSet="" />
              <h1 data-testid="album-name">{album[0].collectionName}</h1>
              <h3 data-testid="artist-name">{album[0].artistName}</h3>
            </div>
          )
        }

        {
          album.filter((music) => music.kind === 'song')
            .map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))
        }

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
