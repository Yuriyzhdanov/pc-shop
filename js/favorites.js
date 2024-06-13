const favorites = {
  products: [],
  counter: 0,
  currencyUSD: 1,

  calcCounter() {
    this.counter = this.products.length
  },

  async addProductById(id) {
    const product = await api.loadProductById(id)
    this.products.push(product)
    await shop.updateCurrencyUSD.call(this)
    this.calcCounter()
    api.postFavoriteProductId(id)
  },

  async updateProducts() {
    const favoriteProducts = await api.loadFavoriteProducts()
    const productIds = favoriteProducts.map(product => product.productId)
    const products = []
    for (const id of productIds) {
      const product = await api.loadProductById(id)
      products.push(product)
    }
    this.products.push(...products)
    await shop.updateCurrencyUSD.call(this)
    shop.convertPrice.call(this)
    this.calcCounter()
  },

  removeProductById(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
    api.deleteFavoriteProductId(id)
  },
}

