// store module use knex to update mysql table
const knex = require('knex')(require('./knexfile'))
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');

// called from index js on /Create_User route
module.exports = {
  saltHashPassword,
  createUser,
  authenticate2,
  authenticate ({ username, password }) {
    console.log(`Authenticating user ${username}`)
    return knex('user').where({ username })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        return { success: hash === user.encrypted_password }
      })
  }
}


function createUser ({ username, password }) {
  console.log(`Add user ${username}`)
  const {salt, hash} = this.saltHashPassword(password)
  console.log('new psw')
  return knex('user').insert({
    username,
    salt,
    encrypted_password: hash
  })
}

function authenticate2 ({ username, password }) {
  console.log(`Authenticating user ${username}`)
  return knex('user').where({ username })
    .then(([user]) => {
      if (!user){
        console.log("no user: ", username)
        return { success: false }
      } 
      const { hash } = saltHashPassword({
        password,
        salt: user.salt
      })
      if( hash === user.encrypted_password){
        console.log('found user')
        return {success: true}
      }
     })
}

function saltHashPassword({password, salt = randomString() })  {

  // create hash of psw creating hmac obj with random salt, then
  // using hmac.update() to create the hashed version
  // hmac is hash based message authentication code
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)

  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString(){
  // create random string for hashing
  return cryptoRandomString(10)

}
