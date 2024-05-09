const API_COMPUTERS = 'http://35.225.111.193:8181/api/v3/products/computers/'
const API_CURRENCY =
  'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD'
const API_COMPUTERS_NEW = 'https://web-app.click/pc-shop/api/v0/products/'

const API_STUDENTS = 'https://web-app.click/university/api/v1/students/'

async function sendRequest(url) {
  const resp = await fetch(url)
  return resp.json()
}

async function loadCurrency() {
  const currency = await sendRequest(API_CURRENCY)
  return currency.USD
}

async function loadComputers(id = '') {
  return sendRequest(API_COMPUTERS_NEW + id)
}

async function loadReviews(id = '') {
  return sendRequest('API_test' + id)
}

async function loadStudents() {
  return sendRequest(API_STUDENTS)
}

async function getStudents() {
  const response = await loadStudents()
  if (response.code === 200) {
  }
}

async function sendRequestDelete(url) {
  const resp = await fetch(url)
  return resp.json()
}
