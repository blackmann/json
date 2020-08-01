const utils = require('./utils')

/**
 * All tests are observational!!
 */

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
  console.log(utils.choice([1, 2, 3]))
}

function testChoiceEmptyArray() {
  console.log(utils.choice([]))
}

function testDigits() {
  console.log(utils.digits(7))
}

function testSlice(matchStyle, expect) {
  const data = require('./db/jaksally/groups.json')

  const query_filter = 'address__town' + matchStyle

  const s = data.filter((v) => {
    const d = utils.slice(v, query_filter)

    return d.matcher(d.value, expect)
  })

  console.log(s.length)
}

function testSliceIexact() {
  testSlice('__iexact', 'BEDFORDSHIRE')
}

function testSliceExact() {
  testSlice('', 'Bedfordshire')
}

function testSliceContains() {
  testSlice('__contains', 'dshire')
}

function testSliceIcontains() {
  testSlice('__icontains', 'DSHIRE')
}

[
  testRange,
  testRangeEmpty,
  testChoice,
  testChoiceEmptyArray,
  testDigits,
  testSliceExact,
  testSliceIexact,
  testSliceContains,
  testSliceIcontains,
].forEach((test) => {
  try {
    console.log(`\n${test.name}`)
    test()
  } catch (err) {
    console.log(err)
  }
})
