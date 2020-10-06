# Use Hash (work in progress)

`From your "first test request" to your "first production transaction"`

This is a guide to support developers that are integrating with Hash API for the first time. The initial part of this document is a step-by-step guide on the requests you need to make in order for your first test transaction work. The second part will better illustrate all entities that we created in this guide and how they corelate in Hash environment.

The code part of this guide was writen in JS for illustration. The code used can be ran locally by cloning this repository, installing node.js, run `npm install` to install dependencies, add your hash_key to .env, then finally `npm test` to run all tests written on this guide.

# Step-by-step request guide 

If you are reading this document you might have received your initial credentials email with our API Docs link and your API test key. You are a company in hash API now, your api key is directly tied with your company. 

## Create company

Your company is the parent of all the companies you create in our API, and in order to make a transaction your first step is to create a company that will be responsible for this transaction.

When succesfull the request below will return an object that represents the new company created. **For all the other next steps use the API key that is returned inside the company object from this request's response, this is how we bind all other entities to this company**

The `createCompany` used is this file: [mock-data/create-company.json](./mock-data/create-company.json)

The `parentCompanyApiKey` used is this file: [mock-data/create-company.json](./mock-data/create-company.json)

```js
  const childCompany = await post('https://api.hash.com.br/children/companies', createCompany, parentCompanyApiKey)

  childCompanyApiKey = childCompany.api_key
```
_source: "Create company" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#create-merchant_

*_Note about MCC field: In production when creating a company you have to send the correct MCC number since the costs related to a transaction are referenced from the MCC. If you are integrating our API now you should already have the MCCs that will be used since this is done before the API integration step._

## Create affiliation

After creating a company you have to have to create an affiliation which will contain the provider used in order to register transactions. In order to do that we send this request:

The `createAffiliation` used is this file: [mock-data/create-affiliation.json](./mock-data/create-affiliation.json)

```js
const company = post('https://api.hash.com.br/affiliations', createAffiliation, childCompanyApiKey)
```
_source: "Create affiliation" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#create-affiliations_

## Configure fee rule

After creating a company and an affiliation you have to register the fee rule for the company created. In order to do that we use this request:

The `createFeeRule` used is this file: [mock-data/create-fee-rule.json](./mock-data/create-fee-rule.json)

```js
const feeRule = await post('https://api.hash.com.br/feeRules', createFeeRule, childCompanyApiKey)
```
_source: "Create fee rule" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#create-fee-rule_

## Register Hardware

The last step before being able to register transaction is to register a hardware (For example, a POS). To register a hardware we use this request:

The `registerHardware` used is this file: [mock-data/register-hardware.json](./mock-data/register-hardware.json)

```js
const hardware = await post('https://api.hash.com.br/children/company_id/hardwares', registerHardware, childCompanyApiKey)
```
_source: "Register hardware" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#register-a-hardware

## Register Transaction 

????????????