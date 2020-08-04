const path = require('path')
const uuid = require('uuid').v4
const utils = require('../../utils')
const Template = require('../template')


class Chart extends Template {

  getFactoryName() {
    return 'charts';
  }

  getAttrs() {
    return {
      id: () => uuid(),
      loans: () => utils.range(1, 7) * 230,
      savings: () => utils.range(3,7) * 450
    }
  }

  getCount() {
    return 26
  }

  getSaveFile() {
    return path.resolve(__dirname, '../../db/jaksally/charts.json')
  }
}

new Chart().save()
