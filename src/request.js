const fetch = require('node-fetch')

const hashKey = process.env.HASH_KEY

const encodedAuthorizationHeader = new Buffer(`hash_key:${hashKey}`).toString('base64')

const authorizationHeader = `Basic ${encodedAuthorizationHeader}`

const makeRequest = (method, payload) => ({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': authorizationHeader,
  },
  body: payload && JSON.stringify(payload),
  method,
})

const get = (url) => fetch(url, makeRequest('GET'))
  .then(response => response.json())
  .then(response => {
    if (response.errors) { throw response }
  })

const post = (url, payload) => fetch(url, makeRequest('POST', payload))
  .then(response => response.json())
  .then(response => {
    if (response.errors) { throw response }
  })

module.exports = { get, post }