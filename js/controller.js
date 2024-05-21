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
  renderContainerPagination(model.countPages)
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
  renderContainerPagination(model.countPages)
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
  renderContainerPagination(model.countPages)
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
    renderContainerPagination(model.countPages)
    renderContainerProducts(model.paginatedProducts)
    renderDataList(model.productCaptions)
  }
}
queryInput.oninput = oninputSearchBtnCloseHandler

async function handleLoadPageCatalog() {
  await model.looksLikeHandleLoadCatalog()
  renderLabelTo(model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
  renderContainerPagination(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}

async function handleLoadPageProduct(id) {
  id = parseInt(id)
  // await model.looksLikeHandleLoadPage()
  await model.updateSimilarProd(id)
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  const recommendation = model.recommendedProducts.slice(0, 4)
  renderRecomendProd(recommendation)
  const similarProducts = model.similarProducts.slice(0, 4)
  renderSimilarProd(similarProducts)
}

function handlePageClick(pageNum) {
  model.currentPage = +pageNum
  model.paginateProducts()
  renderContainerPagination(model.countPages, model.currentPage)
  renderContainerProducts(model.paginatedProducts)
}

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   model.addToFavorites(productId)
// }
