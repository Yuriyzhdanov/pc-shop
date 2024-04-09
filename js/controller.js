function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProducts(+priceFrom, +priceTo)
  renderContainerProducts(model.filteredProducts)
  renderFilterRangeFrom(priceFrom, model.minPrice, model.maxPrice)
  renderFilterRangeTo(priceTo, model.minPrice, model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
}

function handleSort(sortType) {
  model.sortCatalog(sortType)
  renderContainerProducts(model.filteredProducts)
}

async function handleLoadPageCatalog() {
  await model.addProducts()
  renderContainerProducts(model.filteredProducts)
  renderWrapFilter(model.filter, model.minPrice, model.maxPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
}

async function handleLoadPageProduct(id) {
  console.log('handleLoadPageProduct');
  
  // model.addProducts(async products => {
  //   const product = products.find(prod => prod.id === id)
  //   renderProductInfo(product)
  //   renderProductSidebar(product)
  //   renderRecomendProd(products[1])
  //   renderRecomendProd(products[2])
  //   renderRecomendProd(products[3])
  //   renderRecomendProd(products[4])
  // })
  await model.addProducts()
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  renderRecomendProd(model.products[1])
  renderRecomendProd(model.products[1])
  renderRecomendProd(model.products[1])

}

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
