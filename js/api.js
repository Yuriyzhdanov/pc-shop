const API_COMPUTERS = 'http://35.225.111.193:8181/api/v3/products/computers/'
const API_CURRENCY =
  'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD'
const API_CUR = 'https://api.monobank.ua/bank/currency'

async function sendRequest(url) {
  const resp = await fetch(url)
  return resp.json()
}

async function loadCurrency() {
  const currency = await sendRequest(API_CURRENCY)
  return currency.USD
}

async function loadComputers(id = '') {
  return sendRequest(API_COMPUTERS + id)
}
