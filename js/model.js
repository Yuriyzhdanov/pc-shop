const model = {
  products: [],
  filteredProducts: [],
  checkedFilters: [],
  filter: {},
  currencyUSD: 0,
  maxPrice: 0,
  minPrice: 0,

  calcMaxMinPrice() {
    const prices = this.products.map(product => product.convertedPrice)
    this.maxPrice = Math.floor(Math.max(...prices))
    this.minPrice = Math.ceil(Math.min(...prices))
  },

  async convertPrice() {
    const ccy = await loadCurrency()
    this.products.forEach(
      product => (product.convertedPrice = product.price * ccy)
    )
  },

  async addProducts(callback) {
    const computers = await loadComputers()
    this.products = computers
    await this.convertPrice()
    this.calcMaxMinPrice()
    this.filteredProducts = computers
    this.createFilter()
    callback(computers)
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

  filtrateProducts(priceFrom = this.minPrice, priceTo = this.maxPrice) {
    this.filtrateProductsBySpecs()
    this.filtrateProductsByPrice(priceFrom, priceTo)
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

  filtrateProductsByPrice(priceFrom, priceTo) {
    this.filteredProducts = this.filteredProducts.filter(
      product =>
        priceFrom < product.convertedPrice && product.convertedPrice < priceTo
    )
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
}
