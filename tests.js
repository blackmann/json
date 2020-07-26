const utils = require('./utils')


function testRange() {
  for (let i = 0; i < 50; i++) {
    const s = utils.range(5, 20)

    if (s < 5 || s > 19) {
      throw Error('range test failed')
    }
  }
}

// when start, end are equal
function testRangeEmpty() {
  const s = utils.range(5, 5)
  console.log(s)
}

function testChoice() {
  utils.choice([1, 2, 3])
}

function testChoiceEmptyArray() {
  console.log(utils.choice([]))
}

function testDigits() {
  console.log(utils.digits(7))
}

[
  testRange,
  testRangeEmpty,
  testChoice,
  testChoiceEmptyArray,
  testDigits,
].forEach((test) => {
  try {
    test()
  } catch (err) {
    console.log(err)
  }
})
