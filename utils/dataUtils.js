export function getNearestDate(array) {

  return array.sort((a, b) => new Date(a) - new Date(b));
}
