const Factory = require('rosie').Factory
const faker = require('faker')
const uuid = require('uuid').v4
const utils = require('../../utils')
const Template = require("../template");
const path = require("path");

class Groups extends Template {

  getFactoryName() {
    return 'groups'
  }

  getAttrs() {
    Factory.define('address')
      .attr('street', () => faker.address.streetName())
      .attr('town', () => faker.address.county())
      .attr('region', () => faker.address.state())
      .attr('country', () => 'Ghana')

    return {
      id: () => uuid(),
      name: () => faker.company.companyName(),
      members: () => utils.range(30, 50),
      address: () => Factory.build('address'),
      formation: () => new Date().toISOString(),
    };
  }

  getSaveFile() {
    return path.resolve(__dirname, '../../db/jaksally/groups.json')
  }
}

new Groups().save()
