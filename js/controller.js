const sortSelect = document.querySelector('.sort')
const productCard = document.querySelector('.wrap-product')

function handleFiltrate(filterDataIds, priceFrom, priceTo) {
  model.createCheckedFilters(filterDataIds)
  model.filtrateProducts(+priceFrom, +priceTo)
  renderContainerProducts(model.filteredProducts)
}

function handleLoadWindow() {
  model.addProducts(products => {
    console.log(products)

    renderContainerProducts(products)
    renderWrapFilter(model.filter)
  })
}

sortSelect.addEventListener('change', function () {
  const selectedValue = parseInt(this.value)
  switch (selectedValue) {
    case 1:
      model.sortByPrice()
      break
    case 2:
      model.sortByPriceReverse() 
      break
    case 3:
      model.sortByCaption()
      break
    case 4:
      model.sortByCaptionReverse()
      break
    case 5:
      model.sortByNew()
      break
    default:
      break
  }
  renderContainerProducts(model.filteredProducts)
})

// function onClickProductCardHandler(e) {
//   const productId = e.target.closest('.wrap-product').dataset.productId;
//   console.log(productId);
// }
