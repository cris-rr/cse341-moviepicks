import ApiCall from './apicall.js';
import LocalData from './ls.js';
import Movie from './movie.js';

const ApiMdb = new ApiCall();


// Initial Values
const INITIAL_SEARCH_VALUE = 'avengers';
const log = console.log;

// Selecting elements from the DOM
const pageTitle = document.querySelector('#pageTitle');
const formSearch = document.querySelector('#formSearch');
const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('#inputSearch');
const moviesContainer = document.querySelector('#moviesContainer');
const providersContainer = document.querySelector('#providersContainer');
const movieCrud = document.querySelector('#movieCrud');
const saveButton = document.querySelector('#save');
const deleteButton = document.querySelector('#delete');
const crudMessage = document.querySelector('#crudMessage');
let crudDelete = false;
let movieId = 0;
let movieTitle = '';
let moviePosterPath = '';
let movieList = LocalData.getMovies().results;

// Movies -----------------------------------------

// For movie picks render
function renderMoviePicks() {
  formSearch.classList.add('no-display')
  pageTitle.innerHTML = 'My Movie Picks';
  let data = LocalData.getMovies();
  if (!data.results) {
    log('movies is null ', data.results);
  }
  crudDelete = true;
  // log(data);
  renderMovies(data);
}

export function renderMovies(data) {
  moviesContainer.innerHTML = '';
  showMovieCrud(false);
  providersContainer.innerHTML = '';
  const moviesBlock = generateMoviesBlock(data);
  // if (data.results.length > 0) {
  //   const header = createSectionHeader(this.title);
  //   moviesBlock.insertBefore(header, moviesBlock.firstChild);
  // }
  moviesContainer.appendChild(moviesBlock);
}

function generateMoviesBlock(data) {
  const movies = data.results;
  const section = document.createElement('section');
  section.setAttribute('class', 'movie-list');
  // if (movies.length <= 0) {
  if (movies === null) {
    const message = document.createElement('p');
    message.setAttribute('class', 'notification');
    const messageNode = document.createTextNode('No movies found, please add a Movie to your Picks.');
    message.appendChild(messageNode)
    return message
  }

  for (let i = 0; i < movies.length; i++) {
    const {
      poster_path,
      id,
      title
    } = movies[i];

    if (poster_path) {
      const imageUrl = ApiMdb.TMDB_IMAGE + poster_path;
      const imageContainer = createImageContainer(imageUrl, id, title);
      section.appendChild(imageContainer);
    }
  }

  const movieSectionAndContent = createMovieContainer(section);
  return movieSectionAndContent;
}

function createImageContainer(imageUrl, id, title) {
  const tempDiv = document.createElement('div');
  tempDiv.setAttribute('class', 'imageContainer');
  tempDiv.setAttribute('data-id', id);
  tempDiv.setAttribute('data-title', title);
  tempDiv.setAttribute('id', id);

  const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}" data-movie-title="${title}">
    `;
  tempDiv.innerHTML = movieElement;

  return tempDiv;
}

// Inserting section before content element
function createMovieContainer(section) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movies');
  const template = `
        <h2></h2>
        <div class="content">
        </div>
    `;

  movieElement.innerHTML = template;
  movieElement.insertBefore(section, movieElement.firstChild);
  return movieElement;
}


// Videos -----------------------------------------

export function createVideoTemplate(data) {
  const content = this.content;
  content.innerHTML = '';
  const movieHeader = content.previousElementSibling;
  movieHeader.innerHTML = `Movie selected: ${movieTitle} Videos and Streaming Availability`;
  const videos = data.results || [];
  showMovieCrud(true);

  if (videos.length === 0) {
    content.innerHTML = `<p>No Trailer found for this video id of ${data.id}</p>`;
    return;
  }

  for (let i = 0; i < 4; i++) {
    const video = videos[i];
    insertIframeIntoContent(video, content);
  }
}

function insertIframeIntoContent(video, content) {
  const videoContent = document.createElement('div');
  const iframe = createIframe(video);

  videoContent.appendChild(iframe);
  content.appendChild(videoContent);
}

function createIframe(video) {
  const videoKey = (video && video.key) || 'No key found!!!';
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoKey}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;
  return iframe;
}


// Streaming Providers ------------------------------

export function renderProviders(data) {
  providersContainer.innerHTML = '';
  try {
    const providersBlock = generateProvidersBlock(data.results.US.flatrate);
    providersContainer.innerHTML = providersBlock;
  } catch (error) {
    console.log(error);
    providersContainer.innerHTML = `<p class="notification">No streaming for this movie</p>`;
  }
}

function generateProvidersBlock(data) {
  const providers = data;
  let block = '';
  if (!providers) {
    block = `<p class="notification">No streaming for this movie</p>`;
    return block
  }

  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    const name = provider.provider_name;
    const logo = ApiMdb.TMDB_PROVIDER_LOGO + provider.logo_path;
    block += `
    <div class="provider">
      <p>${name}</p>
      <img src="${logo}" alt="${name}">
    </div>`;
  }
  return block;
}

// Other functions -----------------------------------

function resetInput() {
  searchInput.value = '';
}

export function handleGeneralError(error) {
  log('Error: ', error.message);
  alert(error.message || 'Internal Server');
}

function showMovieCrud(show) {
  if (show) {
    movieCrud.classList.remove("no-display");
    if (!crudDelete) {
      saveButton.classList.remove('no-display');
      deleteButton.classList.add('no-display')
    } else {
      saveButton.classList.add('no-display');
      deleteButton.classList.remove('no-display')
    }

  } else {
    movieCrud.classList.add("no-display");
  }
}

function createSectionHeader(title) {
  const header = document.createElement('h2');
  header.innerHTML = title;

  return header;
}

function checkDuplicate(id) {
  if (movieList === null) {
    return false;
  }
  let index = movieList.findIndex(x => x.id === id);
  if (index > -1) {
    crudMessage.innerHTML = 'This movie is already saved.'
    return true;
  }
  return false;
}


// events functions ---------------------------------

// Search movies
searchButton.onclick = function (event) {
  event.preventDefault();
  const value = searchInput.value

  if (value) {
    ApiMdb.searchMovie(value);
  }
  resetInput();
}

// Save movies
saveButton.onclick = function (event) {
  event.preventDefault();
  if (!checkDuplicate(movieId)) {
    let movie = new Movie(movieId, movieTitle, moviePosterPath);
    if (movieList) {
      movieList.push(movie);
    } else {
      movieList = [movie];
    }
    LocalData.saveMovies(movieList)
    crudMessage.innerHTML = 'Movie added successfully!'
  }
}

// Delete movies
deleteButton.onclick = function (event) {
  event.preventDefault();
  let index = movieList.findIndex(x => x.id === movieId);
  if (index > -1) {
    movieList.splice(index, 1);
    LocalData.saveMovies(movieList);
  }
  renderMoviePicks();
}

// Click on any movies
document.onclick = function (event) {
  const {
    tagName,
    id
  } = event.target;
  if (tagName.toLowerCase() === 'img') {
    movieId = parseInt(event.target.dataset.movieId);
    movieTitle = event.target.dataset.movieTitle;
    moviePosterPath = event.target.src;
    moviePosterPath = moviePosterPath.slice(ApiMdb.TMDB_IMAGE.length);
    crudMessage.innerHTML = '';
    const section = event.target.parentElement.parentElement;
    const content = section.nextElementSibling.nextElementSibling;
    content.classList.add('content-display');
    ApiMdb.getVideosByMovieId(movieId, content);
    ApiMdb.getMovieProvidersByMovieId(movieId);
  }

  // Pages -------------------------------------------------------
  if (tagName.toLowerCase() === 'a') {
    crudDelete = false;
    switch (event.target.id) {
      case 'moviePicks':
        renderMoviePicks()
        break;
      case 'movieSearch':
        formSearch.classList.remove('no-display')
        pageTitle.innerHTML = 'Search Movies';
        ApiMdb.searchMovie(INITIAL_SEARCH_VALUE);
        break;
      case 'movieRated':
        formSearch.classList.add('no-display')
        pageTitle.innerHTML = 'Top Rated Movies';
        ApiMdb.getTopRatedMovies();
        break;
      case 'moviePopular':
        formSearch.classList.add('no-display')
        pageTitle.innerHTML = 'Popular Movies';
        ApiMdb.getPopularMovies();
        break;
      default:
        log('check error in default <a> tag');
        break;
    }
  }
}

renderMoviePicks();