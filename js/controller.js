function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProducts(+priceFrom, +priceTo)
  renderContainerProducts(model.filteredProducts)
}

function handleSort(sortType) {
  model.sortCatalog(sortType)
  renderContainerProducts(model.filteredProducts)
}
