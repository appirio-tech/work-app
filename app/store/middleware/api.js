import { normalize } from 'normalizr'
import axios from 'axios'
import { getFreshToken } from 'tc-accounts'
import { WORK_API_URL } from '../../constants.js'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export default function callApi({ schema, endpoint, ignoreResult, method, data }) {
  const executeRequest = (token) => {
    const config = {
      url: WORK_API_URL + endpoint,
      method: method || 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }

    if (data) {
      config.data = JSON.stringify(data)
    }

    return axios(config) 
  }

  const handleResponse = (res) => {
    if (ignoreResult) {
      return {}
    } else {
      return Object.assign({}, normalize(res.data.result.content, schema))
    }
  }

  return getFreshToken()
    .then(executeRequest)
    .then(handleResponse)
}