const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

// public directory for static files
app.use(express.static(__dirname + '/public'))

// views directory
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const message = 'root route Movie Pick'
  res.write(message)
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server up and listening at http://localhost:${PORT}`)
})