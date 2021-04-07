  const TMDB_API_KEY = 'd8bf019d0cca372bd804735f172f67e8';
  const TMDB_URL = 'https://api.themoviedb.org';
  const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w500';
  const DEFAULT_IMAGE = 'https://via.placeholder.com/150';
  const TMDB_PROVIDER_LOGO = 'https://image.tmdb.org/t/p/original';

  import {
    renderMovies,
    handleGeneralError,
    createVideoTemplate,
    renderProviders
  } from './app.js'

  export default class ApiCalls {

    constructor() {
      // Initial Values
      this.TMDB_API_KEY = TMDB_API_KEY;
      this.TMDB_URL = TMDB_URL;
      this.TMDB_IMAGE = TMDB_IMAGE;
      this.DEFAULT_IMAGE = DEFAULT_IMAGE;
      this.TMDB_PROVIDER_LOGO = TMDB_PROVIDER_LOGO;
      this.HOSTNAME_URL = (window.location.href).split("/index")[0];
      console.log('hostname form ApiCalls: ', this.HOSTNAME_URL);
    }

    // General methods --------------------------------------------------------
    requestMovies(url, onComplete, onError) {
      console.log('url api :', url)
      fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
    }

    requestProviders(url, onComplete, onError) {
      fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
    }

    generateMovieDBUrl(path) {
      const url = `${this.TMDB_URL}/3${path}?api_key=${this.TMDB_API_KEY}`;
      return url;
    }

    // Get methods for search top rated and popular movies --------------------

    getTopRatedMovies() {
      const url = this.generateMovieDBUrl(`/movie/top_rated`);
      const render = renderMovies.bind({
        title: 'Top Rated Movies'
      })
      this.requestMovies(url, render, handleGeneralError);
    }

    getPopularMovies() {
      const url = this.generateMovieDBUrl('/movie/popular');
      const render = renderMovies.bind({
        title: 'Popular Movies'
      });
      this.requestMovies(url, render, handleGeneralError);
    }

    searchMovie(value) {
      const url = this.generateMovieDBUrl('/search/movie') + '&query=' + value;
      const render = renderMovies.bind({
        title: 'Movies Founded'
      })
      this.requestMovies(url, render);
    }

    // Get methods for extra data, videos and providers ------------------------

    getMovieProvidersByMovieId(movieId) {
      // console.log('getMovieProvidersByMovieId movieId', movieId);
      const url = this.generateMovieDBUrl('/movie/' + movieId + '/watch/providers');
      this.requestProviders(url, renderProviders)
    }

    getVideosByMovieId(movieId, content) {
      const url = this.generateMovieDBUrl(`/movie/${movieId}/videos`);
      const render = createVideoTemplate.bind({
        content
      });
      this.requestMovies(url, render);
    }


    // Get movies from my API -------------------------------------------------
    getSavedMovies() {
      const url = encodeURI(`${this.HOSTNAME_URL}api/movies`);
      // console.log('this.HOSTNAME_URL / url: ', this.HOSTNAME_URL, url)
      const render = renderMovies.bind({
        title: 'Saved Pick Movies'
      });
      this.requestMovies(url, render);
    }

  }