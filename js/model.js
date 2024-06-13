const model = {
  filter: {},

  products: [],
  searchedProducts: [],
  filteredProducts: [],
  rangedPriceProducts: [],
  sortedProducts: [],
  paginatedProducts: [],
  searchQuery: '',
  checkedAttrs: [],
  priceFrom: 0,
  priceTo: Infinity,
  sortingType: 'byPriceASC',
  currentPage: 0,

  minPrice: 0,
  maxPrice: 0,
  currencyUSD: 0,

  countPages: 0,
  countProducts: 0,
  perCountPages: 10,

  productCaptions: [],
  similarProducts: [],
  userId: -1,

  async looksLikeHandleLoadCatalog() {
    await this.updateUserId()
    await shop.updateProducts.call(this)
    await shop.updateCurrencyUSD.call(this)
    shop.convertPrice.call(this)
    this.updateProductsCaptions()
    this.vortex()
    this.clearFilter()
    this.createFilter()
  },

  vortex() {
    this.searchProducts(this.searchQuery)
    this.filtrateProducts(this.checkedAttrs)
    this.calcMinMaxPrice()
    this.rangePriceProducts(this.priceFrom, this.priceTo)
    this.updatePerCountPages(this.perCountPages)
    this.sortingProducts(this.sortingType)
    this.paginateProducts(this.currentPage)
  },

  searchProducts(_ = '', searchQuery = _.trim()) {
    if (searchQuery) {
      this.searchQuery = searchQuery
    }
    this.searchedProducts = this.products.filter(product =>
      Object.values(product).some(text =>
        isContainsIgnoreCase(text, this.searchQuery)
      )
    )
  },

  filtrateProducts(checkedAttrs) {
    if (checkedAttrs) {
      this.checkedAttrs = checkedAttrs
    }
    this.filteredProducts = this.searchedProducts.filter(product => {
      let matchedCount = 0
      this.checkedAttrs.forEach(filter => {
        const { key, values } = filter
        if (values.includes(product.attributes[key])) {
          matchedCount++
        }
      })
      return matchedCount === this.checkedAttrs.length
    })
    this.calcMinMaxPrice()
    this.calcFromToPrice()
  },

  rangePriceProducts(priceFrom, priceTo) {
    priceFrom ?? priceTo ?? this.calcFromToPrice()
    this.rangedPriceProducts = this.filteredProducts.filter(
      product =>
        this.priceFrom <= product.convertedPrice &&
        product.convertedPrice <= this.priceTo
    )
  },

  sortingProducts(sortingType) {
    if (sortingType) {
      this.sortingType = sortingType
    }
    this.sortedProducts = this.rangedPriceProducts.slice()
    switch (this.sortingType) {
      case 'byPriceASC':
        this.sortedProducts.sort((a, b) => a.price - b.price)
        break
      case 'byPriceDESC':
        this.sortedProducts.sort((a, b) => b.price - a.price)
        break
      case 'byCaptionASC':
        this.sortedProducts.sort((a, b) => {
          return a.caption.localeCompare(b.caption, undefined, {
            sensitivity: 'accent',
          })
        })
        break
      case 'byCaptionDESC':
        this.sortedProducts.sort((a, b) => {
          return b.caption.localeCompare(a.caption, undefined, {
            sensitivity: 'accent',
          })
        })
        break
      default:
        break
    }
  },

  paginateProducts(currentPage) {
    if (currentPage) {
      this.currentPage = currentPage
    }
    const startFrom = this.currentPage * this.perCountPages
    const endTo = startFrom + this.perCountPages
    this.paginatedProducts = this.sortedProducts.slice(startFrom, endTo)
  },

  createFilter() {
    const specs = this.searchedProducts.map(product => product.attributes)
    for (const spec of specs) {
      for (const key in spec) {
        const value = spec[key]
        if (!this.filter[key]) {
          this.filter[key] = []
        }
        if (!this.filter[key].includes(value)) {
          this.filter[key].push(value)
        }
      }
    }
  },

  createCheckedAttrs(filterDataIds) {
    this.clearCheckedAttrs()
    filterDataIds.forEach(filterDataId => {
      const idParts = filterDataId.split('-')
      const key = idParts[0]
      const value = idParts[1]
      const isExistFilter = this.checkedAttrs.find(filter => filter.key === key)
      if (isExistFilter) {
        isExistFilter.values.push(value)
      } else {
        this.checkedAttrs.push({ key, values: [value] })
      }
    })
  },

  clearCheckedAttrs() {
    this.checkedAttrs = []
  },

  clearFilter() {
    this.filter = {}
    this.clearCheckedAttrs()
  },

  // async updateProducts() {
  //   this.products = await api.loadProducts()
  // },

  async updateCurrencyUSD() {
    this.currencyUSD = await api.loadCurrency()
  },

  // convertPrice() {
  //   this.products.forEach(
  //     product => (product.convertedPrice = product.price * this.currencyUSD)
  //   )
  // },

  calcMinMaxPrice() {
    const prices = this.filteredProducts.map(product => product.convertedPrice)
    this.minPrice = Math.floor(prices.length ? Math.min(...prices) : 2)
    this.maxPrice = Math.ceil(prices.length ? Math.max(...prices) : 3)
  },

  calcFromToPrice() {
    this.priceFrom = this.minPrice
    this.priceTo = this.maxPrice
  },

  setPriceFromTo(priceFrom, priceTo) {
    this.priceFrom = priceFrom
    this.priceTo = priceTo
  },

  calcCountPages() {
    this.countPages = Math.trunc(
      this.rangedPriceProducts.length / this.perCountPages
    )
  },

  async updateUserId() {
    this.userId = await api.loadAuth()
  },

  async updateRecomendProd() {
    await this.updateUserId()
    const recommendedIds = await api.loadRecommendedProductsById(this.userId)
    this.recommendedProducts = recommendedIds.map(id =>
      this.products.find(p => p.id === id)
    )
  },

  async updateSimilarProd(id) {
    await shop.updateProducts.call(this)
    await shop.updateCurrencyUSD.call(this)
    shop.convertPrice.call(this)
    const relatedProductIds = await api.loadSimilarProductsById(id)
    this.similarProducts = this.products.filter(product =>
      relatedProductIds.includes(product.id)
    )
  },

  getProductById(id) {
    const res = this.products.find(prod => prod.id === id)
    return res
  },

  updateProductsCaptions() {
    this.productCaptions = this.products.map(product => product.caption)
  },

  updatePerCountPages(productsOnPage) {
    this.perCountPages = productsOnPage
    this.calcCountPages()
  },
}
