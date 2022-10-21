import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Favorites.scss';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: true,
    };
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((data) => this.setState({ favoriteSongs: data, loading: false }));
  }

  /**
   * Remove the song from the favorite songs list.
   * @param {Object} song - The song to be removed from the favorites list
   */
  onRemoveFavorite = (song) => {
    const { favoriteSongs } = this.state;
    this.setState({
      favoriteSongs: favoriteSongs.filter((s) => s.trackId !== song.trackId),
    });
    removeSong(song);
  };

  render() {
    const { favoriteSongs, loading } = this.state;

    return (
      <div className="Favorites">
        <Header />

        <main>
          <h2 className="Favorites__title">Your favorite songs</h2>

          {loading && <div className="Favorites__loading"><Loading /></div>}

          {favoriteSongs.length === 0 && !loading
            && (<p>You don&apos;t have any favorite songs yet</p>)}

          {favoriteSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              song={ song }
              onRemoveFavorite={ () => this.onRemoveFavorite(song) }
            />
          ))}
        </main>
      </div>
    );
  }
}

export default Favorites;
