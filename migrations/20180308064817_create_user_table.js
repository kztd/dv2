// Create User table in DV2

// migration up is up version
exports.up = function (knex) {
    return knex.schema.createTable('user', function (t) {
      t.increments('id').primary()
      t.string('username').notNullable()
      t.string('password').notNullable()
      // creates updated_at and created_at fields
      t.timestamps(false, true)
    })
  }
// migration down is down 
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
  }