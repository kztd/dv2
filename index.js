// index.js is the starting point for the app

const express = require('express')
const bodyParser = require('body-parser')
// store holds the function to add a user
const store = require('./store')
const app = express()

// init app
app.use(express.static('public'))
app.use(bodyParser.json())

// on app.post, call create user in store
app.get('/page2', (req, res) => {
  console.log('page2 get request');
 res.sendStatus(200)
})

app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})