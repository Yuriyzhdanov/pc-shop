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
  priceTo: 0,
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

  async looksLikeHandleLoadPage() {
    await this.updateUserId()
    await this.updateProducts()
    await this.updateCurrencyUSD()
    await this.updateRecomendProd()

    this.convertPrice()

    this.setProductsCaptionToDatalist()
    this.searchProducts()
    this.clearFilter()
    this.createFilter()
    this.filtrateProducts()
    this.rangePriceProducts()
    this.sortingProducts(this.sortingType)
    this.paginateProducts(this.currentPage)
    this.calcCountPages()
  },

  searchProducts(_ = '', query = _.trim()) {
    this.searchedProducts = this.products.filter(product =>
      Object.values(product).some(text => isContainsIgnoreCase(text, query))
    )
  },

  filtrateProducts() {
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

  paginateProducts(pageNum) {
    this.currentPage = pageNum
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

  async updateProducts() {
    const response = await loadComputers()
    if (response.success) {
      this.products = response.payload
    } else {
      console.error(response.message)
    }
  },

  async updateCurrencyUSD() {
    this.currencyUSD = await loadCurrency()
  },

  convertPrice() {
    this.products.forEach(
      product => (product.convertedPrice = product.price * this.currencyUSD)
    )
  },

  calcMinMaxPrice() {
    const prices = this.filteredProducts.map(product => product.convertedPrice)
    this.minPrice = Math.floor(prices.length ? Math.min(...prices) : 2)
    this.maxPrice = Math.ceil(prices.length ? Math.max(...prices) : 3)
  },

  calcFromToPrice() {
    this.priceFrom = this.minPrice
    this.priceTo = this.maxPrice
  },

  calcCountPages() {
    this.countPages = Math.trunc(
      this.sortedProducts.length / this.perCountPages
    )
  },

  async updateUserId() {
    this.userId = await loadAuth()
    console.log('this.userId :>> ', this.userId)
  },

  async updateRecomendProd() {
    const recommendedIds = await loadRecommendedProductsById(this.userId)

    this.recommendedProducts = recommendedIds.map(id =>
      this.products.find(p => p.id === id)
    )

    // this.recommendedProducts = this.products.filter(prod =>
    //   recommendedIds.includes(prod.id)
    // )
  },

  async updateSimilarProd(id) {
    const response = await loadSimilarProducts(id)
    const relatedProductIds = response.payload.map(
      product => product.relatedProductId
    )
    this.similarProducts = this.products.filter(product =>
      relatedProductIds.includes(product.id)
    )
  },

  getProductById(id) {
    return this.products.find(prod => prod.id === id)
  },

  setProductsCaptionToDatalist() {
    this.productCaptions = this.products.map(product => product.caption)
  },
}
