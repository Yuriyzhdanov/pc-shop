function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProducts(+priceFrom, +priceTo)
  renderContainerProducts(model.filteredProducts)
  renderContai
}

function handleSort(sortType) {
  model.sortCatalog(sortType)
  renderContainerProducts(model.filteredProducts)
}

async function handleLoadPageCatalog() {
  await model.addProducts()
  renderContainerProducts(model.filteredProducts)
  renderWrapFilter(model.filter, model.minPrice, model.maxPrice)
}

function handleLoadPageProduct(id) {
  model.addProducts(products => {
    const product = products.find(prod => prod.id === id)
    renderProductInfo(product)
    renderProductSidebar(product)
    renderRecomendProd(products[1])
    renderRecomendProd(products[2])
    renderRecomendProd(products[3])
    renderRecomendProd(products[4])
  })
}

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
