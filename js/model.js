const model = {
  products: [],
  filteredProducts: [],
  checkedFilters: [],
  filter: {},
  currencyUSD: 0,
  maxPrice: 0,
  minPrice: 0,
  favorites: [],
  recomendedProducts: [],
  reviews: [],
  paginatedProducts: [],
  countProducts: 0,
  countPages: 0,
  perCountPages: 10,
  currentPage: 0, 
  searchResult: [],
  addToFavorites(productId) {
    this.favorites = this.products.filter(product => product.id === productId)
  },
  // addProdToReviews(productId){
  //   const reviews = await loadReviews(productId);
  //   this.reviews.push(...reviews);
  // },
  calcCountPages() {
    this.countPages = Math.trunc(this.filteredProducts.length / this.perCountPages)
  },

  addToRecomendProd() {
    this.recomendedProducts = this.products
  },

  calcMaxMinPrice() {
    const prices = this.filteredProducts.map(product => product.convertedPrice)
    this.maxPrice = Math.ceil(Math.max(...prices))
    this.minPrice = Math.floor(Math.min(...prices))
  },

  async convertPrice() {
    const ccy = await loadCurrency()
    this.products.forEach(
      product => (product.convertedPrice = product.price * ccy)
    )
  },

  async addProducts() {
    this.products = await loadComputers()
    await this.convertPrice()
    this.filtrateProducts()
    this.createFilter()
    this.addToRecomendProd()
    this.switchPage(0)
  },

  createCheckedFilters(filterDataIds) {
    this.checkedFilters = []
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

  replaceSpecs(options) {
    if (!this.filter['Процессор']['cores']) {
      this.filter['Процессор']['cores'] = []
    }
    if (options['frequency'].includes('*')) {
      options['frequency'] = options['frequency'].replace(/\s/g, '')
      options['frequency'] = options['frequency'].replace(/\?/g, '')
      ;``
      options['frequency'] =
        options['frequency'].split('*')[1].replace('Ghz', '').trim() + 'Ghz'
    }
  },

  createFilter() {
    const specs = this.products.map(product => product.specs)
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

  filtrateProducts(priceFrom, priceTo) {
    this.filtrateProductsBySpecs()
    this.calcMaxMinPrice()
    this.filtrateProductsByPrice(priceFrom, priceTo)
    this.switchPage(0)
  },

  filtrateProductsBySpecs() {
    this.filteredProducts = this.products.filter(product => {
      let matchedCount = 0
      this.checkedFilters.forEach(filter => {
        let { category, key, values } = filter
        values.forEach(value => {
          matchedCount += product.specs[category]?.[key] === value
        })
      })
      return matchedCount === this.checkedFilters.length
    })
  },

  filtrateProductsByPrice(priceFrom = this.minPrice, priceTo = this.maxPrice) {
    this.filteredProducts = this.filteredProducts.filter(
      product =>
        priceFrom <= product.convertedPrice && product.convertedPrice <= priceTo
    )
  },
  getProductById(id) {
    return this.products.find(prod => prod.id === id)
  },
  sortCatalog(type) {
    switch (type) {
      case 'byPriceASC':
        this.filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'byPriceDESC':
        this.filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'byCaptionASC':
        this.filteredProducts.sort((a, b) => {
          return a.caption.localeCompare(b.caption, undefined, {
            sensitivity: 'accent',
          })
        })
        break
      case 'byCaptionDESC':
        this.filteredProducts.sort((a, b) => {
          return b.caption.localeCompare(a.caption, undefined, {
            sensitivity: 'accent',
          })
        })
        break
      default:
        break
    }
  },
  switchPage(pageNum) {
    this.calcCountPages()
    this.currentPage = pageNum
    const startFrom = this.currentPage * this.perCountPages
    const endTo = startFrom + this.perCountPages
    this.paginatedProducts = this.filteredProducts.slice(
      startFrom, endTo
    )
  },
  search(query){
      const searchResult = this.products.filter(prod => {
      const productValues = Object.values(prod);
      for (const val of productValues) {
        if(typeof val === 'string' && val.includes(query)){
          return true;
        }
      }
      return false
    })
    return searchResult.id
  }
}

