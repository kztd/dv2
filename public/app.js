// CreateUser is the form class on index.html
const CreateUser = document.querySelector('.CreateUser')
const Login = document.querySelector('.Login')

// add event listener for submit
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  // again these are te form classes
  const username = CreateUser.querySelector('.username').value
  const password = CreateUser.querySelector('.password').value
  // now post it
  post('/createUser', { username, password })
})

// on submit, creates a post request that gets handeld back in index.js
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  // again these are te form classes
  const username = Login.querySelector('.username').value
  const password = Login.querySelector('.password').value
  // now post it
  post('/loginUser', { username, password })
})

function post (path, data) {

  // fetch returns a promise that resolves to a response
  // the fetch takes the path, then an object with method, headers and body
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}