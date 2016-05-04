import { normalize } from 'normalizr'
import axios from 'axios'
import { getFreshToken } from 'tc-accounts'
import { WORK_API_URL } from '../../constants.js'
import map from 'lodash/map'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export default function callApi({ schema, endpoint, ignoreResult, method, data, params }) {
  const executeRequest = (token) => {
    const config = {
      url: formatUrl(endpoint, params),
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

function formatUrl(endpoint, params) {
  return WORK_API_URL + endpoint + formatParams(params)
}

function formatParams(params) {
  const paramArray = map( params, (value, key) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return key + '=' + value
    }
    
    if (typeof value === 'object') {
      return key + '=' + formatFilters(value)
    }
  })
  
  if (paramArray.length) {
    return '?' + paramArray.join('&')
  } else {
    return ''
  }
}

function formatFilters(filters) {
  const filterArray = map( filters, (value, key) => {
    return key + '=' + value
  })

  return encodeURIComponent(filterArray.join('&'))
}