export default function (name, m) {
  return {
    add(scenario, value) {
      let component = value
      if (typeof value === 'string') {
        component = {template: value}
      } else if (typeof value === 'function') {
        component = {render: value}
      }
      component.example = component.example || component.template
      m.exports[name] = m.exports[name] || []
      m.exports[name].push({
        scenario,
        component
      })
      return this
    }
  }
}
