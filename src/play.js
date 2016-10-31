export default function (name, m) {
  const exports = m.exports = {}
  return {
    add(scenario, value) {
      let component = value
      if (typeof value === 'string') {
        component = {template: value}
      } else if (typeof value === 'function') {
        component = {render: value}
      }
      component.example = component.example || component.template
      exports[name] = exports[name] || []
      exports[name].push({
        scenario,
        component
      })
      return this
    }
  }
}
