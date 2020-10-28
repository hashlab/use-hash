const test = require('ava')
const { get, post, put } = require('./request')

const parentCompanyApiKey = 'hash_xxxxxxxxxxxxxxxxxxxxxxxxxx' // parent company API key goes here

let childCompanyApiKey = null // this will be filled on "Create Company"
let childCompanyId = null // this will be filled on "Create Company"


test.serial('Create company', async t => {

  const createCompany = require('./mock-data/create-company') 

  createCompany.document_number = '37082486006' // change this if you need to create a new company after testing once
  createCompany.mcc = '1234' // use one of the MCCs you have received along with your API key
  
  const childCompany = await post('https://api.hash.com.br/children/companies', createCompany, parentCompanyApiKey)

  t.falsy(childCompany.errors)

  console.log('Company created!')
  console.log(childCompany)

  childCompanyApiKey = childCompany.hash_key
  childCompanyId = childCompany.id
  
})


test.serial('Create affiliation', async t => {

  const createAffiliation = require('./mock-data/create-affiliation')

  createAffiliation.internal_merchant_id = '124878740' // Use one of the Merchant Internal IDs you have received along with your API key

  const affiliation = await post('https://api.hash.com.br/affiliations', createAffiliation, childCompanyApiKey)

  t.falsy(affiliation.errors)

  console.log('Affiliation created!')
  console.log(affiliation)
  
})


test.serial('Configure fee rule', async t => {

  const createFeeRule = require('./mock-data/create-fee-rule') 

  const feeRule = await post(`https://api.hash.com.br/children/${childCompanyId}/fee_rule`, createFeeRule, parentCompanyApiKey)

  t.falsy(feeRule.errors)

  console.log('Fee rule configured!')
  console.log(feeRule)
  
})


test.serial('Register hardware', async t => {

  const registerHardware = require('./mock-data/register-hardware') 

  registerHardware.serial_number = '6L159122'
  registerHardware.terminal_model = 's920'
  registerHardware.hardware_provider = 'pax'

  const hardware = await post(`https://api.hash.com.br/children/${childCompanyId}/hardwares`, registerHardware, parentCompanyApiKey)
  
  t.falsy(hardware.errors)

  console.log('Hardware registered!')
  console.log(hardware)

})


// test.serial('Deregister hardware', async t => {

//   const response = await post(`https://api.hash.com.br/children/${childCompanyId}/hardwares/5f7f25b91fdd410006aa8a6a/disable`, {}, parentCompanyApiKey)
  
//   t.falsy(response.errors)

//   console.log('Hardware deleted!')
//   console.log(response)

// })


test.serial('View all transactions for a company', async t => {

  const response = await get('https://api.hash.com.br/transactions', {}, childCompanyApiKey)
  
  t.falsy(response.errors)

  console.log(response)

})

test.serial('View financial calendar for a company', async t => {

  const response = await get(`https://api.hash.com.br/payables/${childCompanyId}`, {}, childCompanyApiKey)
  
  t.falsy(response.errors)

  console.log(response)

})

test.serial('Change anticipation configuration', async t => {

  const response = await put('https://api.hash.com.br/anticipation', { anticipation_type: "automatic" /*spot*/ , anticipation_days_interval: 1 /*max 30*/ }, childCompanyApiKey)
  
  t.falsy(response.errors)

  console.log(response)

})

test.serial('Simulate spot anticipation', async t => {

  const response = await post('https://api.hash.com.br/anticipation/simulation', simulateAnticipation, childCompanyApiKey)
  
  t.falsy(response.errors)

  console.log(response)

})

test.serial('Execute spot anticipation', async t => {

  const response = await post('https://api.hash.com.br/anticipation', executeAnticipation, childCompanyApiKey)
  
  t.falsy(response.errors)

  console.log(response)

})

test.serial('Create charge', async t => {

  const response = 
  
  t.falsy(response.errors)

  console.log(response)

})

