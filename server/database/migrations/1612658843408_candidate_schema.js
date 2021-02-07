'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CandidateSchema extends Schema {
  up () {
    this.create('candidates', (table) => {
      table.increments()
      table.string('name')
      table.string('email')
      table.integer('age')
      table.string('linkedin')
      table.string('skills')
      table.timestamps()
    })
  }

  down () {
    this.drop('candidates')
  }
}

module.exports = CandidateSchema
