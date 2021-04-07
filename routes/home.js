const path = require('path')
const express = require('express')
const {
  loggedIn
} = require('../controllers/users-controller')
const router = express.Router()
const userController = require('../controllers/users-controller')

router.get('/', (req, res) => {
  if (userController.loggedIn) {
    const message = 'root route Movie Pick'
    // res.sendFile(__dirname + "/public/index.html");
    res.sendFile(path.join(__dirname, "../") + "/public/moviespage.html")
    // res.sendFile("moviespage.html");

  } else {
    res.redirect('/login')
  }

})

router.get('/login', (req, res) => {
  userController.loggedIn = true
  console.log('get/login:', userController.loggedIn)
  res.render('login.ejs')

})



module.exports = router