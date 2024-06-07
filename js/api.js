const API_COMPUTERS = 'http://35.225.111.193:8181/api/v3/products/computers/'
const API_CURRENCY =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const API_PRODUCTS = 'https://web-app.click/pc-shop/api/v0/products/'
const API_AUTH = 'https://web-app.click/pc-shop/api/v0/auth'
const API_CUSTOMERS = 'https://web-app.click/pc-shop/api/v0/customers/'
const API_SIMILAR = id => API_PRODUCTS + id + '/similar'
const API_FAVORITES =
  'https://web-app.click/pc-shop/api/v0/customers/3/favorites/'
// const API_FAVORITES = id => `${API_CUSTOMERS}${id}/favorites/`

async function sendRequest(url, options = {}) {
  const resp = await fetch(url, options)
  if (resp.status === 204) {
    return
  }
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

async function loadAuth() {
  return await sendRequestWithCred(API_AUTH)
}

async function loadRecommendedProductsById(id) {
  let resp = await sendRequestWithCred(API_CUSTOMERS + id + '/recomend/')
  return resp.map(product => product.productId)
}

async function loadSimilarProductsById(id) {
  const resp = await sendRequest(API_SIMILAR(id))
  return resp.map(product => product.relatedProductId)
}

async function loadFavoriteProducts() {
  const options = {
    headers: {
      Cookie: 'session=ff0099aa',
    },
    credentials: 'include',
  }
  return await sendRequest(API_FAVORITES, options)
}

async function loadFavoriteProductsById() {
  const res = await loadFavoriteProducts()
  return res.map(product => product.productId)
}

async function updateFavoritesProductsById(productId) {
  const options = {
    method: 'POST',
    headers: {
      Cookie: 'session=ff0099aa',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ productId: productId }),
  }
  return await sendRequest(API_FAVORITES, options)
}

async function deleteFavoritesById(idProd) {
  const options = {
    method: 'DELETE',
    headers: {
      Cookie: 'session=ff0099aa',
    },
    credentials: 'include',
  }
  return await sendRequest(API_FAVORITES + idProd, options)
}

// async function loadReviews(id = '') {
//   return await sendRequest('API_test' + id)
// }
// async function run() {
//   await updateFavoritesProductsById(69)
// }
// run()
