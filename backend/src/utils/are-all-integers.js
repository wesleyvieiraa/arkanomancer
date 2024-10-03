module.exports = function areAllIntegers(values) {
  return values.every((element) => Number.isInteger(Number(element)));
}