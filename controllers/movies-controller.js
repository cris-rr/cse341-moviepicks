const userController = require('../controllers/users-controller')

const {
  Pool
} = require('pg')
const {
  loggedUserId
} = require('../controllers/users-controller')

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

const getMovies = async (req, res) => {
  console.log('getMovies')
  console.log('Is loggedIn: ', userController.loggedIn)
  if (userController.loggedIn) {
    const sql = 'SELECT * FROM movies WHERE userid = $1'
    const result = await pool.query(sql, [loggedUserId])
    res.status(200).json({
      page: 1,
      results: result.rows
    })
  } else {
    res.redirect('/login')
  }
}

const getMoviesByUserId = async (req, res) => {
  console.log('Is loggedIn: ', userController.loggedIn)
  if (userController.loggedIn) {
    const userid = parseInt(req.params.userid)
    const sql = 'SELECT * FROM movies WHERE userid = $1'
    const result = await pool.query(sql, [userid])
    res.status(200).json({
      page: 1,
      results: result.rows
    })
  } else {
    res.redirect('/login')
  }
}

const createMovie = async (req, res) => {
  const movie = req.body;
  console.log(movie)
  const sql = 'INSERT INTO movies (id, title, poster_path, userid) VALUES($1, $2, $3, $4 )'
  const result = await pool.query(sql, [movie.id, movie.title, movie.poster_path, userController.loggedUserId])
  res.status(200).send('Movie added succesfully')
}


const deleteMovie = async (req, res) => {

  const movieid = parseInt(req.params.movieid)
  console.log(movieid)
  const sql = 'DELETE FROM movies WHERE id = $1 AND userid = $2'
  const result = await pool.query(sql, [movieid, userController.loggedUserId])
  console.log(result)
  res.json(`Movie %{movieid} deleted succesfully`)
}

module.exports = {
  getMovies,
  getMoviesByUserId,
  createMovie,
  deleteMovie
}