// Generates a random number [min, max)
function range(min, max) {
  const rand = Math.random()

  return Math.floor(rand * (max - min) + min)
}

function digits(count) {
  const d = []
  for (let i=0; i<count; i++) {
    d.push(range(0, 10))
  }

  return d.join('')
}

function choice(items) {
  return items[range(0, items.length)]
}

module.exports = {range, choice, digits}
