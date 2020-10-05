require('dotenv').config()

const test = require('ava')
const { get, post, put } = require('./request')

// first-request to first-transaction

let newCompanyId = null

// test.serial('Create a company', async t => {

//   const companyCreationData = require('./mock-data/company-creation') 
  
//   const company = await post('https://api.hash.com.br/children/companies', companyCreationData)

//   newCompanyId = company.id
  
// })

// test.serial('Check created company', async t => {
  
//   const response = await get('https://api.hash.com.br/children/companies?company_id=' + newCompanyId)
  
//   t.truthy(response)
  
// })

// test.skip.serial('Deactivate company', async t => {

//   const companyCreationData = require('./mock-data/company-creation') 


//   // User status possibilities: https://github.com/hashlab/hashql/blob/c425a6c0e5f85c1b6c238e763e42cc16db3ba7dd/packages/entities/src/user/user.ts#L10
  
//   // const response = await put('https://api.hash.com.br/children/companies', { company_id: '5f71f5833d94ba00064a75cf' })
  
//   t.truthy(response)
  
// })

// test.serial('Check all companies', async t => {
  
//   const response = await get('https://api.hash.com.br/children/companies')

//   console.log(response)
  
//   t.truthy(response)
  
// })



// test.serial('Create an affiliation', async t => {

//   const affilitaionCreationData = require('./mock-data/affiliation-creation.json')
  
//   const affiliation = await post('https://api.hash.com.br/affiliations', affilitaionCreationData)

//   console.log(affiliation)
  
// })



const cost = {
  "mcc": "7998",
  "provider": "hash",
  "anticipation_cost": 1.38,
  "brands": [{
    "brand": "visa",
    "cost": {
      "debit": 0.87,
      "credit_1": 1.53,
      "credit_2": 1.73,
      "credit_7": 2.25  
    }
  }, {
    "brand": "mastercard",
    "cost": {
      "debit": 0.87,
      "credit_1": 1.41,
      "credit_2": 1.64,
      "credit_7": 1.68  
    }
  }, {
    "brand": "hiper",
    "cost": {
      "debit": 0.93,
      "credit_1": 1.86,
      "credit_2": 2.06,
      "credit_7": 2.41
    }
  }, {
    "brand": "elo",
    "cost": {
      "debit": 0.93,
      "credit_1": 1.86,
      "credit_2": 2.06,
      "credit_7": 2.41
    }
  }, {
    "brand": "amex",
    "cost": {
      "debit": 0.93,
      "credit_1": 1.86,
      "credit_2": 2.06,
      "credit_7": 2.41
    }
  }]
}

test.serial('Change your company cost', async t => {
  
  const response = await post('https://api.hash.com.br/companies/mcc', cost)

  console.log(response)
  
  t.truthy(response)
  
})

// test.serial('Consult your company cost', async t => {

  
//   const response = await get('https://api.hash.com.br/companies/mcc')

//   console.log(response)
  
//   t.truthy(response)
  
// })