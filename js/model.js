const model = {
  filter: {},

  products: [],
  searchedProducts: [],
  filteredProducts: [],
  pricedProducts: [],
  sortedProducts: [],
  paginatedProducts: [],

  searchQuery: '',
  checkedFilters: [],
  priceFrom: 0,
  priceTo: 0,
  currentPage: 0,

  minPrice: 0,
  maxPrice: 0,
  currencyUSD: 0,

  countPages: 0,
  countProducts: 0,
  perCountPages: 10,

  recomendedProducts: [],

  async looksLikeHandleLoadPage() {
    await this.updateProducts()
    await this.updateCurrencyUSD()

    this.convertPrice()

    this.searchProducts()
    this.filtrateProductsBySpecs()
    this.priceFilteredProducts()
    console.log('pricing');
    
    this.sortingProducts('byPriceASC')
    console.log('sorting');
    
    this.switchPageProducts(0)

    this.addToRecomendProd()
  },

  searchProducts(_ = '', query = _.trim()) {
    this.searchedProducts = this.products.filter(product =>
      Object.values(product).some(text => isContainsIgnoreCase(text, query))
    )
    this.clearFilter()
    this.createFilter()
  },

  filtrateProductsBySpecs() {
    this.filteredProducts = this.searchedProducts.filter(product => {
      let matchedCount = 0
      this.checkedFilters.forEach(filter => {
        let { category, key, values } = filter
        values.forEach(value => {
          matchedCount += product.specs[category]?.[key] === value
        })
      })
      return matchedCount === this.checkedFilters.length
    })
    this.calcMinMaxPrice()
    this.calcFromToPrice()
  },

  priceFilteredProducts(priceFrom, priceTo) {
    if (typeof priceFrom === 'undefined') {
      priceFrom = this.minPrice
    }
    if (typeof priceTo === 'undefined') {
      priceTo = this.maxPrice
    }
    this.pricedProducts = this.filteredProducts.filter(
      product =>
        priceFrom <= product.convertedPrice && product.convertedPrice <= priceTo
    )
  },

  sortingProducts(type) {
    this.sortedProducts = this.pricedProducts.slice()
    switch (type) {
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

  switchPageProducts(pageNum) {
    this.calcCountPages()
    this.currentPage = pageNum
    const startFrom = this.currentPage * this.perCountPages
    const endTo = startFrom + this.perCountPages
    this.paginatedProducts = this.sortedProducts.slice(startFrom, endTo)
  },

  createFilter() {
    const specs = this.searchedProducts.map(product => product.specs)
    for (const spec of specs) {
      for (const key in spec) {
        const options = spec[key]
        for (const option in options) {
          if (key === 'Процессор' && option === 'frequency') {
            this.replaceSpecs(options)
          }
          const value = options[option]
          if (!this.filter[key]) {
            this.filter[key] = {}
          }
          if (!this.filter[key][option]) {
            this.filter[key][option] = []
          }
          if (!this.filter[key][option].includes(value)) {
            this.filter[key][option].push(value)
          }
        }
      }
    }
  },

  createCheckedFilters(filterDataIds) {
    filterDataIds.forEach(filterDataId => {
      const idParts = filterDataId.split('-')
      const category = idParts[0]
      const key = idParts[1]
      const value = idParts[2]
      const isExistFilter = this.checkedFilters.find(
        filter => filter.category === category && filter.key === key
      )
      if (isExistFilter) {
        isExistFilter.values.push(value)
      } else {
        this.checkedFilters.push({ category, key, values: [value] })
      }
    })
  },

  clearCheckedFilter() {
    this.checkedFilters = []
  },

  clearFilter() {
    this.filter = {}
    this.clearCheckedFilter()
  },

  async updateProducts() {
    this.products = await loadComputers()
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

  addToRecomendProd() {
    this.recomendedProducts = this.products
  },

  replaceSpecs(options) {
    if (!this.filter['Процессор']['cores']) {
      this.filter['Процессор']['cores'] = []
    }
    if (options['frequency'].includes('*')) {
      options['frequency'] = options['frequency'].replace(/\s/g, '')
      options['frequency'] = options['frequency'].replace(/\?/g, '')
      options['frequency'] =
        options['frequency'].split('*')[1].replace('Ghz', '').trim() + 'Ghz'
    }
  },

  getProductById(id) {
    return this.products.find(prod => prod.id === id)
  },
}
