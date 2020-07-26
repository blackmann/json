const Factory = require('rosie').Factory
const faker = require('faker')
const uuid = require('uuid').v4
const fs = require('fs')
const path = require('path')
const utils = require('../../utils')

const outDir = '../../db/jaksally/groups.json'

Factory.define('address')
  .attr('street', () => faker.address.streetName())
  .attr('town', () => faker.address.county())
  .attr('region', () => faker.address.state())
  .attr('country', () => 'Ghana')

Factory.define('group')
  .attr('id', () => uuid())
  .attr('name', () => faker.company.companyName())
  .attr('members' ,() => utils.range(30, 50))
  .attr('address', () => Factory.build('address'))
  .attr('formation', () => new Date().toISOString())

const data = Factory.buildList('group', 20)

fs.writeFileSync(path.resolve(__dirname, outDir), JSON.stringify(data, null, 2))
