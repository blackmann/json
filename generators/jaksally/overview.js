const path = require('path')
const utils = require('../../utils')
const Template = require('../template')

class Overview extends Template {

  getFactoryName() {
    return 'overview'
  }

  isList() {
    return false
  }

  getAttrs() {
    return {
      groups: () => utils.range(120, 200),
      members: () => utils.range(20, 30) * 50,
      fieldOfficers: () => utils.range(40, 50),
      visits: () => utils.range(300, 400),
      rateOfReturn: () => utils.range(60, 80),
      savings: () => utils.range(15, 25) * 950,
      loans: () => utils.range(40, 60) * 500,
    };
  }

  getSaveFile() {
    return path.resolve(__dirname, '../../db/jaksally/overview.json');
  }
}

new Overview().save()
