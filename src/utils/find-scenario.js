export default function (spots, query) {
  const scenarios = spots[query.spot]
  if (scenarios) {
    const scenario = scenarios.filter(scenario => {
      return scenario.scenario === query.scenario
    })[0]
    return scenario
  }
}
