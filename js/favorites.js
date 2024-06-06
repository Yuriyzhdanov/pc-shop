const favorites = {
  products: [],
  counter: 0,
  async addProductById(id) {
    const product = await loadProductById(id)
    this.products.push(product)
    this.calcCounter()
  },
  calcCounter() {
    this.counter = this.products.length
  },
  removeProductById(id) {
    this.products = this.products.toSpliced(1, id)
  },
  
}
ъё