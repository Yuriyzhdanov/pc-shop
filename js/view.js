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

function onLoadPage() {
  const pageName = getPageName()
  if (pageName === 'catalog') {
    sortSelect.addEventListener('change', onChangeSelectSort)
    model.addProducts(products => {
      renderContainerProducts(products)
      renderWrapFilter(model.filter)
    })
    document
      .querySelector('button.filter')
      .addEventListener('click', onClickButtonFilter)
  }

  if (pageName === 'product') {
    const id = new URLSearchParams(location.search).get('id')
    if (!id) return

    const productPromise = loadComputers(id)
    productPromise.then(product => {
      renderProductInfo(product)
      renderLeft(product)
      loadComputers().then(recommendation => {
        renderRecomendProd(recommendation[1])
        renderRecomendProd(recommendation[2])
        renderRecomendProd(recommendation[3])
        renderRecomendProd(recommendation[4])
      })
    })
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
  const elForm = document.createElement('form')
  const elPrice = generateFilterPrice()
  elForm.setAttribute('action', '')
  for (const key in modelFilter) {
    if (typeof modelFilter[key] === 'object') {
      const elProp = generateFilterProp(key)
      elForm.appendChild(elProp)
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
  elWrapFilter.appendChild(elPrice)
  elWrapFilter.appendChild(elForm)
}

function renderLeft(product) {
  const elLeft = document.querySelector('#left')
  const elSlider = generateLeft(product)
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
