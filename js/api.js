const API_COMPUTERS = 'http://35.225.111.193:8181/api/v3/products/computers/'
const API_CURRENCY =
  'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD'
const API_PRODUCTS = 'https://web-app.click/pc-shop/api/v0/products/'
const API_AUTH = 'https://web-app.click/pc-shop/api/v0/auth'
const API_CUSTOMERS = 'https://web-app.click/pc-shop/api/v0/customers/'

const API_SIMILAR = id => API_PRODUCTS + id + '/similar'

async function sendRequest(url) {
  const resp = await fetch(url) // { credentials: 'include' }
  return resp.json()
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
  return sendRequest(API_AUTH)
}

async function loadRecomendProducts(id = '') {
  return sendRequest(API_CUSTOMERS + id + '/recomend/')
}

async function loadSimilarProducts(id) {
  return sendRequest(API_SIMILAR(id))
}
