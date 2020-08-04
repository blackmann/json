const path = require('path')
const Template = require('../template')


class Timeline extends Template {

  getFactoryName() {
    return 'timelines';
  }

  getAttrs() {
    return super.getAttrs();
  }

  getSaveFile() {
    return path.resolve(__dirname, '../../db/jaksally/timelines.json')
  }
}
