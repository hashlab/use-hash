# Use Hash (work in progress)

`From your "first test request" to your "first production transaction"`

This is a guide to support developers that are integrating with Hash API for the first time. The initial part of this document is a step-by-step guide on the requests you need to make in order for your first test transaction work. The second part will better illustrate all entities that we created in this guide and how they corelate in Hash environment.

The code part of this guide was writen in JS for illustration. The code used can be ran locally by cloning this repository, installing node.js, run `npm install` to install dependencies, add your hash_key to .env, then finally `npm test` to run all tests written on this guide.

# Step-by-step request guide 

If you are reading this document you might have received your initial credentials email with our API Docs link and your API test key. You are a company in hash API now, your api key is directly tied with your company. 

## Create company

Your company is the parent of all the companies you create in our API, and in order to make a transaction your first step is to create a company that will be responsible for this transaction.

When succesfull the request below will return an object that represents the new company created.

The `companyCreationData` used is this file: [mock-data/company-creation.json](./mock-data/company-creation.json)

```js
post('https://api.hash.com.br/children/companies', companyCreationData)
```
_source: "Create a company" in [index.test.js](./src/index.test.js)_

_API Docs source: https://docs.hash.com.br/reference#create-merchant_

## Enable Dashboard (optional)

You can enable access to our Dashboard for an existing company by making the request bellow which will activate this company's user.

## Create affiliation

After creating a company you have to have to create an affiliation which will contain the provider used in order to register transactions. In order to do that we send this request:

## Configure fee rule

After creating a company and an affiliation you have to register the fee rule for the company created. In order to do that we use this request:

## Register Hardware

The last step before being able to register transaction is to register a hardware (For example, a POS). To register a hardware we use this request:

## Register Transaction

We can now register transactions