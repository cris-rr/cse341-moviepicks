const express = require('express')
const router = express.Router()
const {
  getMovies,
  getMoviesByUserId,
  createMovie,
  deleteMovie
} = require('../controllers/movies-controller')

router.get('/', getMovies)
router.post('/', createMovie)

// router.get('/:userid', getMoviesByUserId)
router.delete('/:movieid', deleteMovie)


module.exports = router