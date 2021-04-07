require('dotenv').config();
const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 5000

const users = require('./routes/users')
const movies = require('./routes/movies')
const home = require('./routes/home')

// middleware
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

// public directory for static files
app.use(express.static(__dirname + '/public'))
// app.use(express.static('public'))

// routes
app.use('/api/users', users)
app.use('/api/movies', movies)
app.use('/', home)




// views directory
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


app.listen(PORT, () => {
  console.log(`Server up and listening at http://localhost:${PORT}`)
  // console.log(process.env.DATABASE_URL)
})