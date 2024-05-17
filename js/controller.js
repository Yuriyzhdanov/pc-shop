function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedAttrs(filterDataIds)
  model.filtrateProducts()
  model.rangePriceProducts(priceFrom, priceTo)
  model.sortingProducts('byPriceASC')
  model.paginateProducts(0)
  handlerUpdatePriceFrom(priceFrom)
  handlerUpdatePriceTo(priceTo)
  renderLabelFrom(priceFrom)
  renderLabelTo(priceTo)
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
  model.paginateProducts(0)
  renderContainerProducts(model.paginatedProducts)
}

function onClickSearchHandler() {
  const queryInput = document.querySelector('#query')
  model.searchProducts(queryInput.value)
  model.filtrateProducts()
  model.rangePriceProducts()
  model.sortingProducts('byPriceASC')
  model.paginateProducts(0)
  renderLabelFrom(model.priceFrom)
  renderLabelTo(model.priceTo)
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
    model.filtrateProducts()
    model.rangePriceProducts()
    model.sortingProducts('byPriceASC')
    model.paginateProducts(0)
    renderWrapFilter(model.filter)
    renderSwitchPage(model.countPages)
    renderContainerProducts(model.paginatedProducts)
    renderDataList(model.productCaptions)
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

async function handleLoadPageProduct(id) {
  id = parseInt(id)
  await model.looksLikeHandleLoadPage()
  await model.updateSimilarProd(id)
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  const recommendation = model.recommendedProducts.slice(0, 4)
  renderRecomendProd(recommendation)
  const similarProducts = model.similarProducts.slice(0, 4)
  renderSimilarProd(similarProducts)
}

function handlePageClick(e) {
  const pageNum = +e.target.textContent
  const pages = e.target.parentNode.querySelectorAll('.page')
  model.paginateProducts(pageNum)
  // e.preventDefault()
  // location.hash = '#header'
  pages.forEach(page => page.classList.remove('active'))
  e.target.classList.add('active')
  renderContainerProducts(model.paginatedProducts)
}

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
