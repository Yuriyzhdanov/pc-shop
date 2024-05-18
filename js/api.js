const API_COMPUTERS = 'http://35.225.111.193:8181/api/v3/products/computers/'
// https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json
// const API_CURRENCY =
//   'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD'
const API_CURRENCY =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const API_PRODUCTS = 'https://web-app.click/pc-shop/api/v0/products/'
const API_AUTH = 'https://web-app.click/pc-shop/api/v0/auth'
const API_CUSTOMERS = 'https://web-app.click/pc-shop/api/v0/customers/'

const API_SIMILAR = id => API_PRODUCTS + id + '/similar'

async function sendRequest(url, options = {}) {
  const resp = await fetch(url, options)
  const json = await resp.json()
  return checkSuccess(json)
}

async function sendRequestWithCred(url) {
  const options = {
    credentials: 'include',
  }
  return await sendRequest(url, options)
}

function checkSuccess(json) {
  if (json.success === true) {
    return json.payload ?? json.userId
  } else if (json.success === undefined) {
    return json
  }
  return null
}

async function loadCurrency() {
  const currencys = await sendRequest(API_CURRENCY)
  const usdCurrency = currencys.find(currency => currency.cc === 'USD')
  return usdCurrency.rate
}

async function loadProducts() {
  return await sendRequest(API_PRODUCTS)
}

async function loadProductById(id) {
  return await sendRequest(API_PRODUCTS + id)
}

async function loadReviews(id = '') {
  return await sendRequest('API_test' + id)
}

async function sendRequestDelete(url) {
  const resp = await fetch(url)
  return await resp.json()
}

async function loadAuth() {
  return await sendRequestWithCred(API_AUTH)
}

async function loadRecommendedProductsById(id) {
  let resp = await sendRequestWithCred(API_CUSTOMERS + id + '/recomend/')
  return resp.map(el => el.productId)
}

async function loadSimilarProducts(id) {
  return sendRequest(API_SIMILAR(id))
}
