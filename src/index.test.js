require('dotenv').config()

const test = require('ava')
const { get, post, put } = require('./request')

// first-request to first-transaction

parentCompanyApiKey = process.env.PARENT_COMPANY_API_KEY

let childCompanyApiKey = null

test.serial('Create a company', async t => {

  const createCompany = require('./mock-data/create-company') 

  createCompany.document_number = '37082486006' // change this if you need to create a new company after testing once
  
  const childCompany = await post('https://api.hash.com.br/children/companies', createCompany, parentCompanyApiKey)

  childCompanyApiKey = childCompany.api_key
  
})

test.serial('Create affiliation', async t => {

  const createAffiliation = require('./mock-data/create-affiliation') 

  const affiliation = await post('https://api.hash.com.br/affiliations', createAffiliation, childCompanyApiKey)
  
})

test.serial('Configure fee rule', async t => {

  const createFeeRule = require('./mock-data/create-fee-rule') 

  const feeRule = await post('https://api.hash.com.br/feeRules', createFeeRule, childCompanyApiKey)
  
})

test.serial('Register hardware', async t => {

  const registerHardware = require('./mock-data/register-hardware') 

  const hardware = await post('https://api.hash.com.br/children/company_id/hardwares', registerHardware, childCompanyApiKey)
  
})