export default class Movie {
  constructor(id, title, poster_path) {
    this.uniqueId = Date.now() + Math.floor(Math.random() * 6) + 1;
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.addDate = Date.now();
    this.userId = 1;
  }
}