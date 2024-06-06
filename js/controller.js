function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedAttrs(filterDataIds)
  model.setPriceFromTo(priceFrom, priceTo)

  model.vortex()

  renderContainerPagination(model.countPages)
  renderContainerProducts(model.paginatedProducts)

  renderFilterRangeFrom(priceFrom, model.minPrice, model.maxPrice)
  renderFilterRangeTo(priceTo, model.minPrice, model.maxPrice)
  renderLabelFrom(priceFrom)
  renderLabelTo(priceTo)

  handlerUpdatePriceFrom(priceFrom)
  handlerUpdatePriceTo(priceTo)
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

function handleDisplayingProductsOnPage(productsOnPage) {
  model.updatePerCountPages(+productsOnPage)
  model.paginateProducts(0)
  renderContainerPagination(model.countPages)
  renderContainerProducts(model.paginatedProducts)
}

function onClickSearchHandler() {
  const queryInput = document.querySelector('#query')
  model.searchQuery = queryInput.value
  model.vortex()
  renderLabelFrom(model.priceFrom)
  renderLabelTo(model.priceTo)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
  renderContainerPagination(model.countPages)
  renderContainerProducts(model.paginatedProducts)
  renderDataList(model.productCaptions)
}
searchBtn.onclick = onClickSearchHandler

function oninputSearchBtnCloseHandler(e) {
  if (e.target.value === '') {
    onClickSearchHandler()
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
  await model.updateSimilarProd(id)
  await model.updateRecomendProd()
  model.updateProductsCaptions()
  model.searchProducts(model.searchQuery)
  const product = model.getProductById(id)
  renderProductInfo(product)
  renderProductSidebar(product)
  const recommendation = model.recommendedProducts.slice(0, 4)
  renderRecomendProd(recommendation)
  const similarProducts = model.similarProducts.slice(0, 4)
  renderSimilarProd(similarProducts)
}

function handleLoadPageFavotites() {
  renderContainerProducts(favorites.products)
  
}

function handlePageClick(pageNum) {
  model.currentPage = +pageNum
  model.paginateProducts()
  renderContainerPagination(model.countPages, model.currentPage)
  renderContainerProducts(model.paginatedProducts)
}

function onClickClearFilter() {
  model.clearFilter()
  model.createFilter()
  model.vortex()
  renderWrapFilter(model.filter)
  renderContainerProducts(model.paginatedProducts)
  renderLabelTo(model.maxPrice)
  renderLabelFrom(model.minPrice)
  renderFilterRangeFrom(model.minPrice, model.minPrice, model.maxPrice)
  renderFilterRangeTo(model.maxPrice, model.minPrice, model.maxPrice)
  renderWrapFilter(model.filter)
  renderContainerPagination(model.countPages)
}
clearFilterBtn.onclick = onClickClearFilter

// function handleLoadPageFavotites(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId
//   console.log(productId)

//   // model.addToFavorites(productId)
// }
