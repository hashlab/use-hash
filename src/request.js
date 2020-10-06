const fetch = require('node-fetch')

const makeRequest = (method, payload, apiKey) => {

  const encodedAuthorizationHeader = new Buffer(`hash_key:${apiKey}`).toString('base64')

  const authorizationHeader = `Basic ${encodedAuthorizationHeader}`

  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': authorizationHeader,
    },
    body: payload && JSON.stringify(payload),
    method,
  }
}

const get = (url, payload, apiKey) => fetch(url, makeRequest('GET',payload, apiKey))
  .then(response => response.json())
  .then(response => {
    if (response.errors) { throw response }
    return response
  })

const post = (url, payload, apiKey) => fetch(url, makeRequest('POST', payload, apiKey))
  .then(response => response.json())
  .then(response => {
    if (response.errors) { throw response }
    return response
  })

const put = (url, payload, apiKey) => fetch(url, makeRequest('PUT', payload, apiKey))
  .then(response => response.json())
  .then(response => {
    if (response.errors) { throw response }
    return response
  })

module.exports = { get, post, put }