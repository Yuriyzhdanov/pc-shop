function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProductsBySpecs()
  model.priceFilteredProducts(priceFrom, priceTo)
  model.sortingProducts('byPriceASC')
  model.switchPageProducts(0)
  handlerUpdatePriceFrom(priceFrom)
  handlerUpdatePriceTo(priceTo)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
  renderFilterRangeFrom(priceFrom, model.minPrice, model.maxPrice)
  renderFilterRangeTo(priceTo, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
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
  renderContainerProducts(model.paginatedProducts)
}

function onClickSearchHandler() {
  const queryInput = document.querySelector('#query')
  model.searchProducts(queryInput.value)
  model.filtrateProductsBySpecs()
  model.priceFilteredProducts()
  model.sortingProducts('byPriceASC')
  model.switchPageProducts(0)
  renderLabelFrom(model.minPrice)
  renderLabelTo(model.maxPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
  renderSwitchPage(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}
searchBtn.onclick = onClickSearchHandler

function oninputSearchBtnCloseHandler(e) {
  if (e.target.value == '') {
    model.searchProducts(queryInput.value)
    model.filtrateProductsBySpecs()
    model.priceFilteredProducts()
    model.sortingProducts('byPriceASC')
    model.switchPageProducts(0)
    renderWrapFilter(model.filter)
    renderSwitchPage(model.countPages)
    renderContainerProducts(model.paginatedProducts)
  }
}
queryInput.oninput = oninputSearchBtnCloseHandler

async function handleLoadPageCatalog() {
  await model.looksLikeHandleLoadPage()
  renderLabelTo(model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
  renderSwitchPage(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}

// async function handleLoadPageProduct(id) {
//   await model.looksLikeHandleLoadPage()
//   const product = model.getProductById(id)
//   renderProductInfo(product)
//   renderProductSidebar(product)
//   const recomendation = model.recomendedProducts
//   for (let i = 0; i < 4; i++) {
//     const randomIdx = Math.floor(Math.random() * recomendation.length)
//     const randomProd = recomendation[randomIdx]
//     renderRecomendProd(randomProd)
//   }
// }

function handlePageClick(e) {
  const pageNum = +e.target.textContent
  const pages = e.target.parentNode.querySelectorAll('.page')
  model.switchPageProducts(pageNum)
  e.preventDefault()
  pages.forEach(page => page.classList.remove('active'))
  e.target.classList.add('active')
  renderContainerProducts(model.paginatedProducts)
}

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
