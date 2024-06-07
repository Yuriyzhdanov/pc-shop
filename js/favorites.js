const favorites = {
  products: [],
  favoriteProducts: [],
  counter: 0,
  ids: [],

  async updateProducts() {
    this.products = await loadProducts()
  },
  async updateCurrencyUSD() {
    this.currencyUSD = await loadCurrency()
  },
  convertPrice() {
    this.products.forEach(
      product => (product.convertedPrice = product.price * this.currencyUSD)
    )
  },
  async loadFavoriteProducts() {
    await this.updateProducts()
    await this.updateCurrencyUSD()
    this.convertPrice()
    this.ids = await loadFavoriteProductsById()
    this.favoriteProducts = this.products.filter(product =>
      this.ids.includes(product.id)
    )
  },
  async updateFavoritesProducts(productId) {
    console.log(productId);
    
    await updateFavoritesProductsById(productId)
    console.log(this.favoriteProducts)
  },
  calcCounter() {
    this.counter = this.products.length
  },
  removeProductById(id) {
    this.products = this.products.toSpliced(id, 1)
  },
}
async function runFavoritesProd() {
  const res = await favorites.loadFavoriteProducts()
  return res
}
runFavoritesProd()
