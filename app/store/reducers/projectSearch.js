const defaultState = {
  items: []
}

export default function projectSearch(state = defaultState) {
  return Object.assign({}, state, {
    lastUpdated: (new Date()).toISOString()
  })
}