const favorites = {
  products: [],
  counter: 0,
  currencyUSD: 1,

  calcCounter() {
    this.counter = this.products.length
  },

  async updateCurrencyUSD() {
    this.currencyUSD = await loadCurrency()
  },

  convertPrice() {
    this.products.forEach(
      product => (product.convertedPrice = product.price * this.currencyUSD)
    )
  },

  async addProductById(id) {
    const product = await loadProductById(id)
    this.products.push(product)
    await this.updateCurrencyUSD()
    this.calcCounter()
    postFavoriteProductId(id)
  },

  async updateProducts() {
    const favoriteProducts = await loadFavoriteProducts()
    const productIds = favoriteProducts.map(product => product.productId)
    const products = []
    for (const id of productIds) {
      const product = await loadProductById(id)
      products.push(product)
    }
    this.products.push(...products)
    await this.updateCurrencyUSD()
    this.convertPrice()
    this.calcCounter()
    console.log(productIds)
  },

  removeProductById(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
    deleteFavoriteProductId(id)
  },
}

