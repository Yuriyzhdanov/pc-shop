function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProducts(+priceFrom, +priceTo)
  renderFilterRangeFrom(priceFrom, model.minPrice, model.maxPrice)
  renderFilterRangeTo(priceTo, model.minPrice, model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
  renderContainerProducts(model.filteredProducts) // не працює
}

function handleSort(sortType) {
  model.sortCatalog(sortType)
  renderContainerProducts(model.filteredProducts)
}

async function handleLoadPageCatalog() {
  await model.addProducts()
  renderContainerProducts(model.paginatedProducts)
  renderWrapFilter(model.filter, model.minPrice, model.maxPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
  renderSwichPage(9)
  console.log('renderSwichPage(9)')
}

async function handleLoadPageProduct(id) {
  await model.addProducts()
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  // model.recomendedProducts.forEach(prod => {
  //   for (let i = 0; i < 4; i++) {
  //     renderRecomendProd(prod)
  //   }
  // })
 const recomendation = model.recomendedProducts 
  for(let i = 0; i < 4; i++){
    renderRecomendProd(recomendation[i])
  }
}

function handlePageClick(e) {
  const pageNum = +e.target.textContent
  const pages = e.target.parentNode.querySelectorAll('.page')
  e.preventDefault()
  pages.forEach(page => page.classList.remove('active'))
  e.target.classList.add('active')
  model.switchPage(pageNum)
  renderContainerProducts(model.paginatedProducts)
}

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
