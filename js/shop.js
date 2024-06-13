const shop = {
  async updateProducts() {
    this.products = await api.loadProducts();
  },
  async updateCurrencyUSD() {
    this.currencyUSD = await api.loadCurrency();
  },
  convertPrice() {
    this.products.forEach(
      product => (product.convertedPrice = product.price * this.currencyUSD)
    )
  },
}