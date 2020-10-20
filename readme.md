# Use Hash (work in progress)

`From your "first test request" to your "first production transaction"`

This is a guide to support developers that are integrating with Hash API for the first time. The initial part of this document is a step-by-step guide on the requests you need to make in order for your first test transaction work. The second part will better illustrate all entities that we created in this guide and how they corelate in Hash environment.

The code part of this guide was writen in JS for illustration. For more information on the code there is a section below the guide [about the code in this repository](#about-the-code-in-this-repository)

# Step-by-step request guide 

If you are reading this document you might have received your initial credentials email with our API Docs link and your API test key. You are a company in hash API now, your api key is directly tied with your company.

An API key will be required for every request in our API and it is sent on the header. To see how that happens at the code level check out the [request module](./src/request.js) for this repository, the function "makeRequest" (line 3) builds the correct header using a Hash API Key.

## Create company

Your company is the parent of all the companies you create in our API, and in order to make a transaction your first step is to create a company that will be responsible for this transaction.

When succesfull the request below will return an object that represents the new company created. **For all the other next steps use the API key that is returned inside the company object from this request's response, this is how we bind all other entities to this company**

The `createCompany` used is this file: [mock-data/create-company.json](./mock-data/create-company.json)

The `parentCompanyApiKey` used is this file: [mock-data/create-company.json](./mock-data/create-company.json)

```js
const childCompany = await post('https://api.hash.com.br/children/companies', createCompany, parentCompanyApiKey)

childCompanyApiKey = childCompany.hash_key
childCompanyId = childCompany.id
```
_source: "Create company" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#create-merchant_

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
const feeRule = await post(`https://api.hash.com.br/children/${childCompanyId}/fee_rule`, createFeeRule, parentCompanyApiKey)
```
_source: "Create fee rule" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#create-fee-rule_

## Register Hardware

The last step before being able to register transaction is to register a hardware (For example, a POS). Be sure to alter the data to math your hardware model. The serial number can be found on a barcode sticker attached to the hardware box, the model and provider can be found on the hardware itself. To register a hardware we use this request:

The `registerHardware` used is this file: [mock-data/register-hardware.json](./mock-data/register-hardware.json)

```js
const hardware = await post(`https://api.hash.com.br/children/${childCompanyId}/hardwares`, registerHardware, parentCompanyApiKey)
```
_source: "Register hardware" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#register-a-hardware_

## Register Transaction 

With everything properly registered you should now be abot to make a transaction with your hardware. In order to do that turn it on, input the  merchant document number in order to activate the terminal, and you should be able to swipe a card and make a test transaction.

## View all transactions for a company

Now that you made a transaction you should be able to see it in Hash API. To view all transactions for a company use this request and use the apikey for the correspondent company you want to:

```js
const response = await get('https://api.hash.com.br/children/transactions?count=10&page=1', {}, childCompanyApiKey)
```
_source: "View all transactions for a company" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#get-all-transactions_

# About the code in this repository

This repository can be cloned and you can run the code to test request by yourself:

1) Install [Node.js](https://nodejs.org/en/)
2) Clone this repository
3) Run `npm install` to install dependencies
4) Add your API key and IDs
5) Run `npm test` to run all tests

About 4, here are the places where you'll have to change in order for the tests in [**index.test.js**](./src/inde.test.js) to work:

* **line 4**: Add the API Key of your parent company

    * If you already ran the test once you have to change the document number on line 16 in order to create a new 
company. The document number is an unique identifier for our API.

* **line 15**: Add a valid mcc (Your valid MCCs are sent together with your API Key)

* **line 34**: Add a valid internal_merchant_id (Your valid internal_merchant_id's are sent together with your API Key)

* **lines 64, 65 and 66**: Add your hardware information
