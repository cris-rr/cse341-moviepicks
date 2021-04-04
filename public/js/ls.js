import Movie from './movie.js';

export default class LocalData {

  static getMovies() {

    var movieList = []
    // test data
    // movieList.push(new Movie('1366', 'Rocky', '/i5xiwdSsrecBvO7mIfAJixeEDSg.jpg'))
    // movieList.push(new Movie('1367', 'Rocky II', '/a9UbfUELZHj96tBVWnKrDrtnQcr.jpg'))
    // movieList.push(new Movie('1346', 'Rocky Balboa', '/bgheMOLFVkpiZ3KhG3PGrMAPdXn.jpg'))

    // get data from localStorage
    movieList = JSON.parse(localStorage.getItem('movies'));
    var data = {
      message: "testing ls response",
      results: movieList
    }
    return data
  }

  static saveMovies(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
  }

}