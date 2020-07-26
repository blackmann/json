const fs = require('fs')
const Factory = require('rosie').Factory

class Template {

  // FIXME: Use factory name, and require only save path

  getSaveFile() {
    return 'template.json'
  }

  getAttrs() {
    return {
      name: () => 'Hello Gen!'
    }
  }

  getFactoryName() {
    return 'sample'
  }

  getCount() {
    return 20
  }

  build() {
    Factory.define(this.getFactoryName())
      .attrs(this.getAttrs())

    return Factory.buildList(this.getFactoryName(), this.getCount())
  }

  save() {
    const data = this.build()
    fs.writeFileSync(this.getSaveFile(), JSON.stringify(data, null, 2))
  }
}

module.exports = Template
