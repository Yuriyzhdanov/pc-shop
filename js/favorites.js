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
    const products = await loadFavoriteProducts()
    this.products.push(...products)
    await this.updateCurrencyUSD()
    this.convertPrice()
    this.calcCounter()
    console.log(this.products);
    
  },

  removeProductById(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
    deleteFavoriteProductId(id)
  },
}
async function runFavoritesProd() {
  const res = await favorites.updateProducts()
  console.log(res)

  return res
}
runFavoritesProd()
