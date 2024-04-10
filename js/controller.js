function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProducts(+priceFrom, +priceTo)
  renderFilterRangeFrom(priceFrom, model.minPrice, model.maxPrice)
  renderFilterRangeTo(priceTo, model.minPrice, model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
  renderContainerProducts(model.filteredProducts) // не працюе
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
}

async function handleLoadPageProduct(id) {
  await model.addProducts()
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  renderRecomendProd(model.products[1])
  renderRecomendProd(model.products[1])
  renderRecomendProd(model.products[1])
}

// paginator handler
const pages = document.querySelectorAll('.page')
function handlePageClick(e) {
  e.preventDefault()
  pages.forEach(page => page.classList.remove('active'))
  e.target.classList.add('active')
  const pageNumber = +e.target.textContent
  console.log('work', pageNumber)
  model.paginator()
  renderContainerProducts(model.paginatedProducts)
}
pages.forEach(page => {
  page.addEventListener('click', handlePageClick)
})

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
