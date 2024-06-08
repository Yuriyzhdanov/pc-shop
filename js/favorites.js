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
    await updateFavoritesProductsById(productId)
    await this.loadFavoriteProducts()
    console.log(this.favoriteProducts)
  },
  calcCounter() {
    this.counter = this.products.length
  },
  async removeProductById(id) {
    await deleteFavoritesById(id)
    this.favoriteProducts= this.favoriteProducts.filter(product => product.id !== id)
    console.log(this.favoriteProducts)
  },
}
async function runFavoritesProd() {
  const res = await favorites.loadFavoriteProducts()
  return res
}
runFavoritesProd()
