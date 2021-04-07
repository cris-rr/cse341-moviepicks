loggedIn = false;
loggedUserId = 2;

const getUser = async (req, res) => {
  const {
    username,
    password
  } = req.body
  if (username == 'cris@gmail.com' && password == 'pass12345') {
    userController.loggedIn = true
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  loggedIn,
  loggedUserId,
  getUser
}