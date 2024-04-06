const sortSelect = document.querySelector('.sort')
const productCard = document.querySelector('.wrap-product')

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
  const filterDataIds = Array.from(checkboxes).map(checkbox => checkbox.id)
  handleFiltrate(filterDataIds, elInputFrom.value, elInputTo.value)
}

// function onInputChangePriceFrom() {
//   const elPriceFrom = document.querySelector('#price_from')
//   const elPriceTo = document.querySelector('#price_to')

//   if (+elPriceTo.value < +elPriceFrom.value) {
//     elPriceTo.value = elPriceFrom.value
//   }
//   renderLabelPrice()
// }

// function onInputChangePriceTo() {
//   const elPriceFrom = document.querySelector('#price_from')
//   const elPriceTo = document.querySelector('#price_to')

//   if (+elPriceFrom.value > +elPriceTo.value) {
//     elPriceFrom.value = elPriceTo.value
//   }
//   renderLabelPrice()
// }

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
    if (!id) return
    handleLoadPageProduct(id)
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

function renderWrapFilter(modelFilter, minPrice, maxPrice) {
  const elWrapFilter = document.querySelector('.wrap-filter')
  // const elPrice = generateFilterPrice(minPrice, maxPrice)
  for (const key in modelFilter) {
    if (typeof modelFilter[key] === 'object') {
      const elProp = generateFilterProp(key)
      elWrapFilter.appendChild(elProp)
      for (const subKey in modelFilter[key]) {
        const elSubHeading = generateFilterSubHeading(subKey)
        for (const itemKey in modelFilter[key][subKey]) {
          const item = modelFilter[key][subKey][itemKey]
          const elCheckbox = generateFilterCheckbox(item, subKey, key)
          elSubHeading.appendChild(elCheckbox)
        }
        elProp.appendChild(elSubHeading)
      }
    }
  }
  // elWrapFilter.appendChild(elPrice)
}

// function renderLabelPrice() {
//   const elPriceFrom = document.querySelector('#price_from')
//   const elPriceTo = document.querySelector('#price_to')
//   const labelFrom = document.querySelector('label[for="price_from"] span')
//   const labelTo = document.querySelector('label[for="price_to"] span')
//   labelFrom.textContent = elPriceFrom.value
//   labelTo.textContent = elPriceTo.value
// }

function renderLabelTo() {
  const elPriceTo = document.querySelector('#price_to')
  const labelTo = document.querySelector('label[for="price_to"] span')
  labelTo.textContent = elPriceTo.value
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

// function onInputRangePrice(e) {
//   const input = e.target
//   const label = input.parentNode
//   const span = label.querySelector('span')
//   const spanValue = input.value
//   span.textContent = spanValue
// }

function renderFilterRangeFrom(val, min, max) {
  const elPriceFrom = document.querySelector('#price_from')
  elPriceFrom.value = val
  elPriceFrom.min = min
  elPriceFrom.max = max
  elPriceFrom.oninput = onInputRangeFrom
}

function renderFilterRangeTo(val, min, max) {
  const elPriceTo = document.querySelector('#price_to')
  elPriceTo.value = val
  elPriceTo.min = min
  elPriceTo.max = max
  elPriceTo.oninput = onInputRangeTo
}

function onInputRangeFrom(e) {
  const rangeFrom = e.target.value
  // console.log(rangeFrom);
  renderLabelFrom(rangeFrom)
}

function onInputRangeTo(e) {
  const rangeTo = e.target.value
  renderLabelFrom(rangeTo)
}

function renderLabelFrom(val) {
  const labelFrom = document.querySelector('label[for="price_from"] span')
  console.log(labelFrom);
  
  labelFrom.textContent = val
}
function renderLabelFrom(val) {
  const labelTo = document.querySelector('label[for="price_to"] span')
  labelTo.textContent = val
}
