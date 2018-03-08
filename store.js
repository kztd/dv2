// store module use knex to update mysql table
const knex = require('knex')(require('./knexfile'))

// called from index js on /Create_User route
module.exports = {
  createUser ({ username, password }) {
    console.log(`Add user ${username} with password ${password}`)
    return knex('user').insert({
      username,
      password
    })
  }
}