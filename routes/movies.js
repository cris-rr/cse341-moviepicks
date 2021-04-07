const express = require('express')
const router = express.Router()
const {
  getMovies,
  getMoviesByUserId,
  deleteMovie
} = require('../controllers/movies-controller')

router.get('/', getMovies)

// router.get('/:userid', getMoviesByUserId)
router.delete('/:movieid', deleteMovie)


module.exports = router