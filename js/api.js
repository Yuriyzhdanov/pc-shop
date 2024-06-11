const api = {
  COMPUTERS: 'http://35.225.111.193:8181/api/v3/products/computers/',
  CURRENCY: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
  PRODUCTS: 'https://web-app.click/pc-shop/api/v0/products/',
  AUTH: 'https://web-app.click/pc-shop/api/v0/auth',
  CUSTOMERS: 'https://web-app.click/pc-shop/api/v0/customers/',
  FAVORITES: 'https://web-app.click/pc-shop/api/v0/customers/3/favorites/',

  SIMILAR(id) {
    return `${this.PRODUCTS}${id}/similar`
  },

  async sendRequest(url, options = {}) {
    const resp = await fetch(url, options)
    if (resp.status === 204) {
      return
    }
    const json = await resp.json()
    return this.checkSuccess(json)
  },

  async sendRequestWithCred(url) {
    const options = {
      credentials: 'include',
    }
    return await this.sendRequest(url, options)
  },

  checkSuccess(json) {
    if (json.success === true) {
      return json.payload ?? json.userId
    } else if (json.success === undefined) {
      return json
    }
    return null
  },

  async loadCurrency() {
    const currencys = await this.sendRequest(this.CURRENCY)
    const usdCurrency = currencys.find(currency => currency.cc === 'USD')
    return usdCurrency.rate
  },

  async loadProducts() {
    return await this.sendRequest(this.PRODUCTS)
  },

  async loadProductById(id) {
    return await this.sendRequest(this.PRODUCTS + id)
  },

  async loadAuth() {
    return await this.sendRequestWithCred(this.AUTH)
  },

  async loadRecommendedProductsById(id) {
    const resp = await this.sendRequestWithCred(
      this.CUSTOMERS + id + '/recomend/'
    )
    return resp.map(product => product.productId)
  },

  async loadSimilarProductsById(id) {
    const resp = await this.sendRequest(this.SIMILAR(id))
    return resp.map(product => product.relatedProductId)
  },

  async loadFavoriteProducts() {
    const options = {
      headers: {
        Cookie: 'session=ff0099aa',
      },
      credentials: 'include',
    }
    return await this.sendRequest(this.FAVORITES, options)
  },

  async postFavoriteProductId(productId) {
    const options = {
      method: 'POST',
      headers: {
        Cookie: 'session=ff0099aa',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ productId: productId }),
    }
    return await this.sendRequest(this.FAVORITES, options)
  },

  async deleteFavoriteProductId(id) {
    const options = {
      method: 'DELETE',
      headers: {
        Cookie: 'session=ff0099aa',
      },
      credentials: 'include',
    }
    return await this.sendRequest(this.FAVORITES + id, options)
  },
}
