// index.js is the starting point for the app

const express = require('express')
const bodyParser = require('body-parser')
// store holds the function to add a user
const store = require('./store')
const app = express()

// init app
app.use(express.static('public'))
app.use(bodyParser.json())

// this is the routing, a get request for url /page2 comes here
// but not /page2/home
app.get('/page2', (req, res) => {
  console.log('page2 get request');
 res.sendStatus(200)
})

// on app.post, call create user in store
app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

// 
app.post('/loginUser', (req, res) => {
  console.log('call auth with ', req.body.username, req.body.password)
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success){
        console.log('login success')
        res.sendStatus(200)
      } 
      else{
        console.log('login fail')
        res.sendStatus(401)
      } 
    })
})
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})