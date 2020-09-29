require('dotenv').config()

const test = require('ava')
const { get, post } = require('./request')

// first-request to first-transaction

let newCompanyId = null

test.serial('Create a company', async t => {

  const companyCreationData = require('./mock-data/company-creation') 
  
  const company = await post('https://api.hash.com.br/children/companies', companyCreationData)

  newCompanyId = company.id
  
})

test.serial('Check created company', async t => {
  
  const response = await get(`https://api.hash.com.br/children/companies?company_id=${newCompanyId}`)
  
  t.truthy(response)
  
})