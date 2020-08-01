// Generates a random number [min, max)
function range(min, max) {
  const rand = Math.random()

  return Math.floor(rand * (max - min) + min)
}

function digits(count) {
  const d = []
  for (let i = 0; i < count; i++) {
    d.push(range(0, 10))
  }

  return d.join('')
}

// random selection in `items`
function choice(items) {
  return items[range(0, items.length)]
}


// matchers (a is original, b is variable to compared)
function exact(a, b) {
  // doing toString so that numbers are matched too
  return a.toString() === b.toString()
}

function exactWrapper(key) {
  return function(a, b) {
    return exact(a[key], b)
  }
}

// this would just work on strings
function iexact(a, b) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase()
  }

  return false
}

function contains(a, b) {
  return a.indexOf(b) !== -1
}

function icontains(a, b) {
  if (Array.isArray(a)) {
    return a.map((x) => x.toLowerCase()).indexOf(b) !== -1
  }

  return a.toLowerCase().indexOf(b.toLowerCase()) !== -1
}

const matchGraph = {
  iexact,
  contains,
  icontains,
}


/**
 * Used django style attribute access. For example, value__key = value.key,
 * value__x__y__key = value.x.y.key, etc,
 *
 * key is __key or __x__y__key in the examples above.
 *
 * Sample code
 *
 * <code>
 * const value = {
 *
 *   }
 *
 * const a = slice(value, '')
 *
 * console.log(a) // expect:
 * </code>
 */
function slice(value, key) {
  const keys = key.split('__')

  const last = keys.pop()
  const matcher = matchGraph[last] || exactWrapper(last)

  keys.forEach((k) => {
    value = value[k]
  })

  return { value, matcher }
}

module.exports = { range, choice, digits, slice, exact, iexact, contains }
