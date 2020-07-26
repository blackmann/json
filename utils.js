// Generates a random number between min and max
function range(min, max) {
  const rand = Math.random()

  return Math.floor(rand * (max - min) + min)
}

module.exports = {range}
