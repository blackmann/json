const path = require('path')
const faker = require('faker')
const uuid = require('uuid').v4
const Template = require('../template')
const utils = require('../../utils')

const profileTypes = ['field_officer', 'member', 'manager', 'administrator']

class Profiles extends Template {
  getFactoryName() {
    return 'profiles'
  }

  getAttrs() {
    return {
      id: () => uuid(),
      name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
      type: () => utils.choice(profileTypes),
      phone: () => `024${utils.digits(7)}`
    }
  }

  getSaveFile() {
    return path.resolve(__dirname, '../../db/jaksally/profiles.json')
  }
}

new Profiles().save()
