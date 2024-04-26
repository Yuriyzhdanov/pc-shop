function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  renderFilterRangeFrom(priceFrom, model.minPrice, model.maxPrice)
  renderFilterRangeTo(priceTo, model.minPrice, model.maxPrice)
  handlerUpdatePriceFrom(priceFrom)
  handlerUpdatePriceTo(priceTo)
  model.priceFilteredProducts(priceFrom, priceTo)
  model.filtrateProducts()
  model.switchPageProducts(0)
  model.sortingProducts('byPriceASC', model.filteredProducts)
  renderSwitchPage(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}

function handlerUpdatePriceFrom(price) {
  model.priceFrom = +price
}

function handlerUpdatePriceTo(price) {
  model.priceTo = +price
}

function handleSort(sortType) {
  model.sortingProducts(sortType)
  model.switchPageProducts(0)
  renderSwitchPage(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}

async function handleLoadPageCatalog() {
  await model.addProducts()
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
  model.switchPageProducts(0)
  renderSwitchPage(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}

async function handleLoadPageProduct(id) {
  await model.addProducts()
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  const recomendation = model.recomendedProducts
  for (let i = 0; i < 4; i++) {
    const randomIdx = Math.floor(Math.random() * recomendation.length)
    const randomProd = recomendation[randomIdx]
    renderRecomendProd(randomProd)
  }
}

function handlePageClick(e) {
  const pageNum = +e.target.textContent
  const pages = e.target.parentNode.querySelectorAll('.page')
  model.switchPageProducts(pageNum)
  e.preventDefault()
  pages.forEach(page => page.classList.remove('active'))
  e.target.classList.add('active')
  renderContainerProducts(model.paginatedProducts)
}

const queryInput = document.querySelector('#query')
function oninputQueryInput(e) {
  // const query = e.target.value.trim().toLowerCase();
  const query = e.target.value
  query.innerHTML = ''
  console.log(query)
  model.searchProducts(query)
  renderContainerProducts(model.filteredProducts)
}

// queryInput.oninput = oninputQueryInput

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
