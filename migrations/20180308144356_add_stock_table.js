// migration up is up version
exports.up = function (knex) {
    return knex.schema.createTable('sec', function (t) {
      t.increments('id').primary()
      t.date('IPODt')
      t.string('DivFreq')
      t.decimal('LiqPrc')
      t.string('CDX3')
      t.string('Yahoo')
      t.string('TS')
      t.decimal('Coupon')
      t.string('Issuer')
      t.decimal('Score')
      t.string('Dings')
      t.date('ExDate')
      t.string('Win')
      // these come from the issuer so should be dropped soon
      t.string('Industry')
      t.string('Common Note')
      // creates updated_at and created_at fields
      t.timestamps(false, true)
    })
  }
// migration down is down 
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('sec')
}
