const sortSelect = document.querySelector('.sort')
const productCard = document.querySelector('.wrap-product')
const searchBtn = document.querySelector('.search-btn')
const queryInput = document.querySelector('#query')

document.addEventListener('DOMContentLoaded', onLoadPage)

function onChangeSelectSort(e) {
  handleSort(e.target.value)
}

function onClickButtonFilter() {
  const checkboxes = document.querySelectorAll(
    '.wrap-checkbox input[type="checkbox"]:checked'
  )
  const elInputFrom = document.querySelector('#price_from')
  const elInputTo = document.querySelector('#price_to')
  const rangeFrom = elInputFrom.value
  const rangeTo = elInputTo.value
  const filterDataIds = Array.from(checkboxes).map(checkbox => checkbox.id)
  handleFiltrate(filterDataIds, +rangeFrom, +rangeTo)
}

function onLoadPage() {
  const pageName = getPageName(location.pathname)
  if (pageName === 'catalog') {
    handleLoadPageCatalog()
    sortSelect.addEventListener('change', onChangeSelectSort)
    document
      .querySelector('button.filter')
      .addEventListener('click', onClickButtonFilter)
  }
  if (pageName === 'product') {
    const id = new URLSearchParams(location.search).get('id')
    if (id) {
      handleLoadPageProduct(id)
    }
  }
}

function renderContainerProducts(products) {
  const elContainerProduct = document.querySelector('.container-products')
  elContainerProduct.innerHTML = ''
  products.forEach(product => {
    const elTile = generateProduct(product)
    elContainerProduct.appendChild(elTile)
  })
}

function renderWrapFilter(modelFilter) {
  const elWrapFilter = document.querySelector('.wrap-filter')
  elWrapFilter.innerHTML = ''
  for (const key in modelFilter) {
    const elProp = generateFilterProp(key)
    elWrapFilter.appendChild(elProp)
    for (const item of modelFilter[key]) {
      const elCheckbox = generateFilterCheckbox(key, item)
      elProp.appendChild(elCheckbox)
    }
  }
}

function renderDataList(captions) {
  const elSearchContainer = document.querySelector('#searchContainer')
  const elDataList = generateDataList(captions)
  elSearchContainer.appendChild(elDataList)
}

function renderProductSidebar(product) {
  const elLeft = document.querySelector('#left')
  const elSlider = generateProductSidebar(product)
  elLeft.appendChild(elSlider)
}

function renderProductInfo(product) {
  const productInfo = document.querySelector('.product-info')
  const wrapInfo = generateProductInfo(product)
  productInfo.appendChild(wrapInfo)
}

function renderRecomendProd(product) {
  const containerPave = document.querySelector('.container-pave')
  const elPave = generateRecomendProd(product)
  containerPave.appendChild(elPave)
}

function renderSimilarProd(product) {
  const containerPave = document.querySelector('.container-pave')
  const elPave = generateSimilarProd(product)
  containerPave.appendChild(elPave)
}

function onInputRangeFrom(e) {
  const rangeFrom = e.target.value
  renderLabelFrom(rangeFrom)
  checkingRangeTo(rangeFrom)
  handlerUpdatePriceFrom(rangeFrom)
}

function onInputRangeTo(e) {
  const rangeTo = e.target.value
  renderLabelTo(rangeTo)
  checkingRangeFrom(rangeTo)
  handlerUpdatePriceTo(rangeTo)
}

function renderLabelFrom(val) {
  const labelFrom = document.querySelector('label[for="price_from"] span')
  labelFrom.textContent = +val
}

function renderLabelTo(val) {
  const labelTo = document.querySelector('label[for="price_to"] span')
  labelTo.textContent = +val
}

function renderFilterRangeFrom(val, min, max) {
  const elPriceFrom = document.querySelector('#price_from')
  elPriceFrom.min = min
  elPriceFrom.max = max
  elPriceFrom.value = +val
  elPriceFrom.oninput = onInputRangeFrom
}

function renderFilterRangeTo(val, min, max) {
  const elPriceTo = document.querySelector('#price_to')
  elPriceTo.min = min
  elPriceTo.max = max
  elPriceTo.value = +val
  elPriceTo.oninput = onInputRangeTo
}

function checkingRangeTo(rangeFrom) {
  const elInputTo = document.querySelector('#price_to')
  if (+elInputTo.value <= +rangeFrom) {
    elInputTo.value = rangeFrom
  }
}
function checkingRangeFrom(rangeTo) {
  const elInputFrom = document.querySelector('#price_from')
  if (+elInputFrom.value >= +rangeTo) {
    elInputFrom.value = rangeTo
  }
}

function renderSwitchPage(pagesCount) {
  const elPaginatorContainer = document.querySelector('.container-paginator')
  elPaginatorContainer.innerHTML = ''
  const elPaginator = generateSwitchPage(pagesCount)
  elPaginatorContainer.appendChild(elPaginator)
  const pages = document.querySelectorAll('.page')
  pages.forEach(page => {
    page.addEventListener('click', handlePageClick)
  })
  pages[0].classList.add('active')
}
