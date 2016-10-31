export default (a, b) => {
  return Object.keys(a).every(key => {
    return a[key] === b[key]
  })
}
