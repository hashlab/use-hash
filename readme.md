![Use Hash](https://user-images.githubusercontent.com/7863230/96945795-0fb3a680-14b5-11eb-8171-47da9e9261fa.png)

> From your "first test request" to your "first production transaction" and beyond

This is a guide to support developers that are integrating with Hash API for the first time. The initial part of this document is a step-by-step guide on the requests you need to make in order for your first test transaction work. The second part will better illustrate all entities that we created in this guide and how they corelate in Hash environment.

The code part of this guide was writen in JS for illustration. For more information on the code there is a section below the guide [about the code in this repository](#about-the-code-in-this-repository)

# Step-by-step request guide to your first transaction 

If you are reading this document you might have received your initial credentials email with our API Docs link and your API test key. You are a company in hash API now, your api key is directly tied with your company.

An API key will be required for every request in our API and it is sent on the header. To see how that happens at the code level check out the [request module](./src/request.js) for this repository, the function "makeRequest" (line 3) builds the correct header using a Hash API Key.

## Create company

Your company is the parent of all the companies you create in our API, and in order to make a transaction your first step is to create a company that will be responsible for this transaction.

When succesfull the request below will return an object that represents the new company created. **For all the other next steps use the API key that is returned inside the company object from this request's response, this is how we bind all other entities to this company**

The `createCompany` used is this file: [mock-data/create-company.json](./src/mock-data/create-company.json)

The `parentCompanyApiKey` used is your API key

```js
const childCompany = await post(
  'https://api.hash.com.br/children/companies',
  createCompany,
  parentCompanyApiKey
)

childCompanyApiKey = childCompany.hash_key
childCompanyId = childCompany.id
```
_source: ["Create company" in index.test.js](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L10-L27)_

_API Docs source: https://docs.hash.com.br/reference#create-merchant_

## Create affiliation

After creating a company you have to have to create an affiliation which will contain the provider used in order to register transactions. In order to do that we send this request:

The `createAffiliation` used is this file: [mock-data/create-affiliation.json](./src/mock-data/create-affiliation.json)

```js
const company = await post(
  'https://api.hash.com.br/affiliations',
  createAffiliation,
  childCompanyApiKey
)
```
_source: ["Create affiliation" in index.test.js](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L30-L43)_

_API Docs source: https://docs.hash.com.br/reference#create-affiliations_

## Configure fee rule

After creating a company and an affiliation you have to register the fee rule for the company created. In order to do that we use this request:

The `createFeeRule` used is this file: [mock-data/create-fee-rule.json](./src/mock-data/create-fee-rule.json)

```js
const feeRule = await post(
  `https://api.hash.com.br/children/${childCompanyId}/fee_rule`
  createFeeRule,
  parentCompanyApiKey
)
```
_source: ["Create fee rule" in index.test.js](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L46-L57)_

_API Docs source: https://docs.hash.com.br/reference#create-fee-rule_

## Register Hardware

The last step before being able to register transaction is to register a hardware (For example, a POS). Be sure to alter the data to math your hardware model. The serial number can be found on a barcode sticker attached to the hardware box, the model and provider can be found on the hardware itself. To register a hardware we use this request:

The `registerHardware` used is this file: [mock-data/register-hardware.json](./src/mock-data/register-hardware.json)

```js
const hardware = await post(
  `https://api.hash.com.br/children/${childCompanyId}/hardwares`,
  registerHardware,
  parentCompanyApiKey
)
```
_source: ["Register hardware" in index.test.js](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L60-L75)_

_API Docs source: https://docs.hash.com.br/reference#register-a-hardware_

## Register Transaction 

With everything properly registered you should now be abot to make a transaction with your hardware. In order to do that turn it on, input the  merchant document number in order to activate the terminal, and you should be able to swipe a card and make a test transaction.

# Beyond the first transaction

## View all transactions for a company

Now that you made a transaction you should be able to see it in Hash API. To view all transactions for a company use this request and use the apikey for the correspondent company you want to:

```js
const response = await get(
  'https://api.hash.com.br/children/transactions?count=10&page=1',
  {}, // empty body because it's a GET request, parameters are above in URL.
  childCompanyApiKey
)
```
_source: ["View all transactions for a company" in index.test.js](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L90-L98)_

_API Docs source: https://docs.hash.com.br/reference#get-all-transactions_

## View financial calendar for a company 

There is an entity called "payables" which represents an amount of money to be paid to someone. You can list a company's payables in order to have it's financial calendar:

```js
const response = await get(
  `https://api.hash.com.br/payables/${childCompanyId}`,
  {},
  childCompanyApiKey
)
```

## Set anticipation configuration

Anticipation is the act of requesting a payout using future payables. You can schedule anticipations to happen periodically or can choose to manually anticipate whenever you want to. By default anticipations are automatic and the interval is 1 day, but you can se your own default for the companies you create by updating them in the following route

```js
const response = await put(
  'https://api.hash.com.br/anticipation',
  {
    "anticipation_type": "automatic", // or "spot" for disabling automatic anticipation
    "anticipation_days_interval": 7, // min 1, max 30. If above is "spot" this is ignored.
  },
  childCompanyApiKey
)
```

The API key used will determine the company to be updated.

## Simulating spot anticipation

Before executing it's recommended to simulate your anticipation in order to see if things will happen as expected.

First make sure that the company has "spot" anticipation enabled insted of "automatic". This can be done with the following request:

```js
const response = await put(
  'https://api.hash.com.br/anticipation',
  {
    "anticipation_type": "spot"
  },
  childCompanyApiKey
)
```

With the company correctly configured for spot anticipation, execute the simulation request:

```js
const response = await post(
  'https://api.hash.com.br/anticipation/simulation',
  {
    "anticipate_to": "2019-05-13",
    "payables_priority": "start",
    "anticipate_all": false,
    "anticipation_type": "per_month",
    "anticipation_fee": 3,
    "requested_amount": 500
  },
  childCompanyApiKey
)
```

_API Docs source: https://docs.hash.com.br/reference#sobre-a-spot-anticipation_

## Executing spot anticipation _(work in progress)_

To execute a spot anticipatin we do the following request:

_API Docs source: https://docs.hash.com.br/reference#spot-anticipation_

## Create charge _(work in progress)_

tbd

# About the code in this repository

This repository can be cloned and you can run the code to test request by yourself:

1) Install [Node.js](https://nodejs.org/en/)
2) Clone this repository
3) Run `npm install` to install dependencies
4) Add your API key and IDs
5) Run `npm test` to run all tests

About 4, here are the places where you'll have to change in order for the tests in [**index.test.js**](./src/inde.test.js) to work. Here are some of the lines you will have to change, it's wise to check all fields in the mock data and change them to your testing needs:

* [**line 4**](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L4): Add the API Key of your parent company

    * If you already ran the test once you have to change the document number on line 16 in order to create a new 
company. The document number is an unique identifier for our API.

* [**line 14**](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L14): Will work only once since you can only create one company for each document number. Change it to create another company.

* [**line 15**](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L15): Add a valid mcc (Your valid MCCs are sent together with your API Key)

* [**line 34**](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L34): Add a valid internal_merchant_id (Your valid internal_merchant_id's are sent together with your API Key)

* [**lines 64 to 66**](https://github.com/hashlab/use-hash/blob/main/src/index.test.js#L64-L66): Add your hardware information

# Other Links

* API Docs: https://docs.hash.com.br/
* Hash Website: https://hash.com.br/
