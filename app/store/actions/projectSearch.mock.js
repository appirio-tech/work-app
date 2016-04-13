export default function callApi() {
  return Promise.resolve(response)
}

const response = {
  entities: {
    projects: {
      0: {
        id: 0,
        name: 'Alpha'
      },
      1: {
        id: 1,
        name: 'Beta'
      },
      2: {
        id: 2,
        name: 'Gamma'
      },
      3: {
        id: 3,
        name: 'Delta'
      }
    }
  },
  result: [0, 1, 2, 3]
}