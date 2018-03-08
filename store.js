// store module use knex to update mysql table
const knex = require('knex')(require('./knexfile'))
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');

// called from index js on /Create_User route
module.exports = {
  saltHashPassword,
  createUser ({ username, password }) {
    console.log(`Add user ${username}`)
    const {salt, hash} = this.saltHashPassword(password)
    console.log('new psw')
    return knex('user').insert({
      username,
      salt,
      encrypted_password: hash
    })
  }
}

function saltHashPassword(password){
  console.log('salt 1')

  const salt = randomString()
  // create hash of psw creating hmac obj with random salt, then
  // using hmac.update() to create the hashed version
  // hmac is 
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
    console.log('salt 1')

  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString(){
  // create random string for hashing
  return cryptoRandomString(10)

}
