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
      component.name = component.name || scenario.replace(' ', '-')
      m.exports.spots = m.exports.spots || {}
      m.exports.spots[name] = m.exports.spots[name] || []
      m.exports.spots[name].push({
        scenario,
        component
      })
      return this
    }
  }
}
