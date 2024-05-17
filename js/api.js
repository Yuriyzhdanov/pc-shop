const API_COMPUTERS = 'http://35.225.111.193:8181/api/v3/products/computers/'
// https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json
const API_CURRENCY =
  'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD'
const API_PRODUCTS = 'https://web-app.click/pc-shop/api/v0/products/'
const API_AUTH = 'https://web-app.click/pc-shop/api/v0/auth'
const API_CUSTOMERS = 'https://web-app.click/pc-shop/api/v0/customers/'

const API_SIMILAR = id => API_PRODUCTS + id + '/similar'

async function sendRequest(url, options = {}) {
  const resp = await fetch(url, options)
  return resp.json()
}

async function sendRequestWithCred(url) {
  const options = {
    credentials: 'include',
  }
  const json = await sendRequest(url, options)
  return checkSuccess(json)
}

function checkSuccess(json) {
  if (json.success === true) {
    return json.payload ?? json.userId
  } else if (json.success === undefined) {
    return json
  }
  return []
}

async function loadCurrency() {
  const currency = await sendRequest(API_CURRENCY)
  return currency.USD
}

async function loadComputers(id = '') {
  return sendRequest(API_PRODUCTS + id)
}

async function loadReviews(id = '') {
  return sendRequest('API_test' + id)
}

async function sendRequestDelete(url) {
  const resp = await fetch(url)
  return resp.json()
}

async function loadAuth() {
  return sendRequestWithCred(API_AUTH)
}

async function loadRecommendedProductsById(id) {
  let resp = await sendRequestWithCred(API_CUSTOMERS + id + '/recomend/')
  console.log('resp :>> ', resp)
  return resp.map(el => el.productId)
}

async function loadSimilarProducts(id) {
  return sendRequest(API_SIMILAR(id))
}
